// Workflow Automation flow
'use server';
/**
 * @fileOverview This file defines a Genkit flow for automating status updates, notifications, and task assignments.
 *
 * - workflowAutomation - A function that initiates the workflow automation process.
 * - WorkflowAutomationInput - The input type for the workflowAutomation function.
 * - WorkflowAutomationOutput - The return type for the workflowAutomation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WorkflowAutomationInputSchema = z.object({
  currentStatus: z.string().describe('The current status of the service.'),
  newStatus: z.string().describe('The new status of the service.'),
  serviceDetails: z.string().describe('Details of the service being performed.'),
  teamMembers: z.array(z.string()).describe('List of team members and their roles.'),
});
export type WorkflowAutomationInput = z.infer<typeof WorkflowAutomationInputSchema>;

const WorkflowAutomationOutputSchema = z.object({
  notificationMessage: z.string().describe('The message to be sent as a notification.'),
  taskAssignment: z.string().describe('The task assigned to a specific team member.'),
});
export type WorkflowAutomationOutput = z.infer<typeof WorkflowAutomationOutputSchema>;

export async function workflowAutomation(input: WorkflowAutomationInput): Promise<WorkflowAutomationOutput> {
  return workflowAutomationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'workflowAutomationPrompt',
  input: {schema: WorkflowAutomationInputSchema},
  output: {schema: WorkflowAutomationOutputSchema},
  prompt: `You are an AI assistant designed to automate workflows in a garage setting. Given the current status, 
the new status, and details of the service, generate a notification message and determine the most appropriate 
task assignment for a team member.

Current Status: {{{currentStatus}}}
New Status: {{{newStatus}}}
Service Details: {{{serviceDetails}}}
Team Members: {{#each teamMembers}}{{{this}}}, {{/each}}

Based on this information, generate a concise and informative notification message and suggest a task assignment to 
streamline the workflow.

Notification Message: (Keep it short, avoid pleasantries)
Task Assignment: (Assign to a member and indicate the time that the task should be completed by)
`,
});

const workflowAutomationFlow = ai.defineFlow(
  {
    name: 'workflowAutomationFlow',
    inputSchema: WorkflowAutomationInputSchema,
    outputSchema: WorkflowAutomationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
