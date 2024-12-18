import { getUserApi } from "@/client/requests/users";
import { queryKeys } from "@/utils/react-query/query-keys";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () =>{
    const { data, isPending, isError} = useQuery({queryKey:[queryKeys.USERS], queryFn: getUserApi});
    return {
        user: data?.data?.data,
        loading: isPending,
        error: isError,
    }
}