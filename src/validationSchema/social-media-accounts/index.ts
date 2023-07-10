import * as yup from 'yup';

export const socialMediaAccountValidationSchema = yup.object().shape({
  platform_name: yup.string().required(),
  account_name: yup.string().required(),
  creator_id: yup.string().nullable(),
});
