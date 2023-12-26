import * as yup from "yup";

export const profileSchema = yup.object({
  name: yup.string().trim(),
  email: yup.string(),
  old_password: yup.string(),
  new_password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 dígitos"),
    // .required("Nova senha é obrigatória")
  confirm_new_password: yup
    .string()
    .oneOf([yup.ref("new_password")], "Confirmação de nova senha incorreta."),
    // .required("Confirmação de senha obrigatória")
});
