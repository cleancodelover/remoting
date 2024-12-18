export interface GlobalApiResponseInterface {
    message: string;
    count: number;
    status: number;
  }

  export type GlobalRequestParams = {
    page?: number =1,
    size?: number = 20,
    searchQuery?: string,
    year?: number,
    rating?: number,
    author?: string,
    pages?:number,
    category?: string
  }

  export interface ValueSigninResponseInterface {
    message: string;
    count: number;
    status: number;
    success: boolean,
    data?: {value: string, salt: string} | null
  }

  export type HookOnSuccessType = () => void | null;
  export type HookOnErrorType = () => void | null;
  export type HookOnMutateType = () => void | null;