import { z } from "h3-zod";
import SigninSchema from "./Signin.schema";

export default SigninSchema.extend({
  name: z
    .string({
      required_error: "Por favor, insira seu nome",
      invalid_type_error: "Por favor, indique um nome válido",
    })
    .min(2),
  passwordConfirm: z
    .string({
      required_error: "Confirmação de senha é obrigatório",
    })
    .min(8),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "As senhas não coincidem",
  path: ["passwordConfirm"],
});
