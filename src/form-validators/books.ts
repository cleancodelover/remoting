import * as Yup from 'yup';
import useToast from '@/hooks/notifications/toast';


const {showToast} = useToast();
export const iBookFormValidation = Yup.object().shape({
  _id: Yup.string().optional(),
  title: Yup.string().required('Title is required'),
  
  description: Yup.string().required('Description is required'),
  
  year: Yup.string().required('Year is required'),
  
  author: Yup.string().required('Author is required'),

  pages: Yup.number()
    .required('Pages are required')
    .positive('Pages must be a positive number')
    .integer('Pages must be an integer'),
  
  isbn: Yup.string()
  .required('ISBN is required')
  .matches(/^[\d-]{10,20}$/, 'ISBN must be between 10 to 20 characters'),
  
  unitPrice: Yup.string().optional(),
  
  bookCover: Yup.mixed().when('_id', {
    is: (id: string) => !id,  // If _id is not present (new book), bookCover is required
    then: (schema) => schema.required('Book cover is required for new books'),
    otherwise: (schema) => schema.optional(),  // If _id is present (edit book), bookCover is optional
  }),
  
  bookFile: Yup.mixed().when('_id', {
    is: (id: string) => !id,  // If _id is not present (new book), bookFile is required
    then: (schema) => schema.required('Book file is required for new books'),
    otherwise: (schema) => schema.optional(),  // If _id is present (edit book), bookFile is optional
  }),
});

export const iBookReviewFormValidation = Yup.object().shape({
  book_id: Yup.string()
    .optional(),
  message: Yup.string()
    .required('Message is required'),
});