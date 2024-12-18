"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import TextInputComponent from "@/components/inputs/text-input";
import { PutUserRequestType } from "@/types/user";
import { iUserUpdateFormValidation } from "@/form-validators/users";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetUser } from "@/hooks/users/get-user";
import { toFormData } from "@/utils/helpers/client-helpers";
import { useUpdateUser } from "@/hooks/users/update-user";

const ProfileSidebar = () => {
  const { user } = useGetUser();
  const [profile, setProfile] = useState<any>();
  const { handleBookUpdate } = useUpdateUser();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<PutUserRequestType>({
    resolver: yupResolver(iUserUpdateFormValidation),
    shouldUnregister: false,
    defaultValues: user ? { ...user } : {},
  });

  const onUpdateUser = handleSubmit((data: any) => {
    const formData = toFormData(data);
    formData.set("profile", profile);
    handleBookUpdate && handleBookUpdate(formData)
  });

  return (
    <motion.div
      className="col-span-3 rounded-md p-4 h-[95%] bg-lightDark pt-10"
      whileInView={{
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.3,
        },
      }}
      viewport={{ once: false }}
    >
      <div className="flex flex-col w-full justify-center items-center">
        <div className="relative">
          <Image
            src={profile ? URL.createObjectURL(profile[0]) : user?.imageUrl ? user?.imageUrl : `/picture-avatar.jpg`}
            alt="Profile picture"
            width={180}
            height={38}
            className="rounded-full border-2 border-white shadow-md w-[150px] h-[150px] object-cover"
            priority
          />
          <span className="absolute bottom-0 right-5 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
        </div>
        <div className="flex flex-col gap-5 mb-5 mt-8 w-full">
          <TextInputComponent
            control={control}
            name="profile"
            onInputChange={setProfile}
            placeholder="First nam (required)"
            type="file"
          />
          <TextInputComponent
            control={control}
            disabled={true}
            name="email"
            placeholder="Email address (required)"
            type="email"
          />
          <TextInputComponent
            control={control}
            name="firstName"
            error={errors.firstName?.message}
            placeholder="First nam (required)"
            type="text"
          />
          <TextInputComponent
            control={control}
            name="lastName"
            error={errors.lastName?.message}
            placeholder="Last name"
            type="text"
          />
        </div>
        <div className="flex justify-center">
          <motion.button
            onClick={onUpdateUser}
            whileTap={{ scale: 0.85 }}
            className="px-5 align-middle float-end h-[42px] my-10 text-md font-medium border bg-slate-50 rounded-[8px] text-gray-800 "
          >
            Save Changes
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileSidebar;
