import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../app/api/agent";
import { Review } from "../../../app/models/review";

type Response = {
  reviews: Review[];
};

async function getReviews(page, limit): Promise<Response[]> {
  const response = await apiClient.get<Response[]>(
    `/reviews?page=${page}&limit=${limit}`
  );
  return response.data;
}

export function useReviewsQuery(page, limit) {
  return useQuery({
    queryKey: ["reviews", page, limit],
    queryFn: () => getReviews(page, limit),
  });
}
