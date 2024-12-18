import TextInputComponent from "@/components/inputs/text-input";
import React, { useState } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import BookFormComponent from "@/components/users/book-form";
import { GlobalRequestParams } from "@/types/global";
import { useForm, useWatch } from "react-hook-form";

type SearchFieldProps = {
  handleSearch?:(searchQuery?:GlobalRequestParams | undefined)=>void
};

const UserBookSearchField = ({ handleSearch }: SearchFieldProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { control } = useForm<{searchQuery?: string}>();
  handleSearch && handleSearch({searchQuery: useWatch({control, name: 'searchQuery'})});

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
