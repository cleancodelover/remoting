import TextInputComponent from "@/components/inputs/text-input";
import { usePopOver } from "@/contexts/popOverContext";
import React, { useEffect, useState } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import UserMenu from "../user-menu";
import { validateToken } from "@/utils/helpers/token-validation";
import { useForm, useWatch } from "react-hook-form";
import { GlobalRequestParams } from "@/types/global";
import { useBooks } from "@/contexts/booksContext";

const SearchField = () => {
  const { setIsOpen } = usePopOver();
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
    <div className="flex flex-row justify-between">
      {" "}
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
        onClick={onPopOver}
      >
        <FaUserCircle size={35} />
      </button>
    </div>
    <UserMenu isOpen={openUserMenu} setIsOpen={setOpenUserMenu} />
    </>
};

export default SearchField;
