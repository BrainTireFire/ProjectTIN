import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../../../app/api/agent';


async function deleteAlcohol(id: string): Promise<void> {
    await apiClient.delete(`/alcohols/${id}`);
}

export function useDeleteAlcoholQuery() {
    return useMutation(deleteAlcohol);
}