import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../app/api/agent";
import { AlcoholReview } from "../../../app/models/alcoholReview";
import { Review } from "../../../app/models/review";

type Response = {
    alcoholReviews: AlcoholReview[]
}

async function getReviewsDetailsOfAlcohol(id: string): Promise<Response[]> {
    const response = await apiClient.get<Response[]>('/reviews');
    console.log("getReviewsDetailsOfAlcohol ", response)
    return response.data;
}

export function useReviewsDetailsOfAlcoholQuery(id: string) {
    return useQuery({
        queryKey: ['reviewsDetailsOfAlcohol', id],
        queryFn: () => getReviewsDetailsOfAlcohol(id)
    })
}

