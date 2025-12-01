import { api } from "../lib/axios";

export const sendChatMessage = async (message: string) => {
    const response = await api.post(
        "api/chat/",
        { message },
    );
    return response.data;
};
