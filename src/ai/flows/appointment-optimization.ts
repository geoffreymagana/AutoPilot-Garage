'use server';
/**
 * @fileOverview Optimizes appointment scheduling using AI for maximum efficiency.
 *
 * - optimizeAppointmentSchedule - A function that optimizes the appointment schedule.
 * - OptimizeAppointmentScheduleInput - The input type for the optimizeAppointmentSchedule function.
 * - OptimizeAppointmentScheduleOutput - The return type for the optimizeAppointmentSchedule function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeAppointmentScheduleInputSchema = z.object({
  currentSchedule: z
    .string()
    .describe(
      'A JSON string representing the current appointment schedule. Include appointment details like customer name, vehicle type, service type, and duration.'
    ),
  technicianAvailability: z
    .string()
    .describe(
      'A JSON string representing the technician availability. Include technician IDs and their available time slots.'
    ),
  shopResources: z
    .string()
    .describe(
      'A JSON string representing the available shop resources. Include information about available bays or equipment.'
    ),
  optimizationConstraints: z
    .string()
    .describe(
      'A JSON string representing the constraints for optimization. Include things like priority customers, or appointments that cannot be rescheduled.'
    ),
});
export type OptimizeAppointmentScheduleInput = z.infer<
  typeof OptimizeAppointmentScheduleInputSchema
>;

const OptimizeAppointmentScheduleOutputSchema = z.object({
  optimizedSchedule: z
    .string()
    .describe(
      'A JSON string representing the optimized appointment schedule, maximizing efficiency and resource utilization.'
    ),
  efficiencyScore: z
    .number()
    .describe(
      'A numerical score representing the efficiency of the optimized schedule. Higher scores indicate better efficiency.'
    ),
  recommendations: z
    .string()
    .describe(
      'A string containing a summary of changes made and a justification of those changes.'
    ),
});
export type OptimizeAppointmentScheduleOutput = z.infer<
  typeof OptimizeAppointmentScheduleOutputSchema
>;

export async function optimizeAppointmentSchedule(
  input: OptimizeAppointmentScheduleInput
): Promise<OptimizeAppointmentScheduleOutput> {
  return optimizeAppointmentScheduleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeAppointmentSchedulePrompt',
  input: {schema: OptimizeAppointmentScheduleInputSchema},
  output: {schema: OptimizeAppointmentScheduleOutputSchema},
  prompt: `You are an AI assistant that optimizes appointment schedules for automotive repair shops. Your goal is to maximize efficiency and resource utilization.

You are given the current schedule, technician availability, shop resources, and optimization constraints. Analyze this information and generate an optimized schedule that minimizes downtime and maximizes resource utilization. Provide an efficiency score and a summary of changes.

Output the new schedule as a JSON string, including justifications for the changes in the "recommendations" field. The efficiency score should be a number between 0 and 100, with 100 representing peak optimization.

Current Schedule: {{{currentSchedule}}}
Technician Availability: {{{technicianAvailability}}}
Shop Resources: {{{shopResources}}}
Optimization Constraints: {{{optimizationConstraints}}}

Ensure the output is a valid JSON string and adheres to the schema. Be concise and effective.`,
});

const optimizeAppointmentScheduleFlow = ai.defineFlow(
  {
    name: 'optimizeAppointmentScheduleFlow',
    inputSchema: OptimizeAppointmentScheduleInputSchema,
    outputSchema: OptimizeAppointmentScheduleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
