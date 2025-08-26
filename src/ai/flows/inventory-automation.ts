'use server';
/**
 * @fileOverview This file defines a Genkit flow for smart reordering of parts based on usage patterns and seasonality.
 *
 * - inventoryAutomation - A function that triggers the inventory automation flow.
 * - InventoryAutomationInput - The input type for the inventoryAutomation function.
 * - InventoryAutomationOutput - The return type for the inventoryAutomation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InventoryAutomationInputSchema = z.object({
  currentInventory: z.record(z.number()).describe('A record of the current inventory levels for each part.'),
  usagePatterns: z.record(z.number()).describe('A record of the usage patterns for each part over the past year.'),
  seasonalityData: z.record(z.number()).describe('A record of the seasonality data for each part over the past year.'),
  leadTimes: z.record(z.number()).describe('A record of the lead times for each part.'),
});
export type InventoryAutomationInput = z.infer<typeof InventoryAutomationInputSchema>;

const InventoryAutomationOutputSchema = z.record(z.number()).describe('A record of the reorder quantities for each part.');
export type InventoryAutomationOutput = z.infer<typeof InventoryAutomationOutputSchema>;

export async function inventoryAutomation(input: InventoryAutomationInput): Promise<InventoryAutomationOutput> {
  return inventoryAutomationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'inventoryAutomationPrompt',
  input: {schema: InventoryAutomationInputSchema},
  output: {schema: InventoryAutomationOutputSchema},
  prompt: `You are an expert inventory manager for an automotive garage. Analyze the provided data to determine optimal reorder quantities for each part.

Current Inventory: {{{currentInventory}}}
Usage Patterns: {{{usagePatterns}}}
Seasonality Data: {{{seasonalityData}}}
Lead Times: {{{leadTimes}}}

Consider the current inventory levels, usage patterns, seasonality, and lead times to recommend reorder quantities that minimize stockouts and reduce inventory costs. Provide the reorder quantities as a JSON object where the keys are the part names and the values are the reorder quantities.
`,
});

const inventoryAutomationFlow = ai.defineFlow(
  {
    name: 'inventoryAutomationFlow',
    inputSchema: InventoryAutomationInputSchema,
    outputSchema: InventoryAutomationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
