import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authClient } from '../../../app/api/agent';
import { User, UserFormValues } from '../../../app/models/user';


export async function loginUser(loginData: UserFormValues): Promise<User> {
    try {
        const response = await authClient.post<User>('/login', loginData);
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Error in loginUser:', error);
        throw error;
    }
}

export function useLoginMutation() {
    return useMutation({
        mutationFn: loginUser
    });
}

