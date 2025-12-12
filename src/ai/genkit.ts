import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-pro',
});
