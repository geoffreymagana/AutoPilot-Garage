// Photo analysis
'use server';
/**
 * @fileOverview AI-powered photo analysis for identifying vehicle issues.
 *
 * - analyzePhoto - Analyzes diagnostic photos to identify potential vehicle issues.
 * - AnalyzePhotoInput - The input type for the analyzePhoto function.
 * - AnalyzePhotoOutput - The return type for the analyzePhoto function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzePhotoInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A diagnostic photo of a vehicle, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzePhotoInput = z.infer<typeof AnalyzePhotoInputSchema>;

const AnalyzePhotoOutputSchema = z.object({
  identifiedIssues: z
    .array(z.string())
    .describe('A list of potential issues identified in the photo.'),
  confidenceLevels: z
    .array(z.number())
    .describe('Confidence levels for each identified issue (0-1).'),
  additionalNotes: z
    .string()
    .describe('Any additional notes or recommendations.'),
});
export type AnalyzePhotoOutput = z.infer<typeof AnalyzePhotoOutputSchema>;

export async function analyzePhoto(input: AnalyzePhotoInput): Promise<AnalyzePhotoOutput> {
  return analyzePhotoFlow(input);
}

const analyzePhotoPrompt = ai.definePrompt({
  name: 'analyzePhotoPrompt',
  input: {schema: AnalyzePhotoInputSchema},
  output: {schema: AnalyzePhotoOutputSchema},
  prompt: `You are an expert mechanic specializing in identifying vehicle issues from photos.

You will analyze the provided photo and identify any potential problems.
Provide a list of identified issues, confidence levels for each issue, and any additional notes or recommendations.

Photo: {{media url=photoDataUri}}`,
});

const analyzePhotoFlow = ai.defineFlow(
  {
    name: 'analyzePhotoFlow',
    inputSchema: AnalyzePhotoInputSchema,
    outputSchema: AnalyzePhotoOutputSchema,
  },
  async input => {
    const {output} = await analyzePhotoPrompt(input);
    return output!;
  }
);
