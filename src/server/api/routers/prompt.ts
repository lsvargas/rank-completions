import { z } from "zod";
import IPrompt from "../../../types/prompt.type";

import { createTRPCRouter, publicProcedure } from "../trpc";

const findOrCreatePrompt = async (ctx, value: string): Promise<IPrompt> => {
  let prompt = await ctx.prisma.prompt.findUnique({ where: { value } });

  if (!prompt) {
    prompt = await ctx.prisma.prompt.create({ data: { value} });
  }

  return prompt;
}



export const promptRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ promptValue: z.string(), completions: z.array(z.object({ value: z.string(), rank: z.number() })) }))
    .mutation(async ({ input, ctx }) => {
      const prompt = await findOrCreatePrompt(ctx, input.promptValue);

      let completions;
      try {
        completions = await Promise.all(
          input.completions.map(
            comp => ctx.prisma.completion.create({ data: { promptId: prompt.id, value: comp.value, rank: comp.rank  } })
          )
        )
      } catch (err) {
        console.log(err)
      }

      return { id: prompt.id, completions };
    })
});
