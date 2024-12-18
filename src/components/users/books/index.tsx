"use client";
import { motion } from "framer-motion";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from 'nextjs-toploader/app';
import UserBook from "../book";
import UserBookSearchField from "@/components/shared/user-books-search";
import { useBooks } from "@/contexts/booksContext";
import { GetBookType } from "@/types/book";
import EmptyBooks from "@/views/empty";

const UserBooks = () => {
  const router = useRouter();
  const { authorBooks, handleSearch } = useBooks();

  return (
    <>
      <motion.div className="col-span-9 h-full">
        <div className="flex w-full h-[670px] overflow-y-auto">
          <div className="flex flex-col items-start gap-4 w-full pb-4">
            <button
              style={{ cursor: "pointer" }}
              onClick={() => {
                router.back();
              }}
              className="flex flex-row items-center justify-center gap-4 mt-5"
            >
              <FaArrowLeft />
              <h3>{`Back to books`}</h3>
            </button>
            <UserBookSearchField handleSearch={handleSearch} />
            <div className="flex flex-col h-full w-full gap-8 pt-4 overflow-y-scroll scroll-m-0" style={{scrollbarWidth:'none'}}>
              {
                (authorBooks && authorBooks?.length > 0) ? authorBooks?.map((book: GetBookType)=><UserBook book={book} />) : <EmptyBooks />
              }
              
              {/* <UserBook /> */}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default UserBooks;
