'use client'
import { useDeleteBook } from '@/hooks/books/delete-book'
import { GetBookType } from '@/types/book'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import BookFormComponent from '../book-form'

type BookMenuType = {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    book?: GetBookType
}

const BookMenu = ({ isOpen, setIsOpen, book}:BookMenuType) =>{
    const menuRef = useRef<any>(null);
    const { handleDeleteBook } = useDeleteBook();
    const [editBook, setEditBook] = useState<boolean>(false);

    
    useEffect(() => {
        const handleClickOutside = (event:any) => {
          if (menuRef.current && !menuRef?.current?.contains(event.target)) {
            setIsOpen(false);
          }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }, []);
      
    return <AnimatePresence>
    {isOpen && (
      <motion.div
        ref={menuRef}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="dropdown-menu"
        style={{top:0}}
      >
        <ul>
          <li onClick={() => { setEditBook(true)}}>Edit</li>
          <li onClick={() => handleDeleteBook(book?._id ?? '')}>Delete</li>
        </ul>
        <BookFormComponent open={editBook} book={book} handleClose={()=>{setEditBook(false)}} />
      </motion.div>
    )}
  </AnimatePresence>
}

export default BookMenu;