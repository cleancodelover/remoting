import TextInputComponent from "@/components/inputs/text-input";
import { usePopOver } from "@/contexts/popOverContext";
import React, { useEffect, useState } from "react";
import { FaSearch, FaUserCircle, FaFilter } from "react-icons/fa";
import UserMenu from "../user-menu";
import { validateToken } from "@/utils/helpers/token-validation";
import { useForm, useWatch } from "react-hook-form";
import { useBooks } from "@/contexts/booksContext";

const SearchField = () => {
  const { setIsOpen, setShowFilters } = usePopOver();
  const [openUserMenu, setOpenUserMenu] = useState<boolean>(false);
  const { control } = useForm<{searchQuery?: string}>();
  const { handleSearch } = useBooks();
  const searchQuery = useWatch({ control, name: 'searchQuery' });

  const onPopOver = async () =>{
    const isAuthenticated = await validateToken();
    isAuthenticated ? setOpenUserMenu(true) : setIsOpen && setIsOpen(val=>!val);
  }

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
        if (handleSearch) handleSearch({ searchQuery });
    }, 500); // Debounce of 500ms

    return () => clearTimeout(delayDebounce);
}, [searchQuery, handleSearch]);


  return <>
    <div className="flex flex-row gap-3 md:gap-3 justify-between">
    <button
      onClick={()=>{ setShowFilters && setShowFilters(val=>!val) }}
      className="block md:hidden"
    >
      <FaFilter className="size-[16px] md:size-[30px]" />
    </button>
      <div className="rounded-full md:rounded-md bg-lightDark w-[90%] h-[100%] md:w-[95%] overflow-x-hidden">
        <TextInputComponent
          Icon={FaSearch}
          control={control}
          name="searchQuery"
          type="text"
          placeholder="Search books..."
        />
      </div>
      <button
        onClick={onPopOver}
      >
        <FaUserCircle className="size-[18px] md:size-[35px]" />
      </button>
    </div>
    <UserMenu isOpen={openUserMenu} setIsOpen={setOpenUserMenu} />
    </>
};

export default SearchField;
