import * as yup from 'yup';

export const collaboratorValidationSchema = yup.object().shape({
  name: yup.string().required(),
  creator_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
