'use client'
import React from "react";
import { motion } from "framer-motion";
import BookCard from "./book";
import SearchField from "@/components/shared/search";
import { GetBookType } from "@/types/book";
import { useBooks } from "@/contexts/booksContext";
import EmptyBooks from "@/views/empty";

const BookList = () => {
  const { books, fetchNextPage, hasNextPage, fetching } = useBooks();

    const loadMore = () => {
        hasNextPage && fetchNextPage && fetchNextPage();
    };

  return (
    <motion.div className="col-span-9 h-full">
      <SearchField />
      <div className="flex w-full h-[670px] overflow-y-auto scrollbar-hidden" style={{scrollbarWidth:'none'}}>
      <div className="flex flex-wrap justify-start gap-4 w-full py-4" style={{scrollbarWidth:'none'}}>
        {
          (!books || !books?.length) ? <EmptyBooks title={"No records found!"} /> : books?.map((item:GetBookType, index)=>{ return <BookCard key={`${item?._id}}${index}`} book={item} />})
        }
      </div>
      </div>
    </motion.div>
  );
};

export default BookList;
