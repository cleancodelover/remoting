import {decode as base64Decode} from "base-64";

interface JWTPayload {
  account_roles?: string;
  exp?: number;
  iat?: number;
  sub?: string;
  [key: string]: any;
}
export const localJWTDecoder = (token: string): JWTPayload | null => {
  try {
    const parts = token.split(".");
    if (parts?.length !== 3) {
      throw new Error("Invalid token format");
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decodedPayload = base64Decode(base64);

    return JSON.parse(decodedPayload) as JWTPayload;
  } catch (error: any) {
    //console.error("Error decoding JWT:", error.message);
    return null;
  }
};
