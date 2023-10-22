import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../app/api/agent";
import { Alcohol } from "../../../app/models/alcohol";

async function getAlcohol(id: string): Promise<Alcohol> {
    const response = await apiClient.get<Alcohol>('/alcohols/' + id);
    console.log("getReviewsDetailsOfAlcohol ", response)
    return response.data;
}

export function useAlcoholDetailsQuery(id: string) {
    return useQuery({
        queryKey: ['alcohols', id],
        queryFn: () => getAlcohol(id)
    });
}
