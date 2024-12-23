'use client'
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import BookCard from "./book";
import SearchField from "@/components/shared/search";
import { GetBookType } from "@/types/book";
import { useBooks } from "@/contexts/booksContext";
import EmptyBooks from "@/views/empty";

const BookList = () => {
  const { books, fetchNextPage, hasNextPage, fetching } = useBooks();
  const observer = useRef<IntersectionObserver | null>(null);
  const lastBookRef = useRef<HTMLDivElement | null>(null);

    // const loadMore = () => {
    //     hasNextPage && fetchNextPage && fetchNextPage();
    // };

    useEffect(() => {
      if (observer.current) observer.current.disconnect();
  
      const loadMore = ([entry]: IntersectionObserverEntry[]) => {
          console.log("Fetched :>>>>>>>>>>>>>>>>>");
        if (entry.isIntersecting && hasNextPage) {
          console.log("Fetched :>>>>>>>>>>>>>>>>>")
          fetchNextPage && fetchNextPage();
        }
      };
  
      observer.current = new IntersectionObserver(loadMore, {
        rootMargin: '100px',
      });
  
      if (lastBookRef.current) {
        observer.current.observe(lastBookRef.current);
      }
  
      return () => {
        if (observer.current) observer.current.disconnect();
      };
    }, [hasNextPage, fetchNextPage]);

  return (
    <motion.div className="col-span-12 md:col-span-9 h-full">
      <SearchField />
      <div className="col-span-12 h-[670px] overflow-y-auto scrollbar-hidden" style={{scrollbarWidth:'none'}}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 flex-wrap justify-start gap-4 w-full py-4 lg:px-4">
        {
          (!books || !books?.length) ? <EmptyBooks title={"No records found!"} /> : books?.map((item:GetBookType, index)=>{ return <BookCard key={`${item?._id}}${index}`} book={item} />})
        }
      </div>
      {/* <div ref={lastBookRef} /> */}
      </div>
    </motion.div>
  );
};

export default BookList;
