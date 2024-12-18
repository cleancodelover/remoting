'use client'
import BookInfo from '@/components/home/book/details'
import SearchField from '@/components/shared/search'
import { useBooks } from '@/contexts/booksContext'
import { useGetBook } from '@/hooks/books/get-book'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'nextjs-toploader/app';
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';

type BookDetailsProps = {
  id: string | undefined
}
const BookDetails = ({ id }:BookDetailsProps) =>{
  const { handleSearch } = useBooks();
    const router = useRouter();
    const { book } = useGetBook(id);

    return <>
    <motion.div className="col-span-9 h-full">
      <SearchField handleSearch={handleSearch} />
      <div className="flex w-full h-[670px] overflow-y-auto" style={{scrollbarWidth:'none'}}>
      <div className="flex flex-col items-start gap-4 w-full py-4">
        <button style={{cursor:'pointer'}} onClick={()=>{ router.back()}} className='flex flex-row items-center justify-center gap-4 mt-5'>
            <FaArrowLeft /><h3>{`Back to books`}</h3>
        </button>
        <div className='flex flex-row w-full items-start gap-8'>
        <Image
         src={book?.imageUrl ? new URL(book.imageUrl).pathname : '/images/blindness.jpg'}
          alt="Book title"
          width={180}
          height={38}
          className="w-[300px] h-auto rounded-lg object-cover"
          priority
        />
        <BookInfo book={book} />
        </div>
      </div>
      </div>
      </motion.div>
    </>
}

export default BookDetails