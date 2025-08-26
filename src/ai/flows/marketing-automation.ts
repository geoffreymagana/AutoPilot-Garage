'use server';

/**
 * @fileOverview This file contains the marketing automation flow.
 *
 * It leverages AI to generate seasonal campaigns, maintenance reminders, and upselling opportunities.
 * - marketingAutomation - The main function to trigger the marketing automation flow.
 * - MarketingAutomationInput - The input type for the marketingAutomation function.
 * - MarketingAutomationOutput - The output type for the marketingAutomation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MarketingAutomationInputSchema = z.object({
  customerSegment: z
    .string()
    .describe(
      'The segment of customers to target, e.g., "new customers", "loyal customers", or "all customers".'
    ),
  campaignType: z
    .string()
    .describe(
      'The type of marketing campaign, e.g., "seasonal promotion", "maintenance reminder", or "upselling offer".'
    ),
  vehicleType: z
    .string()
    .optional()
    .describe('The type of vehicle, e.g., sedan, SUV, truck.'),
  serviceHistory: z
    .string()
    .optional()
    .describe('The service history of the customer vehicle.'),
});
export type MarketingAutomationInput = z.infer<typeof MarketingAutomationInputSchema>;

const MarketingAutomationOutputSchema = z.object({
  campaignHeadline: z.string().describe('The headline of the marketing campaign.'),
  campaignBody: z.string().describe('The body of the marketing campaign.'),
  suggestedActions: z.array(z.string()).describe('Suggested actions for the marketing manager.'),
});
export type MarketingAutomationOutput = z.infer<typeof MarketingAutomationOutputSchema>;

export async function marketingAutomation(input: MarketingAutomationInput): Promise<MarketingAutomationOutput> {
  return marketingAutomationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'marketingAutomationPrompt',
  input: {schema: MarketingAutomationInputSchema},
  output: {schema: MarketingAutomationOutputSchema},
  prompt: `You are an AI-powered marketing assistant for an automotive garage.

  Your goal is to generate marketing campaigns based on customer segments and campaign types.

  Consider the following information when generating the campaign:
  - Customer Segment: {{{customerSegment}}}
  - Campaign Type: {{{campaignType}}}
  {{#if vehicleType}}
  - Vehicle Type: {{{vehicleType}}}
  {{/if}}
  {{#if serviceHistory}}
  - Service History: {{{serviceHistory}}}
  {{/if}}

  Generate a compelling campaign headline and body, and suggest actionable steps for the marketing manager to implement the campaign.
  Output must follow the MarketingAutomationOutputSchema schema.`,
});

const marketingAutomationFlow = ai.defineFlow(
  {
    name: 'marketingAutomationFlow',
    inputSchema: MarketingAutomationInputSchema,
    outputSchema: MarketingAutomationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
