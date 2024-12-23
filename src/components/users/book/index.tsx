"use client";
import { motion, useInView } from "framer-motion";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { FaBookOpen, FaStarHalfAlt, FaCalendar, FaStar, FaGlobe } from "react-icons/fa";
import BookMenu from "../book-menu";
import { GetBookType } from "@/types/book";
import { useReading } from "@/contexts/readingContext";
import { useBookRating } from "@/hooks/books/rate-book";
import useToast from "@/hooks/notifications/toast";
import { useGetBookRatings } from "@/hooks/books/book-ratings";
import { useGetBookReviews } from "@/hooks/books/book-reviews";

type UserBookProps = {
    book?: GetBookType
}

const UserBook = ({ book }:UserBookProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { setBookUrl } = useReading();
  const { handleBookRating } = useBookRating();
  const { showToast } = useToast();

  const displayRatings = ()=>{
    const totalStars = 5;
    const fullStars = Math.floor(book?.rating?.average ?? 0); // Number of full stars
    const hasHalfStar = (book?.rating?.average ?? 0) % 1 !== 0; // Check if there is a half star
    const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);
    return <>
    {Array.from({ length: fullStars }, (_, index) => (
        <button 
          key={`full-${index}`} 
          onClick={() => onRateBook(index + 1)} // Pass the star number (1 to 5)
          className="focus:outline-none"
        >
          <FaStar className="text-red-300" />
        </button>
      ))}

      {hasHalfStar && (
        <button 
          onClick={() => onRateBook(fullStars + 1)} 
          className="focus:outline-none"
        >
          <FaStarHalfAlt className="text-red-300" />
        </button>
      )}

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
  
  const onRateBook = (quantity: number) =>{
    handleBookRating({book_id: book?._id!, quantity})
  }

  return <div className="relative shadow-lightDark">
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1 }}
      className="flex flex-col md:flex-row gap-5 justify-between rounded-md w-full"
    >
      <Image
        src={book?.imageUrl ? new URL(book.imageUrl).pathname : "/images/blindness.jpg"}
        alt="Book title"
        width={180}
        height={38}
        className="sm:w-[150px] w-full h-auto rounded-lg object-cover"
        priority
      />
      <div className="w-full">
        <div className="flex flex-row justify-between">
          <div>
            <h1 className="text-gray-300 text-2xl font-bold">
              {book?.title ?? ''}
            </h1>
            <h4 className="text-gray-300">{book?.title ?? ''}</h4>
          </div>
          <motion.button
            transition={{ duration: 0.3 }}
            whileTap={{ scale: 0.05 }}
            onClick={()=>{ 
                setIsOpen(true)
            }}
            className="flex flex-col items-center justify-center space-y-1 w-6 h-6 rounded"
          >
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
          </motion.button>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row justify-start items-center py-4">
            {displayRatings()}
            <h2 className="ml-3">
              <span className="font-bold">{book?.rating?.average ?? "0 "}</span>{" "}
              <span className="text-gray-400">({book?.rating?.total ?? "0"} rating(s))</span>
            </h2>
          </div>
          <h2 className="ml-3">
            <span className="text-gray-400">({book?.reviewCount ?? "0"} review(s))</span>
          </h2>
        </div>
        <p>
        {book?.description ?? ''}
          <button
            className="text-green-600"
            onClick={() => {
              (setBookUrl && book?.bookUrl) ? setBookUrl(book?.bookUrl) : showToast({message: "This book doesn't have a pdf to read.", type:'error'});
            }}
          >
            continue reading...
          </button>
        </p>
        <div className="w-full pt-4">
          <div className="flex flex-row justify-between">
            <h4 className="flex flex-row items-center gap-1 text-gray-400">
              <FaBookOpen />
              {book?.pages ?? 0} pages
            </h4>
            <h4 className="flex flex-row items-center gap-1 text-gray-400"><FaGlobe /> Unknown</h4>
          </div>
          <div className="flex flex-row justify-between my-4">
            <h4 className="flex flex-row items-center gap-1 text-gray-400">
              <FaCalendar /> {book?.year ?? ''}
            </h4>
            <h4 className="text-gray-400">ISBN: {book?.isbn ?? ''}</h4>
          </div>
        </div>
      </div>
    </motion.div>
    <BookMenu isOpen={isOpen} setIsOpen={setIsOpen} book={book} />
    </div>
};

export default UserBook;
