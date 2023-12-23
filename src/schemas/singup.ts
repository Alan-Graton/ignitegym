import * as yup from "yup";

export const signUpSchema = yup
  .object({
    name: yup.string().trim().required(),
    email: yup.string().trim().required(),
    password: yup.string().required(),
  })
  .required();
