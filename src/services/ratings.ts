"use server";
import User from "@/models/User";
import { GlobalRequestParams } from "@/types/global";
import { httpResponseCodes } from "@/utils/constants";
import { ObjectId } from "mongodb";
import { GetBookRatingApiResponse, GetBookRatingsApiResponse, GetGeneralBookRatingApiResponse, GetGeneralBookRatingType, PostBookRatingRequestType } from "@/types/rating";
import Rating from "@/models/Rating";

export const rateBook = async ( user_id:string, rating: PostBookRatingRequestType ): Promise<GetBookRatingApiResponse> => {
  try {
    const bookCheck = await User.findOne({book_id: new ObjectId(rating.book_id), user_id: new ObjectId(user_id)});
    if (bookCheck) {
      return {
        data: null,
        status: httpResponseCodes.BAD_REQUEST,
        message: "You have already rate this book.",
        count: 1,
        success: false,
      } as GetBookRatingApiResponse;
    }

    
    const newRating = new Rating({ ...rating, user_id: new ObjectId(user_id) });
    const response = await newRating.save();
    return {
      data: response,
      status: httpResponseCodes.HANDLED,
      message: "Success",
      count: 1,
    } as GetBookRatingApiResponse;
  } catch (error: any) {
    console.log("Error here ;>>>>>>>>>>>>>", error);
    return {
      data: null,
      status: httpResponseCodes.INTERNAL_SERVER_ERROR,
      message: error?.message,
      count: 1,
    } as GetBookRatingApiResponse;
  }
};

export const deleteRating = async (id: string): Promise<GetBookRatingApiResponse> => {
  try {
    const rating = await Rating.findOne().where("_id").equals(new ObjectId(id));

    if (!rating) {
      return {
        data: null,
        status: httpResponseCodes.HANDLED,
        message: "Success",
        count: 1,
      } as GetBookRatingApiResponse;
    }

    await Rating.deleteOne({ _id: rating._id });
    return {
      data: rating,
      status: httpResponseCodes.HANDLED,
      message: "Success",
      count: 1,
    } as GetBookRatingApiResponse;
  } catch (error: any) {
    console.log("Error here ;>>>>>>>>>>>>>", error);
    return {
      data: null,
      status: httpResponseCodes.INTERNAL_SERVER_ERROR,
      message: error?.message,
      count: 1,
    } as GetBookRatingApiResponse;
  }
};

export const getBookRatings = async(book_id:string): Promise<GetGeneralBookRatingApiResponse> => {
  try {
    // const ratings = await Rating.find({book_id: new ObjectId(book_id)});
    const ratings = {} as GetGeneralBookRatingType;
    const stats = await Rating.aggregate([
      { 
        $match: { bookId: new ObjectId(book_id) } // Filter ratings for the specific book
      },
      { 
        $group: {
          _id: '$bookId',
          totalRatings: { $sum: 1 }, // Count total number of ratings
          averageRating: { $avg: '$quantity' } // Calculate average rating
        }
      }
    ]);

    if (stats?.length > 0) {
      const { totalRatings, averageRating } = stats[0];
      ratings.average = averageRating;
      ratings.total = totalRatings;
    } else {
      ratings.average = 0;
      ratings.total = 0;
    }

    return {
      data: ratings,
      status: httpResponseCodes.HANDLED,
      message: "Success",
      count: 1,
    } as GetGeneralBookRatingApiResponse;

  } catch (error: any) {
    console.log("Error here ;>>>>>>>>>>>>>", error);
    return {
      data: {},
      status: httpResponseCodes.INTERNAL_SERVER_ERROR,
      message: error?.message,
      count: 1,
    } as GetGeneralBookRatingApiResponse;
  }
}
