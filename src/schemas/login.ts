import * as yup from "yup";

export const loginSchema = yup
  .object({
    email: yup
      .string()
      .required("E-mail é obrigatório")
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "E-mail inválido"),
    password: yup.string().required("Senha é obrigatória"),
  })
  .required();
