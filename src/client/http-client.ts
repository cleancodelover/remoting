import useToast from "@/hooks/notifications/toast";
import { getFromSecureStore, removeFromSecureStore, secureKeys } from "@/utils/helpers/secure-store";
import { validateToken } from "@/utils/helpers/token-validation";
import axios from "axios";
import router from "next/router";
const { showToast } = useToast();

const unprotectedRoutes = ["/auth/sign-in", "/books", "/sign-up"];
const baseUrl = process.env.NEXT_PUBLIC_APP_API_ENDPOINT;

export const globalHttpClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

globalHttpClient.interceptors.request.use(async (config: any) => {
  const token = await getFromSecureStore(secureKeys.tokenKey);
  const tokenValid = await validateToken();
  const currentRoute = await getFromSecureStore(secureKeys.currentRoute);
  if (!tokenValid) {
    if (token) {
      await removeFromSecureStore(secureKeys.tokenKey);
      showToast({message:'Session expired!', type:'info'});
      router.push("/auth/login");
    }
  }
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});