import * as yup from "yup";

const signUpSchema = yup
  .object({
    name: yup.string().trim().required("Nome é obrigatório"),
    email: yup
      .string()
      .trim()
      .required("E-mail é obrigatório")
      .email("E-mail inválido"),
    password: yup
      .string()
      .required("Senha é obrigatória")
      .min(6, "A senha deve ter pelo menos 6 dígitos"),
    password_confirm: yup
      .string()
      .required("Confirme a senha")
      .oneOf([yup.ref("password")], "Senhas não são iguais"),
    picture: yup.string(),
  })
  .required();

interface ISignupForm {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
  picture?: string;
}

export { signUpSchema, ISignupForm };
