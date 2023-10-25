import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../../../app/api/agent';
import { Alcohol, AlcoholCreateForm } from '../../../app/models/alcohol';

export async function addAlcohol(alcoholData: AlcoholCreateForm): Promise<Alcohol> {
    const response = await apiClient.post<Alcohol>('/alcohols', alcoholData);
    return response.data;
}

export function useAlcoholCreate() {
    return useMutation({
        mutationFn: addAlcohol,
    });
}
