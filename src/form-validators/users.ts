import * as yup from 'yup';

export const iUserUpdateFormValidation = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  profile: yup.mixed().optional(),
});