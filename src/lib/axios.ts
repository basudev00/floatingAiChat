// src/lib/axios.ts

import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: false,
});

// Attach Access Token on each request
api.interceptors.request.use((config) => {
    const token = Cookies.get("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // Add CSRF token for any request that changes data
    if (config.method !== 'get') {
        const csrfToken = Cookies.get('csrftoken');
        if (csrfToken) {
            config.headers['X-CSRFToken'] = csrfToken;
        }
    }
    config.withCredentials = false;
    return config;
});

// Response Interceptor for Refresh Token Handling
api.interceptors.response.use(
    (response) => response,

    async (error: AxiosError) => {
        const originalRequest: any = error.config;

        // If access token expired → error status = 401
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refresh = Cookies.get("refresh_token");
            if (!refresh) {
                // No refresh token → force logout
                Cookies.remove("access_token");
                Cookies.remove("refresh_token");
                window.location.href = "/login";
                return Promise.reject(error);
            }

            if (isRefreshing) {
                // Queue requests while refreshing
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers["Authorization"] = "Bearer " + token;
                        return api(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            isRefreshing = true;

            try {
                // Call refresh API
                const { data } = await axios.post(
                    `${import.meta.env.VITE_BASE_URL}/api/token/refresh/`,
                    { refresh },
                );

                const newAccess = data?.data?.access;

                // Store new access token
                Cookies.set("access_token", newAccess, { expires: 7 });

                api.defaults.headers.common["Authorization"] = "Bearer " + newAccess;

                processQueue(null, newAccess);
                isRefreshing = false;

                // Retry original request
                originalRequest.headers["Authorization"] = "Bearer " + newAccess;
                return api(originalRequest);

            } catch (err) {
                processQueue(err, null);
                isRefreshing = false;

                // Refresh failed → logout
                Cookies.remove("access_token");
                Cookies.remove("refresh_token");
                window.location.href = "/login";
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);
