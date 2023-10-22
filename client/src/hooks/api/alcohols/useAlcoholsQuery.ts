import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../app/api/agent";
import { Alcohol } from "../../../app/models/alcohol";


type Response = {
    alcohols: Alcohol[]
}

async function getAlcohols(): Promise<Alcohol[]> {
    const response = await apiClient.get<Alcohol[]>('/alcohols');
    return response.data;
}


export function useAlcoholsQuery() {
    return useQuery({
        queryKey: ['alcohols'],
        queryFn: getAlcohols
    })
}

