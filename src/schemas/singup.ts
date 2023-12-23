import * as yup from "yup";

export const signUpSchema = yup
  .object({
    name: yup.string().trim().required("Nome é obrigatório"),
    email: yup
      .string()
      .trim()
      .required("E-mail é obrigatório")
      .email("E-mail inválido"),
    password: yup.string().required("Senha é obrigatória"),
    picture: yup.string(),
  })
  .required();
