import { GlobalRequestParams } from "@/types/global";
import { generateUrlWithParams } from "@/utils/helpers/generate-params";
import { BOOK_RATING_ENDPONT, BOOK_RATINGS_ENDPONT, BOOK_REVIEW_ENDPONT, BOOK_REVIEWS_ENDPONT, BOOKS_ENDPONT, USER_BOOKS_ENDPONT, USERS_ENDPONT } from "../endpoints";
import { globalHttpClient } from "../http-client";
import { GetBookApiResponse, GetBooksApiResponse } from "@/types/book";
import { GetBookReviewApiResponse, GetBookReviewsApiResponse, PostBookReviewRequestType, PutBookReviewRequestType } from "@/types/review";
import { GetBookRatingApiResponse, GetGeneralBookRatingApiResponse, PostBookRatingRequestType } from "@/types/rating";
const jsonBooks = require('@/utils/mock/books.json');

export const getBooksApi = async (params?: GlobalRequestParams) =>{
    const endpoint = generateUrlWithParams(BOOKS_ENDPONT, params);
    try {
        const response = await globalHttpClient.get<GetBooksApiResponse>(endpoint);
        return response;
    } catch (error) {
        console.log("Error :>>>>>>>>>>>>", error)
        throw error;
    }
}

export const getAuthorBooksApi = async (params?: GlobalRequestParams) =>{
    const endpoint = generateUrlWithParams(`${USER_BOOKS_ENDPONT}`, params);
    try {
        const response = await globalHttpClient.get<GetBooksApiResponse>(endpoint);
        return response;
        
    } catch (error) {
        console.log("Error :>>>>>>>>>>>>", error)
        throw error;
    }
}

export const getBookByIdApi = async (id?: string) => {
    const endpoint = `${BOOKS_ENDPONT}/${id}`;
    try {
        const response = await globalHttpClient.get<GetBookApiResponse>(endpoint);
        return response;
        
    } catch (error) {
        console.log("Error :>>>>>>>>>>>>", error)
        throw error;
    }
}

export const createBookApi = async (data: FormData) =>{
    try{
        const response = await globalHttpClient.post<GetBookApiResponse>(BOOKS_ENDPONT, data, {});
        return response;
    } catch (error) {
        console.log("Error :>>>>>>>>>>>>", error)
        throw error;
    }
}

export const updateBookApi = async (data: FormData) =>{
    try{
        const response = await globalHttpClient.patch<GetBookApiResponse>(BOOKS_ENDPONT, data, {});
        return response;
    } catch (error) {
        console.log("Error :>>>>>>>>>>>>", error)
        throw error;
    }
}

export const deleteBookApi = async (id?: string) =>{
    try {
        const endpoint = `${BOOKS_ENDPONT}/${id}`;
        const response = await globalHttpClient.delete<GetBookApiResponse>(endpoint);
        return response;
    } catch (error) {
        console.log("Error :>>>>>>>>>>>>", error)
        throw error;
    }
}

export const addBookReviewApi = async (data: PostBookReviewRequestType) =>{
    try{
        const response = await globalHttpClient.post<GetBookReviewApiResponse>(`${BOOK_REVIEW_ENDPONT}`, data, {});
        return response;
    } catch (error) {
        console.log("Error :>>>>>>>>>>>>", error)
        throw error;
    }
}

export const getBookReviewsApi = async (book_id?: string, params?: GlobalRequestParams) =>{
    const endpoint = generateUrlWithParams(`${BOOK_REVIEWS_ENDPONT}/${book_id}`, params);
    const response = await globalHttpClient.get<GetBookReviewsApiResponse>(endpoint);
    return response;
}

export const updateBookReviewApi = async (data: PutBookReviewRequestType) =>{
    try{
        const response = await globalHttpClient.post<GetBookReviewApiResponse>(BOOK_REVIEW_ENDPONT, data, {});
        return response;
    } catch (error) {
        console.log("Error :>>>>>>>>>>>>", error)
        throw error;
    }
}

export const deleteBookReviewApi = async (id?: string) =>{
    try {
        const endpoint = `${BOOK_REVIEW_ENDPONT}/${id}/books`;
        const response = await globalHttpClient.delete<GetBookReviewApiResponse>(endpoint);
        return response;
    } catch (error) {
        console.log("Error :>>>>>>>>>>>>", error)
        throw error;
    }
}

export const addBookRatingApi = async (data: PostBookRatingRequestType) =>{
    try{
        const response = await globalHttpClient.post<GetBookRatingApiResponse>(`${BOOK_RATING_ENDPONT}`, data, {});
        return response;
    } catch (error) {
        console.log("Error :>>>>>>>>>>>>", error)
        throw error;
    }
}

export const getBookRatingApi = async (book_id?: string) =>{
    const endpoint = generateUrlWithParams(`${BOOK_RATINGS_ENDPONT}/${book_id}`);
    const response = await globalHttpClient.get<GetGeneralBookRatingApiResponse>(endpoint);
    return response;
}

export const deleteBookRatingApi = async (id?: string) =>{
    try {
        const endpoint = `${BOOK_RATING_ENDPONT}/${id}/books`;
        const response = await globalHttpClient.delete<GetBookReviewApiResponse>(endpoint);
        return response;
    } catch (error) {
        console.log("Error :>>>>>>>>>>>>", error)
        throw error;
    }
}