import { useMutation } from '@tanstack/react-query';
import { authClient } from '../../../app/api/agent';
import { User, UserForgetPasswordFormValues } from '../../../app/models/user';

export async function forgetPasswordUser(forgetPasswordData: UserForgetPasswordFormValues): Promise<User> {
    const response = await authClient.post<User>('/forgotPassword', forgetPasswordData);
    return response.data;
}

export function useForgetPasswordMutation() {
    return useMutation({
        mutationFn: forgetPasswordUser,
    });
}

