'use client';
import { defineNextJsHandler } from '@genkit-ai/next/server';
import {googleAI} from '@genkit-ai/googleai';
import {genkit} from 'genkit';
import { z } from 'zod';

genkit({
  plugins: [googleAI()],
  // Must be in a client-facing file, so it can be invoked by the browser.
  flows: [],

  // Genkit-nextjs plugin requires this to be set.
  dotEnvPath: '.env.local',
});


export const {GET, POST} = defineNextJsHandler();
