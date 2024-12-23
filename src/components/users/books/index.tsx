"use client";
import { motion } from "framer-motion";
import React from "react";
import { FaArrowLeft, FaUserCircle } from "react-icons/fa";
import { useRouter } from 'nextjs-toploader/app';
import UserBook from "../book";
import UserBookSearchField from "@/components/shared/user-books-search";
import { GetBookType } from "@/types/book";
import EmptyBooks from "@/views/empty";
import { useAuthorBooks } from "@/contexts/booksContext/user-books";
import { usePopOver } from "@/contexts/popOverContext";

const UserBooks = () => {
  const router = useRouter();
  const { books } = useAuthorBooks();
  const { setShowProfile } = usePopOver();

  return (
    <>
      <motion.div className="col-span-9 h-full">
        <div className="flex w-full h-[670px] overflow-y-auto">
          <div className="flex flex-col items-start gap-4 w-full pb-4">
          <div className="flex flex-row w-full justify-between items-center md:mt-5">
            <button
              style={{ cursor: "pointer" }}
              onClick={() => {
                router.back();
              }}
              className="flex flex-row items-center justify-center gap-4"
            >
              <FaArrowLeft />
              <h3>{`Back to books`}</h3>
            </button>
            <button className="sm:block md:hidden"
                    onClick={()=>{setShowProfile && setShowProfile(val=>!val)}}
                  >
                    <FaUserCircle className="size-[18px] md:size-[35px]" />
                  </button>
            </div>
            <UserBookSearchField />
            <div className="flex flex-col w-full items-start gap-8 pt-4 overflow-y-scroll scroll-m-0" style={{scrollbarWidth:'none'}}>
              {
                (books && books?.length > 0) ? books?.map((book: GetBookType, index)=><UserBook key={`${book?._id}${index}`} book={book} />) : <EmptyBooks />
              }
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default UserBooks;
