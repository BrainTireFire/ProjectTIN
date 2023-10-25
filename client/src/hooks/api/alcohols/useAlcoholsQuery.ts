import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../app/api/agent";
import { Alcohol } from "../../../app/models/alcohol";


type Response = {
    alcohols: Alcohol[]
}

async function getAlcohols(page, limit): Promise<Alcohol[]> {
    const response = await apiClient.get<Alcohol[]>(`/alcohols?page=${page}&limit=${limit}`);
    return response.data;
}


export function useAlcoholsQuery(page, limit) {
    return useQuery({
        queryKey: ['alcohols', page, limit],
        queryFn: () => getAlcohols(page, limit),
        //keepPreviousData : true
    })
}

