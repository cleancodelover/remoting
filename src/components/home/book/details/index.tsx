"use client";
import TextAreaInputComponent from "@/components/inputs/text-area";
import BookReviewCard from "@/components/users/book-review-card";
import { useReading } from "@/contexts/readingContext";
import { iBookReviewFormValidation } from "@/form-validators/books";
import { useGetBookRatings } from "@/hooks/books/book-ratings";
import { useGetBookReviews } from "@/hooks/books/book-reviews";
import { useBookRating } from "@/hooks/books/rate-book";
import { useBookReview } from "@/hooks/books/review-book";
import { GetBookType } from "@/types/book";
import { GetBookReviewType, PostBookReviewRequestType } from "@/types/review";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import React from "react";
import { useForm } from "react-hook-form";
import { FaStar, FaBookOpen, FaCalendar } from "react-icons/fa";

type BookInfoType = {
  book?: GetBookType | undefined;
};
const BookInfo = ({ book }: BookInfoType) => {
  const { setBookUrl } = useReading();
  const { handleBookReview } = useBookReview();
  const { handleBookRating } = useBookRating();
  const { rating } = useGetBookRatings(book?._id ?? "");
  const { reviews } = useGetBookReviews(book?._id ?? "");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PostBookReviewRequestType>({
    resolver: yupResolver(iBookReviewFormValidation),
    defaultValues: { book_id: book?._id },
  });

  const onBookReview = handleSubmit((data: PostBookReviewRequestType) => {
    handleBookReview(data);
  });

  const onRateBook = (quantity: number) => {
    handleBookRating &&
      handleBookRating({
        quantity: quantity,
        book_id: book?._id ?? "",
      });
  };

  return (
    <div className="w-full">
      <h1 className="text-gray-300 text-2xl font-bold">{book?.title ?? ""}</h1>
      <h4 className="text-gray-300">{book?.author ?? ""}</h4>
      <div className="flex flex-row justify-start items-center py-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <button
            key={item.toString()}
            onClick={() => {
              onRateBook(item);
            }}
          >
            <FaStar className="text-red-300" />
          </button>
        ))}
        <h2 className="ml-3">
          <span className="font-bold">
            {rating?.average ? rating?.average : " "}
          </span>{" "}
          <span className="text-gray-400">
            ({rating?.total ?? 0} rating(s))
          </span>
        </h2>
      </div>
      <p>
        {book?.description ?? ""}
        {/* Wisdom, humor, and dark observations by the founder of the Church of Satan. LaVey ponders such topics as nonconformity, occult faddism, erotic politics, the "Goodguy badge," demoralization and the construction of artificial human companions.{' '} */}
        <button
          className="text-green-600"
          onClick={() => {
            setBookUrl && setBookUrl(book?.bookUrl);
          }}
        >
          continue reading...
        </button>
      </p>
      <div className="w-full pt-4">
        <div className="flex flex-row justify-between">
          <h4 className="flex flex-row items-center gap-1 text-gray-300">
            <FaBookOpen />
            {book?.pages ?? 0} pages
          </h4>
          <h4 className="text-gray-300">Unknown</h4>
        </div>
        <div className="flex flex-row justify-between my-4">
          <h4 className="flex flex-row items-center gap-1 text-gray-300">
            <FaCalendar /> {book?.year ?? ""}
          </h4>
          <h4 className="text-gray-300">ISBN: {book?.isbn ?? ""}</h4>
        </div>
      </div>
      {reviews?.map((review: GetBookReviewType) => (
        <BookReviewCard key={review.id} review={review} />
      ))}
      <TextAreaInputComponent
        control={control}
        error={errors.message?.message}
        name="message"
        placeholder="Leave a comment"
        type="textarea"
      />
      <div className="mt-0.5">
        <motion.button
          onClick={onBookReview}
          whileTap={{ scale: 0.85 }}
          className="px-5 float-end h-[34px] my-10 text-md font-medium border bg-slate-50 rounded-[8px] text-gray-800 "
        >
          Submit
        </motion.button>
      </div>
    </div>
  );
};

export default BookInfo;
