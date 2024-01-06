import { z } from "zod";

export default z.object({
  name: z.string({required_error: 'Nome da lista obrigatório'}).min(1).max(255),
  cards: z.array(z.string()).optional(),
  board: z.string(),
});
