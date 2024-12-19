"use server";

import User from "@/models/User";
import { GlobalRequestParams } from "@/types/global";
import { GetUserApiResponse, GetUsersApiResponse, PostUserRequestType, PutUserRequestType } from "@/types/user";
import { httpResponseCodes } from "@/utils/constants";
import { generateSecureHash } from "@/utils/helpers";
import { ObjectId } from "mongodb";
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { LoginRequestType, LoginResponseType } from "@/types/auth";
const pump = promisify(pipeline);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const path = require('path');
const url = require('url');

export const createUser = async (
  user: PostUserRequestType
): Promise<GetUserApiResponse> => {
  const firstName = user.firstName;
  const lastName = user.lastName;
  const email = user.email;
  const password = user.password;
  const isAuthor = user.isAuthor;

  try {
    const emailCheck = await User.findOne().where("email").equals(email);
    if (emailCheck) {
      return {
        data: null,
        status: httpResponseCodes.BAD_REQUEST,
        message: "Email already taken. Kindly use another email.",
        count: 1,
        success: false,
      } as GetUserApiResponse;
    }

    const hash = await generateSecureHash(password);
    if (!hash.success) return hash as GetUserApiResponse;

    let imageUrl = "";
    if(user?.profile){
      const filePath = `./public/profile-images/${Date.now().toString()}${user?.profile?.name}`;
      await pump(user?.profile?.stream(), fs.createWriteStream(filePath));
      const relativePath = path.relative('./public', filePath);
      imageUrl = new url.URL(relativePath, process.env.NEXT_PUBLIC_APP_URL).href;
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      isAuthor,
      hash: hash.data?.value,
      salt: hash.data?.salt,
      imageUrl
    });
    const response = await newUser.save();
    return {
      data: response,
      status: httpResponseCodes.HANDLED,
      message: "Success",
      count: 1,
    } as GetUserApiResponse;
  } catch (error: any) {
    return {
      data: null,
      status: httpResponseCodes.INTERNAL_SERVER_ERROR,
      message: error?.message,
      count: 1,
    } as GetUserApiResponse;
  }
};

export const updateUser = async (
  user_id: string,
  user: PutUserRequestType
): Promise<GetUserApiResponse> => {
  
  try {
    const check = await User.findOne({_id: new ObjectId(user_id)});
    if (!check) {
      return {
        data: null,
        status: httpResponseCodes.BAD_REQUEST,
        message: "User doesn't have an account.",
        count: 1,
        success: false,
      } as GetUserApiResponse;
    }

    let imageUrl = check.imageUrl;
    if(user?.profile){
      const filePath = `./public/profile-images/${Date.now().toString()}${user?.profile?.name}`;
      await pump(user?.profile?.stream(), fs.createWriteStream(filePath));
      const relativePath = path.relative('./public', filePath);
      imageUrl = new url.URL(relativePath, process.env.NEXT_PUBLIC_APP_URL).href;
    }

    check.firstName = user.firstName ?? check.firstName;
    check.lastName = user.lastName ?? check.lastName;
    check.imageUrl = imageUrl;


    const response = await User.updateOne(
      { _id: check?._id },
      { $set: check})

    if(!response.acknowledged) {
      return {
        data: check,
        status: httpResponseCodes.BAD_REQUEST,
        message: "Unable to update. Please try again!",
        count: 1,
      } as GetUserApiResponse;
    }

    return {
      data: check,
      status: httpResponseCodes.HANDLED,
      message: "Success",
      count: 1,
    } as GetUserApiResponse;
  } catch (error: any) {
    console.log("Error here ;>>>>>>>>>>>>>", error);
    return {
      data: null,
      status: httpResponseCodes.INTERNAL_SERVER_ERROR,
      message: error?.message,
      count: 1,
    } as GetUserApiResponse;
  }
};

