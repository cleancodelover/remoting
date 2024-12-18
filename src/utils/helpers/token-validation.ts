import { localJWTDecoder } from "./jwt-decode";
import { getFromSecureStore, removeFromSecureStore, secureKeys } from "./secure-store";

export const validateToken = async () => {
  try {
    const token = await getFromSecureStore(secureKeys.tokenKey);

    if (token) {
      const decodedToken = localJWTDecoder(token);

      const currentTime = Date.now() / 1000;
      //@ts-ignore
      if (decodedToken.exp < currentTime) {
        await removeFromSecureStore(secureKeys.tokenKey);
        return false;
      } else {
        return true;
      }
    } else {
      const currentRoute = await getFromSecureStore(secureKeys.currentRoute);
      if (currentRoute === "/auth/login") {
        // Toast.show({
        //   type: "success",
        //   text1: "Welcome Back",
        //   text2: "Log into your account",
        //   topOffset: globalConstants.toastOffset,
        // });
      }

      return false;
    }
  } catch (error) {
    await removeFromSecureStore(secureKeys.tokenKey);

    // Toast.show({
    //   type: "error",
    //   text1: "Please log into your account",
    //   topOffset: globalConstants.toastOffset,
    // });

    return false;
  }
};
