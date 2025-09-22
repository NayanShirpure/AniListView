import { config } from 'dotenv';
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

config({ path: '.env.local' });

genkit({
  plugins: [googleAI()],
  // Must be in a client-facing file, so it can be invoked by the browser.
  flows: [],

  // Genkit-nextjs plugin requires this to be set.
  dotEnvPath: '.env.local',
});
