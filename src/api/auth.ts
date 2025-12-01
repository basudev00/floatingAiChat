// src/api/auth.ts
import Cookies from "js-cookie";
import { api } from "../lib/axios";

export interface VerifyLoginPayload {
    email: string;
    password: string;
}

interface VerifyLoginResponse {
    detail: string;
    access: string;
    refresh: string;
    user: unknown;
}

export const verifyOtp = async (payload: VerifyLoginPayload): Promise<VerifyLoginResponse> => {

    const { data } = await api.post("/api/login/", payload);

    // Store tokens in cookies
    Cookies.set("access_token", data?.data?.access, { expires: 7 }); // 7 days
    Cookies.set("refresh_token", data?.data?.refresh, { expires: 14 }); // 14 days

    return data;
};
