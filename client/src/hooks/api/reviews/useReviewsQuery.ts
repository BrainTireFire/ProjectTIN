import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../app/api/agent";
import { Review } from "../../../app/models/review";

type Response = {
    reviews: Review[]
}

async function getReviews(): Promise<Response[]> {
    const response = await apiClient.get<Response[]>('/reviews');
    return response.data;
}

export function useReviewsQuery() {
    return useQuery({
        queryKey: ['reviews'],
        queryFn: getReviews
    })
}

