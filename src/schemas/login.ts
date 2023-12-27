import * as yup from "yup";

const loginSchema = yup
  .object({
    email: yup
      .string()
      .required("E-mail é obrigatório")
      .email("E-mail inválido"),
    password: yup.string().required("Senha é obrigatória"),
  })
  .required();

interface ILoginForm {
  email: string;
  password: string;
}

export { loginSchema, ILoginForm };
