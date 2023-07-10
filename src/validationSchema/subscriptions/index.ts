import * as yup from 'yup';

export const subscriptionValidationSchema = yup.object().shape({
  service_name: yup.string().required(),
  subscription_date: yup.date().required(),
  creator_id: yup.string().nullable(),
});
