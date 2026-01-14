import { z } from "zod";
import { ResponseFormat } from "../constants.js";

/** Schemas for recordings tool.
 * 
 * Schemas act as a source of truth for the MCP, defining valid inputs for tools. This puts guardrails around how the LLM uses tools
 * and enable errors for invalid calls & inputs. Zod also enables actionable error feedback for LLMs. */ 

//Schema for get summary. Excluding optional query parameters (which POSTs summary elsewhere).
export const GetSummaryInputSchema = z.object({
  recording_id: z.number()
    .int()
    .positive()
    .describe("The ID of the meeting recording to fetch the call summary for."),

  response_format: z.nativeEnum(ResponseFormat)
    .optional()
    .default(ResponseFormat.MARKDOWN)
    .describe("Output format: 'markdown' for human-readable or 'json' for structured data.")
}).strict();

export type GetSummaryInput = z.infer<typeof GetSummaryInputSchema>;

//Schema for get transcript. Excluding optional query parameters (which POSTs transcript elsewhere).
export const GetTranscriptInputSchema = z.object({
  recording_id: z.number()
    .int()
    .positive()
    .describe("The ID of the meeting recording to fetch the transcript for."),

  response_format: z.nativeEnum(ResponseFormat)
    .optional()
    .default(ResponseFormat.MARKDOWN)
    .describe("Output format: 'markdown' for human-readable or 'json' for structured data.")
}).strict();

export type GetTranscriptInput = z.infer<typeof GetTranscriptInputSchema>;