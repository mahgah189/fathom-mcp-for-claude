import { z } from "zod";
import { ResponseFormat } from "../constants.js";

/** Schemas for teams tool.
 * 
 * Schemas act as a source of truth for the MCP, defining valid inputs for tools. This puts guardrails around how the LLM uses tools
 * and enable errors for invalid calls & inputs. Zod also enables actionable error feedback for LLMs. */ 

// List teams input schema.
export const ListTeamsInputSchema = z.object({
  cursor: z.string()
    .optional()
    .describe("Cursor is used as reference when results are paginated, e.g. next_cursor is next page of results."),

  response_format: z.nativeEnum(ResponseFormat)
    .optional()
    .default(ResponseFormat.MARKDOWN)
    .describe("Output format: 'markdown' for human-readable or 'json' for structured data")
}).strict();

export type ListTeamsInput = z.infer<typeof ListTeamsInputSchema>;

// List team members input schema.
export const ListTeamMembersInputSchema = z.object({
  team: z.string()
    .optional()
    .describe("Filter by team name."),

  cursor: z.string()
    .optional()
    .describe("Cursor is used as reference when results are paginated, e.g. next_cursor is next page of results."),

  response_format: z.nativeEnum(ResponseFormat)
    .optional()
    .default(ResponseFormat.MARKDOWN)
    .describe("Output format: 'markdown' for human-readable or 'json' for structured data")
}).strict();

export type ListTeamMembersInput = z.infer<typeof ListTeamMembersInputSchema>;