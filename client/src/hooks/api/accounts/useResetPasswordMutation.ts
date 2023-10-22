import { useMutation } from '@tanstack/react-query';
import { authClient } from '../../../app/api/agent';
import { User, UserResetPasswordFormValues } from '../../../app/models/user';

export async function resetPasswordUser(token: string, resetPasswordData: UserResetPasswordFormValues): Promise<User> {
    const response = await authClient.post<User>(`/resetPassword/${token}`, resetPasswordData);
    return response.data;
}

export function useResetPasswordMutation() {
    return useMutation({
        mutationFn: ({ token, resetPasswordData }) => resetPasswordUser(token, resetPasswordData),
    });
}

