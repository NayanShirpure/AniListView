import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

genkit({
  plugins: [googleAI()],
  // Must be in a client-facing file, so it can be invoked by the browser.
  flows: [],

  // Genkit-nextjs plugin requires this to be set.
  dotEnvPath: '.env.local',
});
