import * as yup from "yup";

export const iLoginFormValidation = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required')
});

export const iSignUpFormValidation = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 8 characters long'),
    email: yup.string().required('Email is required').email('Invalid email format'),
    isAuthor: yup.boolean().required('isAuthor is required'),
    profile: yup.mixed().optional(),
  });

export const iUpdateProfileFormValidation = yup.object().shape({
  firstName: yup.string().min(2).required("First name can't be empty"),
  lastName: yup.string().min(2).required("Last name can't be empty")
});
