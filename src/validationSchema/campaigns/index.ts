import * as yup from 'yup';

export const campaignValidationSchema = yup.object().shape({
  name: yup.string().required(),
  start_date: yup.date().required(),
  end_date: yup.date().required(),
  creator_id: yup.string().nullable(),
});
