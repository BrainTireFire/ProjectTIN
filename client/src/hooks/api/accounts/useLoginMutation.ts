import { useMutation, useQuery } from '@tanstack/react-query';
import { authClient } from '../../../app/api/agent';
import { User, UserFormValues } from '../../../app/models/user';

export async function loginUser(loginData: UserFormValues): Promise<User> {
    const response = await authClient.post<User>('/login', loginData);
    window.localStorage.setItem('jwt', response.data.token);
    return response.data;
}

export function useLoginMutation() {
    return useMutation({
        mutationFn: loginUser,
    });
}

