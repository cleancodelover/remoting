"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import SlidingFilter from "@/components/home/books/slider";
import DropDownSelectComponent from "@/components/inputs/select-dropdown";
import { useForm } from "react-hook-form";
import CheckBoxComponent from "@/components/inputs/check-box";
import { useBooks } from "@/contexts/booksContext";
import { useGetAuthors } from "@/hooks/users/get-authors";

const FiltersSidebar = () => {
  const { control } = useForm();
  const { handleSearch, resetSearch } = useBooks();
  // const { authors } = useGetAuthors();

  return (
    <motion.div
      className="col-span-3 rounded-md p-4 h-[95%] bg-lightDark"
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
        isYear = {true}
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
      <motion.button
        onClick={resetSearch}
        whileTap={{ scale: 0.85 }}
        className="w-full px-2 h-[42px] my-10 text-md font-medium border bg-slate-50 rounded-[8px] text-gray-800 "
      >
        Clear all filters
      </motion.button>
    </motion.div>
  );
};

export default FiltersSidebar;
