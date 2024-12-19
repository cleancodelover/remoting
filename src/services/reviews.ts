"use server";
import { GlobalRequestParams } from "@/types/global";
import { httpResponseCodes } from "@/utils/constants";
import { ObjectId } from "mongodb";
import { GetBookReviewApiResponse, GetBookReviewsApiResponse, PostBookReviewRequestType, PutBookReviewRequestType } from "@/types/review";
import Review from "@/models/Review";

export const reviewBook = async ( user_id:string, review: PostBookReviewRequestType ): Promise<GetBookReviewApiResponse> => {
  try {
    const newReview = new Review({ book_id: new ObjectId(review.book_id), user_id: new ObjectId(user_id), message: review.message });
    const response = await newReview.save();
    return {
      data: response,
      status: httpResponseCodes.HANDLED,
      message: "Success",
      count: 1,
    } as GetBookReviewApiResponse;
  } catch (error: any) {
    console.log("Error here ;>>>>>>>>>>>>>", error);
    return {
      data: null,
      status: httpResponseCodes.INTERNAL_SERVER_ERROR,
      message: error?.message,
      count: 1,
    } as GetBookReviewApiResponse;
  }
};

export const updateBookReview = async ( review: PutBookReviewRequestType ): Promise<GetBookReviewApiResponse> => {
    try {
      
        const check = await Review.findOne({_id: new ObjectId(review._id)});
        if (!check) {
          return {
            data: null,
            status: httpResponseCodes.BAD_REQUEST,
            message: "User doesn't have an account.",
            count: 1,
            success: false,
          } as GetBookReviewApiResponse;
        }
    
        check.message = review.message ?? check.message;
        const response = await Review.updateOne(check);

        if(!response.acknowledged) {
            return {
              data: check,
              status: httpResponseCodes.BAD_REQUEST,
              message: "Unable to update. Please try again!",
              count: 1,
            } as GetBookReviewApiResponse;
          }
      

      return {
        data: check,
        status: httpResponseCodes.HANDLED,
        message: "Success",
        count: 1,
      } as GetBookReviewApiResponse;
    } catch (error: any) {
      console.log("Error here ;>>>>>>>>>>>>>", error);
      return {
        data: null,
        status: httpResponseCodes.INTERNAL_SERVER_ERROR,
        message: error?.message,
        count: 1,
      } as GetBookReviewApiResponse;
    }
  };

export const deleteReview = async (id: string): Promise<GetBookReviewApiResponse> => {
  try {
    const review = await Review.findOne().where("_id").equals(new ObjectId(id));

    if (!review) {
      return {
        data: null,
        status: httpResponseCodes.HANDLED,
        message: "Success",
        count: 1,
      } as GetBookReviewApiResponse;
    }

    await Review.deleteOne({ _id: review._id });
    return {
      data: null,
      status: httpResponseCodes.HANDLED,
      message: "Success",
      count: 1,
    } as GetBookReviewApiResponse;
  } catch (error: any) {
    console.log("Error here ;>>>>>>>>>>>>>", error);
    return {
      data: null,
      status: httpResponseCodes.INTERNAL_SERVER_ERROR,
      message: error?.message,
      count: 1,
    } as GetBookReviewApiResponse;
  }
};

export const getBookReviews = async(book_id:string, {searchQuery, size = 20, page = 1}: GlobalRequestParams): Promise<GetBookReviewsApiResponse> => {
  try {
    const reviews = await Review.aggregate([
      {
        $match: {book_id: new ObjectId(book_id)}
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      { 
        $unwind: '$user' 
      },
      { 
        $skip: (page! - 1) * size! 
      },
      { 
        $limit: size! 
      },
      {
        $project: {
          _id: 1,
          book_id: 1,
          user_id: 1,
          message: 1,
          'user.firstName': 1,
          'user.lastName': 1,
          'user.email': 1,
          'user.imageUrl': 1
        }
      }
    ])
    return {
      data: reviews,
      status: httpResponseCodes.HANDLED,
      message: "Success",
      count: 1,
    } as GetBookReviewsApiResponse;

  } catch (error: any) {
    console.log("Error here ;>>>>>>>>>>>>>", error);
    return {
      data: [],
      status: httpResponseCodes.INTERNAL_SERVER_ERROR,
      message: error?.message,
      count: 1,
    } as GetBookReviewsApiResponse;
  }
}
