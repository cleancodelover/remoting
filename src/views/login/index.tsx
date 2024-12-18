"use client";
import TextInputComponent from "@/components/inputs/text-input";
import { usePopOver } from "@/contexts/popOverContext";
import { iLoginFormValidation } from "@/form-validators/auth";
import { useLogin } from "@/hooks/auth/login";
import { LoginRequestType } from "@/types/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import React from "react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginRequestType>({
    resolver: yupResolver(iLoginFormValidation),
  });
  const { setView } = usePopOver();
  const { setIsOpen } = usePopOver();
  const { handleLogin, loading } = useLogin(()=>{
    setIsOpen && setIsOpen(false);
  });

  const onLogin = handleSubmit((data: LoginRequestType)=>{
    handleLogin(data)
  })
  return (
    <>
      <div className="h-full mr-5 w-[22vw] flex flex-col justify-center">
        <h1 className="font-bold text-3xl">Login</h1>
        <h4>
          Do not have an account?{" "}
          <button
            onClick={() => {
                setView && setView('signup')
            }}
            className="text-green-500"
          >
            Sign up
          </button>{" "}
        </h4>
        <div className="flex flex-col gap-5 mb-5 mt-8">
          <TextInputComponent
            control={control}
            name="email"
            placeholder="Email address (required)"
            error={errors.email?.message}
            type="email"
          />
          <TextInputComponent
            control={control}
            name="password"
            placeholder="Password (required)"
            error={errors.password?.message}
            type="password"
          />
        </div>
        <div className="flex justify-center">
          <motion.button
            onClick={onLogin}
            whileTap={{ scale: 0.85 }}
            className="px-5 w-[80%] align-middle float-end h-[42px] my-10 text-md font-medium border bg-slate-50 rounded-[8px] text-gray-800 "
          >
            Login
          </motion.button>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
