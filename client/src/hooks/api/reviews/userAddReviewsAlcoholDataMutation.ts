import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../../../app/api/agent';
import { Review } from '../../../app/models/review';

export async function addReviewWithAlcohol(reviewAlcoholData): Promise<Review> {
    console.log(reviewAlcoholData)
    const response = await apiClient.post<Review>('/reviews', reviewAlcoholData);
    return response.data;
}

export function useAddReviewWithAlcoholMutation() {
    return useMutation({
        mutationFn: addReviewWithAlcohol,
    });
}
