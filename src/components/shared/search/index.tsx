import TextInputComponent from "@/components/inputs/text-input";
import { usePopOver } from "@/contexts/popOverContext";
import React, { useState } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import UserMenu from "../user-menu";
import { validateToken } from "@/utils/helpers/token-validation";
import { useForm, useWatch } from "react-hook-form";
import { GlobalRequestParams } from "@/types/global";
type SearchFieldProps = {
  handleSearch?:(searchQuery?:GlobalRequestParams | undefined)=>void
};
const SearchField = ({ handleSearch }: SearchFieldProps) => {
  const { setIsOpen } = usePopOver();
  const [openUserMenu, setOpenUserMenu] = useState<boolean>(false);
  const { control } = useForm<{searchQuery?: string}>();
  handleSearch && handleSearch({searchQuery: useWatch({control, name: 'searchQuery'})});
  
  const onPopOver = async () =>{
    const isAuthenticated = await validateToken();
    isAuthenticated ? setOpenUserMenu(true) : setIsOpen && setIsOpen(val=>!val);
  }

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
