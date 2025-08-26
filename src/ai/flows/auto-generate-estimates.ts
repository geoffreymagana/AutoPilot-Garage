'use server';

/**
 * @fileOverview A service estimate generator AI agent.
 *
 * - autoGenerateEstimates - A function that handles the estimate generation process.
 * - AutoGenerateEstimatesInput - The input type for the autoGenerateEstimates function.
 * - AutoGenerateEstimatesOutput - The return type for the autoGenerateEstimates function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutoGenerateEstimatesInputSchema = z.object({
  diagnosticData: z
    .string()
    .describe('The diagnostic data of the vehicle, including the problem description and any error codes.'),
  vehicleMake: z.string().describe('The make of the vehicle.'),
  vehicleModel: z.string().describe('The model of the vehicle.'),
  vehicleYear: z.number().describe('The year of the vehicle.'),
});
export type AutoGenerateEstimatesInput = z.infer<typeof AutoGenerateEstimatesInputSchema>;

const AutoGenerateEstimatesOutputSchema = z.object({
  estimateDescription: z
    .string()
    .describe('A description of the estimate, including a breakdown of the costs.'),
  totalCost: z.number().describe('The total cost of the service.'),
  laborCost: z.number().describe('The cost of labor for the service.'),
  partsCost: z.number().describe('The cost of parts for the service.'),
});
export type AutoGenerateEstimatesOutput = z.infer<typeof AutoGenerateEstimatesOutputSchema>;

export async function autoGenerateEstimates(
  input: AutoGenerateEstimatesInput
): Promise<AutoGenerateEstimatesOutput> {
  return autoGenerateEstimatesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'autoGenerateEstimatesPrompt',
  input: {schema: AutoGenerateEstimatesInputSchema},
  output: {schema: AutoGenerateEstimatesOutputSchema},
  prompt: `You are an expert mechanic specializing in providing service estimates for vehicles.

You will use the diagnostic data, vehicle make, model, and year to generate a service estimate.

Diagnostic Data: {{{diagnosticData}}}
Vehicle Make: {{{vehicleMake}}}
Vehicle Model: {{{vehicleModel}}}
Vehicle Year: {{{vehicleYear}}}

Provide a detailed estimate including a breakdown of the costs for labor and parts, and the total cost.

Output the results in JSON format.`,
});

const autoGenerateEstimatesFlow = ai.defineFlow(
  {
    name: 'autoGenerateEstimatesFlow',
    inputSchema: AutoGenerateEstimatesInputSchema,
    outputSchema: AutoGenerateEstimatesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
