import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../app/api/agent";
import { Alcohol } from "../../../app/models/alcohol";
import { User } from "../../../app/models/user";

type Response = {
  users: User[];
};

async function getUsers(): Promise<Response[]> {
  const response = await apiClient.get<Response[]>(`/users`);
  console.log(response);
  return response.data;
}

export function useUsersQuery() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    //keepPreviousData : true
  });
}
