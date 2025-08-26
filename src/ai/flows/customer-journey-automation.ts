'use server';

/**
 * @fileOverview A flow to personalize communications with customers based on their service stage.
 *
 * - customerJourneyAutomation - A function that handles the customer journey automation process.
 * - CustomerJourneyAutomationInput - The input type for the customerJourneyAutomation function.
 * - CustomerJourneyAutomationOutput - The return type for the customerJourneyAutomation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CustomerJourneyAutomationInputSchema = z.object({
  customerId: z.string().describe('The ID of the customer.'),
  serviceStage: z
    .enum([
      'AppointmentScheduled',
      'VehicleReceived',
      'Diagnosis',
      'InProgress',
      'QualityCheck',
      'Complete',
    ])
    .describe('The current stage of the customer vehicle service.'),
  vehicleMake: z.string().describe('The make of the customer vehicle.'),
  vehicleModel: z.string().describe('The model of the customer vehicle.'),
  lastServiceDate: z.string().describe('The date of the last service.'),
});
export type CustomerJourneyAutomationInput = z.infer<typeof CustomerJourneyAutomationInputSchema>;

const CustomerJourneyAutomationOutputSchema = z.object({
  message: z.string().describe('The personalized message for the customer.'),
});
export type CustomerJourneyAutomationOutput = z.infer<typeof CustomerJourneyAutomationOutputSchema>;

export async function customerJourneyAutomation(
  input: CustomerJourneyAutomationInput
): Promise<CustomerJourneyAutomationOutput> {
  return customerJourneyAutomationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'customerJourneyAutomationPrompt',
  input: {schema: CustomerJourneyAutomationInputSchema},
  output: {schema: CustomerJourneyAutomationOutputSchema},
  prompt: `You are an expert marketing manager at an auto repair shop. You are responsible for communicating with customers throughout their service journey.

  Based on the current service stage, vehicle information, and last service date, create a personalized message to send to the customer.

  Customer ID: {{{customerId}}}
  Service Stage: {{{serviceStage}}}
  Vehicle Make: {{{vehicleMake}}}
  Vehicle Model: {{{vehicleModel}}}
  Last Service Date: {{{lastServiceDate}}}

  Here are the types of messages to send at each stage:

  - AppointmentScheduled: Confirm the appointment details and remind them to bring any relevant documents.
  - VehicleReceived: Acknowledge receipt of the vehicle and provide an estimated timeline for diagnosis.
  - Diagnosis: Explain the diagnosis results in simple terms and outline the recommended services with estimated costs.
  - InProgress: Provide an update on the service progress and inform them of any unexpected delays.
  - QualityCheck: Notify them that the service is nearing completion and schedule a convenient pickup time.
  - Complete: Inform them that the vehicle is ready for pickup, summarize the services performed, and include a link to view the digital receipt.
  Make sure the message is appropriate and personalized to the customer and vehicle.
  Message:`,
});

const customerJourneyAutomationFlow = ai.defineFlow(
  {
    name: 'customerJourneyAutomationFlow',
    inputSchema: CustomerJourneyAutomationInputSchema,
    outputSchema: CustomerJourneyAutomationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
