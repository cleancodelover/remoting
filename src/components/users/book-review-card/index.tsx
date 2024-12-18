"use client";
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { GetBookReviewType } from "@/types/review";

type BookReviewCardProps = {
  review: GetBookReviewType;
};
const BookReviewCard = ({ review }: BookReviewCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [more, setMore] = useState<boolean>(false);

  return (
    <motion.div
      ref={ref}
      key={review.id}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1 }}
      className="flex flex-row rounded-md w-full gap-4"
    >
      <Image
        src={
          review?.user?.imageUrl
            ? new URL(review?.user?.imageUrl).pathname
            : "/picture-avatar.jpg"
        }
        alt="Book title"
        width={30}
        height={30}
        className="w-[30px] h-[30px] rounded-full object-cover"
        priority
      />
      <div className="flex flex-col justify-start items-start w-full mb-8">
        <h4 className="text-sm font-bold text-gray-400">{`${review?.user?.firstName ?? "Verkyav"} ${
          review?.user?.lastName ?? "Peter "
        }`}</h4>
        <p className="text-xs text-gray-400">
          {review?.message ?? ''}{' '}
          <motion.button
            whileTap={{ scale: 0.65 }}
            transition={{duration:0.4}}
            className="text-green-600"
            onClick={() => {
              setMore((val) => !val);
            }}
          >
            {`${more ? "more" : "less"}`}...
          </motion.button>
        </p>
      </div>
    </motion.div>
  );
};

export default BookReviewCard;
