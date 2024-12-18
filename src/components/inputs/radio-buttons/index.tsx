"use client";

import React from "react";
import {Control, Controller} from "react-hook-form";

interface componentProps {
  options: string[] | [];
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

const RadioButtonsSelectComponent = ({
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
          <p
            className={`mb-1 block text-xs font-medium ${
              error ? "text-red-900" : "text-gray-900"
            } `}
          >
            {label}
          </p>
        </div>
      )}

      <div className="flex gap-x-4 w-full">
        {options.map((option, index) => (
          <Controller
            key={`${option}${index}`}
            name={name}
            control={control}
            render={({field}) => (
              <label
                className={`${
                  error ? "border-red-500 bg-red-50" : "border-gray-200"
                } flex flex-1 items-center ps-4 border  h-[44px] rounded-lg`}
              >
                <input
                  {...field}
                  id={option}
                  type="radio"
                  value={option}
                  className={`${
                    error ? "border-red-500" : "bg-gray-100 border-gray-300"
                  } w-4 h-4 text-blue-600 `}
                />

                <p
                  // htmlFor={option}
                  className={`w-full py-4 ms-2 text-xs font-medium ${
                    error ? "text-red-700" : "text-gray-900 "
                  }`}
                >
                  {option}
                </p>
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

export default RadioButtonsSelectComponent;
