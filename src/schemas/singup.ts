import * as yup from "yup";

export const signUpSchema = yup
  .object({
    name: yup.string().trim().required("Nome é obrigatório"),
    email: yup
      .string()
      .trim()
      .required("E-mail é obrigatório")
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "E-mail inválido"),
    password: yup.string().required("Senha é obrigatória"),
    picture: yup.string(),
  })
  .required();
