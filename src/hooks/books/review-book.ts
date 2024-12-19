"use client";
import { HookOnErrorType, HookOnSuccessType } from "@/types/global";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToast from "../notifications/toast";
import { addBookReviewApi } from "@/client/requests/books";
import { GetBookReviewType, PostBookReviewRequestType } from "@/types/review";
import { GetUserType } from "@/types/user";
import { queryKeys } from "@/utils/react-query/query-keys";
import { useAuthentication } from "@/contexts/authContext";

export const useBookReview = ( onSuccess?: HookOnSuccessType, onError?: HookOnErrorType) => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const { authUser } = useAuthentication();
  const { mutate, isPending } = useMutation({
    mutationFn: addBookReviewApi,
    onMutate: async (data) => {
      const review: GetBookReviewType = {
        book_id: data.book_id,
        user_id: authUser?.id ?? '',
        id: Date.now().toString(),
        message: data.message,
        user: {...authUser} as GetUserType,
      };

      await queryClient.cancelQueries({
        queryKey: [queryKeys.BOOK_REVIEWS, { id: data.book_id, size: 8 }],
      });

      const previousReviews: any = queryClient.getQueryData([queryKeys.BOOK_REVIEWS, { id: data.book_id, size: 8 }]);

      if (review) {
        queryClient.setQueryData(
            [queryKeys.BOOK_REVIEWS, { id: data.book_id, size: 8 }],
            (oldData: any) => ({...oldData, review})
          );
      }
      return { previousReviews };
    },
    onSettled: (response) => {
        queryClient.invalidateQueries({
        queryKey: [
          queryKeys.BOOK_REVIEWS,
          { id: response?.data?.data?.book_id, size: 8 },
        ],
      });
      onSuccess && onSuccess();
    },
    onSuccess: async (res) => {
      onSuccess && onSuccess();
      showToast({ message: res?.data?.message, type: "success" });
    },
    onError(error: any, variables, context) {
      onError && onError();
      const errMsg = error?.response?.data?.message;
      showToast({ message: errMsg, type: "error" });
    },
  });

  const handleBookReview = (data: PostBookReviewRequestType) => {
    mutate(data);
  };

  return { handleBookReview, loading: isPending };
};
