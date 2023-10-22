import { useMutation, useQuery } from '@tanstack/react-query';
import { authClient } from '../../../app/api/agent';
import { User, UserRegisterFormValues } from '../../../app/models/user';
import { router } from '../../../app/router/Routes';

export async function registerUser(registerData: UserRegisterFormValues): Promise<User> {
    const response = await authClient.post<User>('/register', registerData);
    window.localStorage.setItem('jwt', response.data.token);
    router.navigate('/alcohols');
    return response.data;
}

export function useRegisterMutation() {
    return useMutation({
        mutationFn: registerUser,
    });
}

