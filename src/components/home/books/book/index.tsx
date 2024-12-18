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
        className="rounded-md sm:w-[150px]"
      >
       <Image
          src={book.imageUrl ? new URL(book.imageUrl).pathname : '/images/blindless.jpg'}
          alt="Book title"
          width={180}
          height={38}
          className="w-full h-auto rounded-lg object-cover"
          priority
        />
      </motion.div>
  );
};
export default BookCard;
