export const generateUrlWithParams = (baseUrl: string, params?: any): string => {
  if (!params) return baseUrl;
  let url: string = baseUrl + "?";

  for (const key in params) {
    if (params[key] !== null && params[key] !== undefined) {
      url += `${key}=${encodeURIComponent(String(params[key]))}&`;
    }
  }

  url = url.slice(0, -1);

  return url;
};
