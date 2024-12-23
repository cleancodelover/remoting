'use client'
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/contexts/themeContext";
import { GetBookType } from "@/types/book";
import { useRouter } from 'nextjs-toploader/app';

type BookProps = {
  book: GetBookType;
};
const BookCard = ({ book }: BookProps) => {
  const { theme } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const router = useRouter()

  return (
    
      <motion.div style={{cursor:'pointer'}} onClick={()=>{router.push(`/books/${book?._id}`)}}
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        whileTap={{ scale: 0.65 }}
        className="rounded-md bg-lightDark sm:h-[300px]"
      >
       <Image
          src={book.imageUrl ? new URL(book.imageUrl).pathname : '/images/blindless.jpg'}
          alt="Book title"
          width={180}
          height={38}
          className="w-full h-auto rounded-lg object-cover sm:h-[250px]"
          priority
        />
        <div className="p-2">
        <h2 className="text-xs font-bold text-gray-400 line-clamp-2">
          {book?.title?.length > 20 ? book?.title.slice(0, 20) + '...' : book?.title}
        </h2>
        <p className="text-[10px] text-gray-400 line-clamp-1 mt-1">
          by {book?.author?.length > 20 ? book?.author.slice(0, 20) + '...' : book?.author}
        </p>
      </div>
      </motion.div>
  );
};
export default BookCard;
