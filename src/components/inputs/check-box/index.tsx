"use client";

import React from "react";
import {Control, Controller} from "react-hook-form";

export type OptionType ={
  value: string,
  name: string
}

interface componentProps {
  options: OptionType[] | [];
  placeholder?: string;
  defaultValue?: any | any[] | null;
  control?: any;
  name: string;
  error?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  onScrollToBottom?: () => void;
  onScrollToTop?: () => void;
  onInputValueChange?: (value: string) => void;
  multiple?: boolean;
  disabled?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

const CheckBoxComponent = ({
  options,
  defaultValue,
  name,
  control,
  error,
  label,
}: componentProps) => {
  return (
    <div>
      {label && (
        <div className={``}>
          <h3
            className={`mb-1 block text-gray-400`}
          >
            {label}
          </h3>
        </div>
      )}

      <div className="flex  flex-col w-full">
        {options.map((option, index) => (
          <Controller
            key={`${option?.value}${index}`}
            name={name}
            control={control}
            render={({field}) => (
              <label
                className={`${
                  error ? "border-0 bg-red-50" : "text-gray-400"
                } flex flex-1 items-center border-0  h-[44px] rounded-lg`}
              >
                <input
                  {...field}
                  id={option.value}
                  type="checkbox"
                  value={option.value}
                  className={`${
                    error ? "border-red-500" : "bg-gray-400 border-gray-400 border-none"
                  } w-4 h-4 text-blue-600 `}
                />

                <h5
                  // htmlFor={option}
                  className={`w-full py-1 ms-2 text-xs font-medium text-gray-400`}
                >
                  {option.name}
                </h5>
              </label>
            )}
          />
        ))}
      </div>

      {error && (
        <p className="mt-1 text-xs text-red-600 dark:text-red-500">
          <span className="font-medium">Opps!</span> {error}
        </p>
      )}
    </div>
  );
};

export default CheckBoxComponent;
