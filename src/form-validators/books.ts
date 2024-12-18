import * as Yup from 'yup';
import useToast from '@/hooks/notifications/toast';


const {showToast} = useToast();
export const iBookFormValidation = Yup.object().shape({
  title: Yup.string()
    .required('Title is required'),
  
  description: Yup.string()
    .required('Description is required'),
  
    author: Yup.string()
    .required('Author is required'),

  pages: Yup.number()
    .required('Pages are required')
    .positive('Pages must be a positive number')
    .integer('Pages must be an integer'),
  
  isbn: Yup.string()
    .required('ISBN is required')
    .matches(/^\d{10}(\d{3})?$/, 'ISBN must be 10 or 13 digits'),
  
  unitPrice: Yup.string()
    .optional(),
  
  bookCover: Yup.mixed().required("Book cover is required!"),
  
  bookFile: Yup.mixed().required("Book cover is required!")
});

export const iBookReviewFormValidation = Yup.object().shape({
  book_id: Yup.string()
    .required(()=>{ showToast({message:'Something went wrong. Refresh and try again.', type:'error'})}),
  message: Yup.string()
    .required('Message is required'),
});