"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import SlidingFilter from "@/components/home/books/slider";
import DropDownSelectComponent from "@/components/inputs/select-dropdown";
import { useForm } from "react-hook-form";
import CheckBoxComponent from "@/components/inputs/check-box";
import { useBooks } from "@/contexts/booksContext";
import { useGetAuthors } from "@/hooks/users/get-authors";
import { usePopOver } from "@/contexts/popOverContext";

const FiltersSidebar = () => {
  const { control } = useForm();
  const { handleSearch, resetSearch } = useBooks();
  const { showFilters, setShowFilters } = usePopOver();
  // const { authors } = useGetAuthors();

  return (
    <motion.div
      className={`col-span-3 rounded-md p-4 bg-lightDark 
      ${showFilters ? "block" : "hidden"} lg:block 
      absolute lg:relative z-50 lg:z-auto top-0 right-0 left-0 bottom-0 ${
        showFilters ? "h-[100vh]" : "h-[95%]"
      }`}
      animate={{
        opacity: showFilters ? 1 : 0,
        x: showFilters ? 0 : 50,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.3,
        },
      }}
      viewport={{ once: false }}
    >
      <SlidingFilter
        onChange={(val) => {
          handleSearch && handleSearch({ year: val });
        }}
        range={false}
        title="Publication Year"
        isYear={true}
        min={1950}
        max={2024}
      />
      <div className="my-8">
        <SlidingFilter
          onChange={(val) => {
            handleSearch && handleSearch({ rating: val });
          }}
          range={false}
          title="Minimum Rating"
          min={0}
          max={5}
          isRating
        />
      </div>
      {/* <div className="my-8">
        <DropDownSelectComponent
          onInputValueChange={(val) => {
            handleSearch && handleSearch({ author: val });
          }}
          label="Author"
          control={control}
          name="author"
          options={authors?.length ? authors?.map((item)=>{ return { label: `${item?.firstName} ${item?.lastName}`, value: `${item?.firstName} ${item?.lastName}`}}) : []}
        />
      </div> */}
      <SlidingFilter
        onChange={(val) => {
          handleSearch && handleSearch({ pages: val });
        }}
        range={false}
        title="Number of pages"
        min={1}
        max={1000}
      />
      <div className="my-8">
        <CheckBoxComponent
          onInputValueChange={(val) => {
            handleSearch && handleSearch({ category: val });
          }}
          control={control}
          label="Book Lists"
          name="bookList"
          options={[
            { name: "Popular", value: "Popular" },
            { name: "Classics", value: "Classics" },
            { name: "Sci-Fi & Fantasy", value: "Sci-Fi & Fantasy" },
          ]}
        />
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-start lg:w-full mx-auto lg:mx-0">
        <motion.button
          onClick={() => {
            setShowFilters && setShowFilters((val) => !val);
          }}
          whileTap={{ scale: 0.85 }}
          className="w-full px-2 h-[42px] my-2 text-md font-medium border bg-slate-50 rounded-[8px] text-gray-800 lg:hidden"
        >
          Apply Filters
        </motion.button>
        <motion.button
          onClick={()=>{
            resetSearch && resetSearch();
            setShowFilters && setShowFilters(val=>!val);
          }}
          whileTap={{ scale: 0.85 }}
          className="w-full px-2 h-[42px] my-2 lg:my-10 text-md font-medium border bg-slate-50 rounded-[8px] text-gray-800"
        >
          Clear all filters
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FiltersSidebar;
