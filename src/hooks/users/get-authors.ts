import { getAuthorsApi } from "@/client/requests/users";
import { GlobalRequestParams } from "@/types/global";
import { queryKeys } from "@/utils/react-query/query-keys";
import { useQuery } from "@tanstack/react-query";

export const useGetAuthors = (params?: GlobalRequestParams) =>{
    const queryKey = [queryKeys.AUTHORS, {...params}];
    const { data, isPending, isError} = useQuery({queryKey:queryKey, queryFn: getAuthorsApi});
    return {
        authors: data?.data?.data,
        loading: isPending,
        error: isError,
    }
}
