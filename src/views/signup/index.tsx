"use client";
import CheckBoxComponent from "@/components/inputs/check-box";
import TextInputComponent from "@/components/inputs/text-input";
import { usePopOver } from "@/contexts/popOverContext";
import { iSignUpFormValidation } from "@/form-validators/auth";
import { useSignup } from "@/hooks/auth/signup";
import { PostUserRequestType } from "@/types/user";
import { toFormData } from "@/utils/helpers/client-helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import React from "react";
import { useForm } from "react-hook-form";
import PulseLoader from "react-spinners/PulseLoader";

const SignupForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<PostUserRequestType>({
    resolver: yupResolver(iSignUpFormValidation)
  });
  const { setView } = usePopOver();
  const { handleSignUp, loading } = useSignup(()=>{ setView && setView('login') });
  const onSignup = handleSubmit((data: PostUserRequestType) =>{
    const formData = toFormData(data);
    handleSignUp(formData);
  })

  return (
    <>
      <div className="h-full mr-5 w-[22vw] flex flex-col justify-center">
        <h1 className="font-bold text-3xl">Register</h1>
        <h4>
          Already have an account?{" "}
          <button
            onClick={() => {
              setView && setView('login')
            }}
            className="text-green-500"
          >
            Login
          </button>{" "}
        </h4>
        <div className="flex flex-col gap-5 mb-5 mt-8">
          <TextInputComponent
            control={control}
            name="email"
            required
            placeholder="Email address (required)"
            error={errors.email?.message}
            type="email"
          />
          <div className="flex flex-row justify-between gap-3">
            <div className="col-span-6">
              <TextInputComponent
                control={control}
                name="firstName"
                required
                error={errors.firstName?.message}
                placeholder="First nam (required)"
                type="text"
              />
            </div>
            <div className="col-span-6">
              <TextInputComponent
                control={control}
                name="lastName"
                error={errors.lastName?.message}
                placeholder="Last name"
                type="text"
              />
            </div>
          </div>
          <TextInputComponent
            control={control}
            name="password"
            required
            error={errors.password?.message}
            placeholder="Password (required)"
            type="password"
          />
          <CheckBoxComponent control={control} name="isAuthor" options={[{value: 'author', name:"Yes, I'm an author"}]} />
        </div>
        <div className="flex justify-center">
          <motion.button
            onClick={onSignup}
            whileTap={{ scale: 0.85 }}
            className="px-5 w-[80%] align-middle float-end h-[42px] my-10 text-md font-medium border bg-slate-50 rounded-[8px] text-gray-800 "
          >
            {loading ? <PulseLoader size={4} /> : 'Sign up'}
          </motion.button>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
