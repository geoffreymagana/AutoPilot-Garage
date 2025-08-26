'use server';
/**
 * @fileOverview An AI agent that generates diagnostic summaries with recommendations.
 *
 * - generateDiagnosticReport - A function that generates a diagnostic report.
 * - GenerateDiagnosticReportInput - The input type for the generateDiagnosticReport function.
 * - GenerateDiagnosticReportOutput - The return type for the generateDiagnosticReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const GenerateDiagnosticReportInputSchema = z.object({
  diagnosticData: z
    .string()
    .describe('The diagnostic data from the vehicle, including sensor readings, error codes, and mechanic observations.'),
});
export type GenerateDiagnosticReportInput = z.infer<typeof GenerateDiagnosticReportInputSchema>;

const GenerateDiagnosticReportOutputSchema = z.object({
  summary: z.string().describe('A summary of the diagnostic data.'),
  recommendations: z.string().describe('Recommendations for repairs or maintenance.'),
});
export type GenerateDiagnosticReportOutput = z.infer<typeof GenerateDiagnosticReportOutputSchema>;

export async function generateDiagnosticReport(
  input: GenerateDiagnosticReportInput
): Promise<GenerateDiagnosticReportOutput> {
  return generateDiagnosticReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDiagnosticReportPrompt',
  input: {schema: GenerateDiagnosticReportInputSchema},
  output: {schema: GenerateDiagnosticReportOutputSchema},
  prompt: `You are an AI assistant specializing in generating diagnostic reports for mechanics.

  Based on the provided diagnostic data, create a concise summary of the vehicle's condition and provide clear recommendations for repairs or maintenance.
  Diagnostic Data: {{{diagnosticData}}}`,
});

const generateDiagnosticReportFlow = ai.defineFlow(
  {
    name: 'generateDiagnosticReportFlow',
    inputSchema: GenerateDiagnosticReportInputSchema,
    outputSchema: GenerateDiagnosticReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