export const getUserById = async (id: string): Promise<GetUserApiResponse> => {
  try {
    const user = await User.findOne().where("_id").equals(new ObjectId(id))
    .select("firstName imageUrl lastName email isAuthor _id")
    .exec();

    return {
      data: user,
      status: httpResponseCodes.HANDLED,
      message: "Success",
      count: 1,
    } as GetUserApiResponse;
  } catch (error: any) {
    console.log("Error here ;>>>>>>>>>>>>>", error);
    return {
      data: null,
      status: httpResponseCodes.INTERNAL_SERVER_ERROR,
      message: error?.message,
      count: 1,
    } as GetUserApiResponse;
  }
};

export const deleteUser = async (id: string): Promise<GetUserApiResponse> => {
  try {
    const user = await User.findOne().where("_id").equals(new ObjectId(id));

    if (!user) {
      return {
        data: null,
        status: httpResponseCodes.HANDLED,
        message: "Success",
        count: 1,
      } as GetUserApiResponse;
    }

    await User.deleteOne({ _id: user._id });
    return {
      data: user,
      status: httpResponseCodes.HANDLED,
      message: "Success",
      count: 1,
    } as GetUserApiResponse;
  } catch (error: any) {
    console.log("Error here ;>>>>>>>>>>>>>", error);
    return {
      data: null,
      status: httpResponseCodes.INTERNAL_SERVER_ERROR,
      message: error?.message,
      count: 1,
    } as GetUserApiResponse;
  }
};

export const getUsers = async({searchQuery, size, page}: GlobalRequestParams): Promise<GetUsersApiResponse> => {
  try {
    const filter = searchQuery 
      ? { 
          $or: [
            { firstName: { $regex: new RegExp(searchQuery, 'i') } }, 
            { lastName: { $regex: new RegExp(searchQuery, 'i') } }
          ] 
        } 
      : {};
      const users = await User.find(filter)
      .skip((page! - 1) * size!)
      .limit(size!)
      .select("firstName imageUrl lastName email isAuthor books _id")
      .exec();
    return {
      data: users,
      status: httpResponseCodes.HANDLED,
      message: "Success",
      count: 1,
    } as GetUsersApiResponse;

  } catch (error: any) {
    console.log("Error here ;>>>>>>>>>>>>>", error);
    return {
      data: [],
      status: httpResponseCodes.INTERNAL_SERVER_ERROR,
      message: error?.message,
      count: 1,
    } as GetUsersApiResponse;
  }
}

export const getAuthors = async(): Promise<GetUsersApiResponse> => {
  try {
    
    const authors = await User.find({}).where('isAuthor').equals(true).select("firstName imageUrl lastName email books isAuthor _id")
    .exec();

    return {
      data: authors,
      status: httpResponseCodes.HANDLED,
      message: "Success",
      count: 1,
    } as GetUsersApiResponse;

  } catch (error: any) {
    console.log("Error here ;>>>>>>>>>>>>>", error);
    return {
      data: [],
      status: httpResponseCodes.INTERNAL_SERVER_ERROR,
      message: error?.message,
      count: 1,
    } as GetUsersApiResponse;
  }
}

export const login = async (auth: LoginRequestType): Promise<LoginResponseType>=>{
  try {
    
    const user = await User.findOne().where('email').equals(auth.email);
    if(!user){
      return {
        data: null,
        status: httpResponseCodes.BAD_REQUEST,
        message: "Your email is not recognized. Try again. ",
        count: 1,
      } as LoginResponseType;
    }

const check = bcrypt.compareSync(auth.password, user.hash);

if(!check){
  return {
    data: null,
    status: httpResponseCodes.BAD_REQUEST,
    message: "Your password do not match. Try again. ",
    count: 1,
  } as LoginResponseType;
}

const access_token = jwt.sign({id: user._id?.toString()}, process.env.JWT_SECRET, {
  expiresIn: "10000s",
});

delete user.hash;
delete user.salt;
delete user.__v;

    return {
      data: {
        access_token,
        user: {
          email:user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
          id: user._id?.toString()
        }
      },
      status: httpResponseCodes.HANDLED,
      message: "Success",
      count: 1,
    } as LoginResponseType;

  } catch (error: any) {
    console.log("Error here ;>>>>>>>>>>>>>", error);
    return {
      data: null,
      status: httpResponseCodes.INTERNAL_SERVER_ERROR,
      message: error?.message,
      count: 1,
    } as LoginResponseType;
  }
}
