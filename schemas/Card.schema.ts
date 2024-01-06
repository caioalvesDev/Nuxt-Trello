import { z } from "zod";

export default z.object({
  title: z.string({
    required_error: "Título é obrigatório",
  }).min(1).max(100),
  description: z.string().min(1).max(1000).optional(),
  list: z.string(),
});
