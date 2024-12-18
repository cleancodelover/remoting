import { GlobalRequestParams, ValueSigninResponseInterface } from "@/types/global";
import { httpResponseCodes } from "../constants";
const bcrypt = require('bcrypt');

export const generateSecureHash = async (value:string): Promise<ValueSigninResponseInterface> => {
    if (!value) {
      return {
        success: false,
        message: "Provide to a value to hash",
        status: httpResponseCodes.BAD_REQUEST,
        data: null,
      } as ValueSigninResponseInterface;
    }
    try {
      const salt = bcrypt.genSaltSync(10);
      let result = await bcrypt.hashSync(value, salt);

      return {
        success: result ? true : false,
        message: result ? "Success" : "Provide to a value to hash",
        status: result ? httpResponseCodes.HANDLED : httpResponseCodes.BAD_REQUEST,
        data: result ? { value: result, salt } : null,
        count:0
      } as ValueSigninResponseInterface;
    } catch (error) {
      return {
        success: false,
        message: "Internal server error",
        status: httpResponseCodes.INTERNAL_SERVER_ERROR,
        count:0,
        data: null,
      } as ValueSigninResponseInterface;
    }
  }

  export const getQueryParams = (query: URLSearchParams): GlobalRequestParams =>{
    let params =  Object.fromEntries(query.entries());
    return params as any as GlobalRequestParams;
  }
