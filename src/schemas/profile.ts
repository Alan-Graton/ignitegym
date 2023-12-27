import * as yup from "yup";

const profileSchema = yup.object({
  name: yup.string().required("Informe o nome.").trim(),
  email: yup.string().required(),
  old_password: yup
    .string()
    .nullable()
    .transform((value) => (!!value ? value : null))
    .when("password", {
      is: (Field: any) => Field,
      then: () => yup.string().nullable().required("Informe a senha antiga."),
    }),
  password: yup
    .string()
    .required("Nova senha é obrigatória")
    .min(6, "A senha deve ter pelo menos 6 dígitos")
    .nullable()
    .transform((value) => (!!value ? value : null)),
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => (!!value ? value : null))
    .oneOf([yup.ref("password")], "A confirmação de senha não confere.")
    .when("password", {
      is: (Field: any) => Field,
      then: () =>
        yup
          .string()
          .nullable()
          .transform((value) => (!!value ? value : null))
          .required("Informe a confirmação da senha."),
    }),
});

interface IProfileForm {
  name: string;
  email: string;
  old_password?: string | null;
  password: string | null;
  confirm_password?: string | null;
}

export { profileSchema, IProfileForm };
