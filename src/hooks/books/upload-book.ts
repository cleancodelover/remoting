"use client";
import { HookOnErrorType, HookOnSuccessType } from "@/types/global";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToast from "../notifications/toast";
import { createBookApi } from "@/client/requests/books";
import { GetBookType } from "@/types/book";
import { queryKeys } from "@/utils/react-query/query-keys";

export const useUploadBook = (
  onSuccess?: HookOnSuccessType,
  onError?: HookOnErrorType
) => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createBookApi,
    onMutate: async (formData) => {
      const book: GetBookType = {
        _id: Date.now().toString(),
        author: formData.get("author")?.toString() ?? "",
        bookUrl: URL.createObjectURL(formData.get("bookFile") as File),
        description: formData.get("description")?.toString() ?? "",
        imageUrl: URL.createObjectURL(formData.get("bookCover") as File),
        isbn: formData.get("isbn")?.toString() ?? "",
        pages: formData.get("pages")?.toString()
          ? Number(formData.get("pages")?.toString())
          : 0,
        title: formData.get("title")?.toString() ?? "",
        unitPrice: formData.get("unitPrice")?.toString() ?? "",
        year: formData.get("year")?.toString() ?? "",
        reviews: [],
        rating: {},
        reviewCount:0
      };

      await queryClient.cancelQueries({
        queryKey: [queryKeys.USER_BOOKS, {}],
      });

      const previousBooks: any = queryClient.getQueryData([
        queryKeys.USER_BOOKS,
        {},
      ]);

      if (book) {
        queryClient.setQueryData([queryKeys.USER_BOOKS, {}], (old: any) => {
          if (!old) return old;
          const updatedData = {
            ...old,
            pages: old.pages.map((page: any, index: any) => {
              if (index === old?.pages?.length - 1) {
                return {
                  ...page,
                  data: [...page?.data?.data],
                };
              }
            }),
          };
          return updatedData;
        });
      }
      return { previousBooks };
    },
    onSettled: (response) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.USER_BOOKS, {}],
      });
      onSuccess && onSuccess();
    },
    onSuccess: async (res) => {
      showToast({ message: res?.data?.message, type: "success" });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.BOOKS, {}],
      });
      onSuccess && onSuccess();
    },
    onError(error: any, variables, context) {
      onError && onError();
      const errMsg = error?.response?.data?.message;
      showToast({ message: errMsg, type: "error" });
    },
  });

  const handleBookUpload = (data: FormData) => {
    mutate(data);
  };

  return { handleBookUpload, loading: isPending };
};
