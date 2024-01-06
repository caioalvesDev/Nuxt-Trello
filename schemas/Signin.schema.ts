import { z } from "h3-zod";

export default z.object({
  email: z
    .string({
      invalid_type_error: "Por favor insira um endereço de e-mail válido",
      required_error: "Por favor, indique o seu endereço de e-mail",
    })
    .email({
      message: 'Email inválido'
    }),
  password: z.string({
    required_error: "Senha é obrigatório",
  }).min(8),
});
