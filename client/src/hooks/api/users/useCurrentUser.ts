import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../app/api/agent";

type Response = {
    email: string,
    name: string,
    role: string,
    _id: string,
}

async function getCurrentUser(): Promise<Response> {
    const response = await apiClient.get<Response>('/users/me');
    return response.data;
}

export function useCurrentUser() {
    return useQuery({
        queryKey: ['currentUser'],
        queryFn: getCurrentUser
    })
}

