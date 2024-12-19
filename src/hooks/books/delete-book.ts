import { deleteBookApi } from "@/client/requests/books";
import { GetBookApiResponse, GetBooksApiResponse } from "@/types/book";
import { HookOnMutateType } from "@/types/global";
import { queryKeys } from "@/utils/react-query/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteBook = (id?: string, onMutate?: HookOnMutateType) => {
  const queryClient = useQueryClient();
  const { data, mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: deleteBookApi,
    onMutate: async (book_id) => {
      await queryClient.cancelQueries({
        queryKey: [queryKeys.USER_BOOKS, {}],
      });

      const queryData:any = queryClient.getQueryData([
        queryKeys.USER_BOOKS,
        {},
      ]);

      const books = queryData?.pages[0]?.data?.data;



      if (books) {
        let bookIndex = books.findIndex((item:any) => item._id == book_id);

        
        books?.slice(0, bookIndex).concat(books?.data?.slice(bookIndex + 1));
        queryClient.setQueryData([queryKeys.USER_BOOKS, {}], (old: any) => {
            if (!old) return old;
            const updatedData = {
              ...old,
              pages: old.pages.map((page: any, index: any) => {
                if (index === old?.pages?.length - 1) {
                  return {
                    ...page,
                    data: [...books],
                  };
                }
              })
            }
            return updatedData
        })
            
      }
      return { books };
    },
    onSettled: (response) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.USER_BOOKS, {}],
      });
      onMutate && onMutate();
    },
    onSuccess(data, variables, context) {
        queryClient.invalidateQueries({
            queryKey: [queryKeys.BOOKS, {}],
          });
    },
    onError(error, variables, context) {
      console.log("Error :>>>>>>>>>>>>", error);
      const errMsg = error?.message;
    },
  });

  const handleDeleteBook = (id: string) => {
    const shouldDelete = confirm(
      "Are you sure you want to delete this book? It is not recoverable."
    );
    if (shouldDelete) mutate(id);
  };

  return {
    isSuccess,
    loading: isPending,
    error: isError,
    handleDeleteBook,
  };
};
