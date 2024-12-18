export const secureKeys = {
  tokenKey: "token",
  currentRoute: "current-route",
  searchHistory: "search-history",
  redirectedFrom: "redirected-from",
};

export const saveToSecureStore = async (key: string, value: any) => {
  if (typeof window !== "undefined") {
    await localStorage.setItem(key, value);
  }
};

export const getFromSecureStore = async (key: string): Promise<any> => {
  if (typeof window !== "undefined") {
    return await localStorage.getItem(key);
  }
  return null;
};

export const removeFromSecureStore = async (key: string): Promise<any> => {
  if (typeof window !== "undefined") {
    await localStorage.removeItem(key);
  }
};


