// src/ai/flows/personalized-recommendations.ts
'use server';

/**
 * @fileOverview A personalized anime recommendation AI agent.
 *
 * - generateRecommendations - A function that generates personalized anime recommendations.
 * - RecommendationsInput - The input type for the generateRecommendations function.
 * - RecommendationsOutput - The return type for the generateRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendationsInputSchema = z.object({
  userViewingHabits: z
    .string()
    .describe(
      'A detailed description of the user viewing habits and preferences, including genres, themes, and specific anime titles they enjoy.'
    ),
  feedback: z
    .string()
    .optional()
    .describe(
      'Optional user feedback on previous recommendations (thumbs up/down), which should influence future suggestions.'
    ),
});
export type RecommendationsInput = z.infer<typeof RecommendationsInputSchema>;

const RecommendationsOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('A list of recommended anime titles based on the user viewing habits and feedback.'),
  reasoning: z
    .string()
    .describe(
      'The reasoning behind the recommendations, explaining why each anime title was suggested based on the user preferences.'
    ),
  editorialGuidelinesPolicy: z
    .string()
    .describe(
      'A statement ensuring that the recommendations adhere to strict editorial guidelines and are appropriate for all users.'
    ),
});
export type RecommendationsOutput = z.infer<typeof RecommendationsOutputSchema>;

export async function generateRecommendations(input: RecommendationsInput): Promise<RecommendationsOutput> {
  return recommendationsFlow(input);
}

const recommendationsPrompt = ai.definePrompt({
  name: 'recommendationsPrompt',
  input: {schema: RecommendationsInputSchema},
  output: {schema: RecommendationsOutputSchema},
  prompt: `You are an AI anime recommendation agent.

Based on the user's viewing habits and preferences, provide a list of personalized anime recommendations.
Explain the reasoning behind each recommendation, ensuring that it aligns with the user's taste.
Adhere to strict editorial guidelines and ensure that the recommendations are appropriate for all users.

User Viewing Habits: {{{userViewingHabits}}}
User Feedback: {{{feedback}}}

Recommendations:
`,
});

const recommendationsFlow = ai.defineFlow(
  {
    name: 'recommendationsFlow',
    inputSchema: RecommendationsInputSchema,
    outputSchema: RecommendationsOutputSchema,
  },
  async input => {
    const {output} = await recommendationsPrompt(input);
    return output!;
  }
);
