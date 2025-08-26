// src/ai/flows/predictive-maintenance.ts
'use server';

/**
 * @fileOverview An AI agent for predicting future vehicle service needs based on history.
 *
 * - predictMaintenance - A function that handles the prediction of future service needs.
 * - PredictMaintenanceInput - The input type for the predictMaintenance function.
 * - PredictMaintenanceOutput - The return type for the predictMaintenance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictMaintenanceInputSchema = z.object({
  vehicleHistory: z
    .string()
    .describe(
      'A detailed history of the vehicle, including past services, mileage, and any known issues.'
    ),
});
export type PredictMaintenanceInput = z.infer<typeof PredictMaintenanceInputSchema>;

const PredictMaintenanceOutputSchema = z.object({
  predictedServices: z
    .string()
    .describe(
      'A list of predicted future service needs for the vehicle, with estimated timelines.'
    ),
  confidenceLevel: z
    .string()
    .describe(
      'A confidence level for the predictions, indicating the reliability of the predicted services.'
    ),
});
export type PredictMaintenanceOutput = z.infer<typeof PredictMaintenanceOutputSchema>;

export async function predictMaintenance(input: PredictMaintenanceInput): Promise<PredictMaintenanceOutput> {
  return predictMaintenanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictMaintenancePrompt',
  input: {schema: PredictMaintenanceInputSchema},
  output: {schema: PredictMaintenanceOutputSchema},
  prompt: `You are an expert automotive technician with years of experience predicting vehicle maintenance needs.

  Based on the provided vehicle history, predict what services the vehicle will likely need in the future, and when those services will be needed. Also, provide a confidence level for your predictions.

  Vehicle History: {{{vehicleHistory}}}
  `,
});

const predictMaintenanceFlow = ai.defineFlow(
  {
    name: 'predictMaintenanceFlow',
    inputSchema: PredictMaintenanceInputSchema,
    outputSchema: PredictMaintenanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
