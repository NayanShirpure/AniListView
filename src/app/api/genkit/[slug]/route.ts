import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {nextJSHandler} from '@genkit-ai/next';
import { z } from 'zod';

// This is required for the genkit flow to work.
import '@/ai/flows/personalized-recommendations';

genkit({
  plugins: [googleAI()],
  // Must be in a client-facing file, so it can be invoked by the browser.
  flows: [
    {
      name: 'recommendationsFlow',
      inputSchema: z.object({
        userViewingHabits: z.string(),
        feedback: z.string().optional(),
      }),
      outputSchema: z.object({
        recommendations: z.array(z.string()),
        reasoning: z.string(),
        editorialGuidelinesPolicy: z.string(),
      }),
    },
  ],

  // Genkit-nextjs plugin requires this to be set.
  dotEnvPath: '.env.local',
});

export const POST = nextJSHandler();
