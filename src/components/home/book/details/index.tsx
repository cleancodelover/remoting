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
import { FaStar, FaStarHalfAlt, FaBookOpen, FaCalendar } from "react-icons/fa";
import PulseLoader from "react-spinners/PulseLoader";

type BookInfoType = {
  book?: GetBookType | undefined;
};
const BookInfo = ({ book }: BookInfoType) => {
  const { setBookUrl } = useReading();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostBookReviewRequestType>({
    resolver: yupResolver(iBookReviewFormValidation),
    defaultValues: { book_id: book?._id },
  });
  const { handleBookReview, loading } = useBookReview(()=>{ reset() });
  const { handleBookRating, loading: rateLoading } = useBookRating();
  const { rating } = useGetBookRatings(book?._id ?? "");
  const { reviews } = useGetBookReviews(book?._id ?? "");

  const onBookReview = handleSubmit((data: PostBookReviewRequestType) => {
    handleBookReview({
      message: data.message,
      book_id: book?._id ?? ''
    });
  });

  const onRateBook = (quantity: number) => {
    handleBookRating &&
      handleBookRating({
        quantity: quantity,
        book_id: book?._id ?? "",
      });
  };

  const displayRatings = ()=>{
    const totalStars = 5;
    const fullStars = Math.floor(rating?.average ?? 0); // Number of full stars
    const hasHalfStar = (rating?.average ?? 0) % 1 !== 0; // Check if there is a half star
    const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);
    return <>
    {/* Full red stars (clickable) */}
    {Array.from({ length: fullStars }, (_, index) => (
        <button 
          key={`full-${index}`} 
          onClick={() => onRateBook(index + 1)} // Pass the star number (1 to 5)
          className="focus:outline-none"
        >
          <FaStar className="text-red-300" />
        </button>
      ))}

      {/* Half red star (clickable, counted as the next full star) */}
      {hasHalfStar && (
        <button 
          onClick={() => onRateBook(fullStars + 1)} 
          className="focus:outline-none"
        >
          <FaStarHalfAlt className="text-red-300" />
        </button>
      )}

      {/* White stars (clickable) */}
      {Array.from({ length: emptyStars }, (_, index) => (
        <button 
          key={`empty-${index}`} 
          onClick={() => onRateBook(fullStars + (hasHalfStar ? 1 : 0) + index + 1)} 
          className="focus:outline-none"
        >
          <FaStar className="text-gray-300" />
        </button>
      ))}
    </>
  }

  return (
    <div className="w-full">
      <h1 className="text-gray-300 text-2xl font-bold">{book?.title ?? ""}</h1>
      <h4 className="text-gray-300">{book?.author ?? ""}</h4>
      <div className="flex flex-row justify-start items-center py-4">
        {displayRatings()}
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
      {reviews?.map((review: GetBookReviewType, index) => (
        <BookReviewCard key={`${review.id}${index}`} review={review} />
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
          {loading ? <PulseLoader size={4} /> : 'Submit'}
        </motion.button>
      </div>
    </div>
  );
};

export default BookInfo;
