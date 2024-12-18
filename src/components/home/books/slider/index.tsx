"use client";
import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { RangeConfig } from "rc-slider/lib/Slider";

const SlidingFilter = ({
  title,
  max,
  min,
  isYear = false,
  range = false,
  isRating = false,
  onChange,
}: {
  title: string;
  max: number;
  min: number;
  range: boolean | RangeConfig | undefined;
  isRating?: boolean;
  onChange?: (val: any) => void;
  isYear?: boolean;
}) => {
  const [currentValue, setCurrentValue] = useState<any>();

  const handleChange = useCallback(
    (value: number) => {
      if(isYear || isRating){
        setCurrentValue(min + value);
      }else{
        setCurrentValue(value == 0 ? 1 :(min + value)-1);
      }
    },
    [currentValue]
  );

  const getMarks = () => {
    if (isRating) return { 1: null, 2: null, 3: null, 4: null, 5: null };
    if(isYear){
      return Array.from({ length: (max - min) / 5 + 1 }, (_, i) => min + i * 5).reduce((acc, year) => {
        acc[year - min] = null; 
        return acc;
      }, {} as Record<number, null>);
    }
    return Array.from({ length: (max - min) / 5 + 1 }, (_, i) => min + i * 5).reduce((acc, num) => {
      acc[num - min] = null; 
      return acc;
    }, {} as Record<number, null>);
  };

  const getMax = () =>{
    return (max-min)
  }

  const getValue = () =>{
    if(isYear){
      const val = !currentValue ? 1 : Math.floor((currentValue - min) / ((max - min) / (max - min)));
      return val;
    }
    return currentValue; 
  }

  return (
    <motion.div
      className="p-2"
      whileInView={{
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.3,
        },
      }}
      viewport={{ once: false }}
    >
      <h3 className="text-gray-400">{title}</h3>
      <Slider
        min={(isYear || !isRating) ? 0 : 0}
        max={isYear ? getMax() : max}
        range={range}
        value={getValue()}
        marks={getMarks()}
        onChange={(e) => {
          handleChange(e as any);
        }}
        onChangeComplete={(e) => {
          onChange && onChange(e);
        }}
        style={{ borderColor: "#d1d5db" }}
        dotStyle={{}}
      />
      <div className="flex flex-row justify-between w-full">
        {min && <h6 className="text-sm text-gray-400">{min}</h6>}
        {
          <h6 className="text-sm text-gray-400">{`${
            isYear ? currentValue ?? "All time" : currentValue ?? ''
          } ${isRating ? "stars" : ""}`}</h6>
        }
        {max && <h6 className="text-sm text-gray-400">{max}</h6>}
      </div>
    </motion.div>
  );
};

export default SlidingFilter;
