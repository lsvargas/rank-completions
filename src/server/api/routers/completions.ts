import { z } from "zod";
import { Configuration, OpenAIApi } from "openai";

import { createTRPCRouter, publicProcedure } from "../trpc";
import type ICompletion from "../../../types/completion.type";

const TEMPERATURE = 0.2;
const MODEL = "text-davinci-003";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const fetchCompletion = async (prompt: string) => {
  const completion = await openai.createCompletion({
    model: MODEL,
    prompt,
    temperature: TEMPERATURE,
    max_tokens: 256
  });

  return completion;
};


export const completionsRouter = createTRPCRouter({
  getCompletions: publicProcedure
    .input(z.object({ prompt: z.string() }))
    .query(async ({ input }) => {
      if (!configuration.apiKey) {
        return { error: { message: "OpenAI API key not configured" } };
      }

      const completions = await Promise.all([1, 2, 3].map(() => fetchCompletion(input.prompt)));

      return { completions: completions.map((c) => c.data.choices[0].text) };
    }),

  getCompletionsByIds: publicProcedure
    .input(z.object({ ids: z.string() }))
    .query(async ({ input, ctx }) => {
      const completions: ICompletion[] = await ctx.prisma.completion.findMany({
        where: { id: { in: input.ids.split(",").map(id => parseInt(id, 10)) }}
      });

      return { completions };
    }),
    update: publicProcedure
      .input(z.object({ id: z.number(), text: z.optional(z.string()), rank: z.optional(z.number()) }))
      .mutation(async ({ input, ctx }) => {
        const completion: ICompletion = await ctx.prisma.completion.update({
          where: { id: input.id },
          data: { rank: input.rank, value: input.text }
        })

        return { ...completion };
      }),
});
