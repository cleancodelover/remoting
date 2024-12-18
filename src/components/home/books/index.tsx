'use client'
import React from "react";
import { motion } from "framer-motion";
import BookCard from "./book";
import SearchField from "@/components/shared/search";
import { GetBookType } from "@/types/book";
import { useBooks } from "@/contexts/booksContext";

const BookList = () => {
  const { books, handleSearch } = useBooks();

  return (
    <motion.div className="col-span-9 h-full">
      <SearchField handleSearch={handleSearch} />
      <div className="flex w-full h-[670px] overflow-y-auto scrollbar-hidden" style={{scrollbarWidth:'none'}}>
      <div className="flex flex-wrap justify-start gap-4 w-full py-4" style={{scrollbarWidth:'none'}}>
        {
          books?.map((item:GetBookType)=>{ return <BookCard key={`${item?._id}}`} book={item} />})
        }
      </div>
      </div>
    </motion.div>
  );
};

export default BookList;
