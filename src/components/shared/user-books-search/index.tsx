import TextInputComponent from "@/components/inputs/text-input";
import React, { useEffect, useState } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import BookFormComponent from "@/components/users/book-form";
import { useForm, useWatch } from "react-hook-form";
import { useAuthorBooks } from "@/contexts/booksContext/user-books";

const UserBookSearchField = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { control } = useForm<{searchQuery?: string}>();
  const { handleSearch } = useAuthorBooks();
  const searchQuery = useWatch({ control, name: 'searchQuery' });


  useEffect(() => {
    const delayDebounce = setTimeout(() => {
        if (handleSearch) handleSearch({ searchQuery });
    }, 500); // Debounce of 500ms

    return () => clearTimeout(delayDebounce);
}, [searchQuery, handleSearch]);

  return <>
    <div className="flex flex-row justify-between w-full">
      <div className="rounded-md bg-lightDark w-[95%]">
        <TextInputComponent
          Icon={FaSearch}
          control={control}
          name="searchQuery"
          type="text"
          placeholder="Search books..."
        />
      </div>
      <button
        onClick={()=>{
          setIsOpen(true)
        }}
      >
        <FaPlus className="font-light" size={25} />
      </button>
    </div>
    <BookFormComponent open={isOpen} handleClose={()=>{setIsOpen(false)}} />
    </>
};

export default UserBookSearchField;
