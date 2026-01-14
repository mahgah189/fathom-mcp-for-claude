import { z } from "zod";
import { ResponseFormat } from "../constants.js";

/** Schemas for analytics tool. The analytics tool allows the LLM to parse through data returned by the "/meetings" endpoint.
 * 
 * Schemas act as a source of truth for the MCP, defining valid inputs for tools. This puts guardrails around how the LLM uses tools
 * and enable errors for invalid calls & inputs. Zod also enables actionable error feedback for LLMs. */ 

// Search meetings input schema.
export const SearchMeetingsInputSchema = z.object({
  query: z.string()
    .min(2, "Search query must be at least 2 characters.")
    .max(200, "Search query cannot be longer than 200 characters.")
    .describe("String used to search meeting titles, transcripts and summaries."),

  created_after: z.string()
    .optional()
    .describe("Filter meetings created after this ISO 8601 timestamp, e.g. created_after=2026-01-01T00:00:00Z."),

  created_before: z.string()
    .optional()
    .describe("Filter meetings created before this ISO 8601 timestamp, e.g. created_after=2026-01-01T00:00:00Z."),

  teams: z.array(z.string())
    .optional()
    .describe("Filter by team names."),

  limit: z.number()
    .int()
    .min(1)
    .max(50)
    .optional()
    .default(10)
    .describe("Limit on number of results returned (1-50)."),

  response_format: z.nativeEnum(ResponseFormat)
    .optional()
    .default(ResponseFormat.MARKDOWN)
    .describe("Output format: 'markdown' for human-readable or 'json' for structured data")
}).strict();

export type SearchMeetingsInput = z.infer<typeof SearchMeetingsInputSchema>;

// Meeting stats input schema.
export const MeetingStatsInputSchema = z.object({
  created_after: z.string()
    .optional()
    .describe("Filter meetings created after this ISO 8601 timestamp, e.g. created_after=2026-01-01T00:00:00Z."),

  created_before: z.string()
    .optional()
    .describe("Filter meetings created before this ISO 8601 timestamp, e.g. created_after=2026-01-01T00:00:00Z."),

  teams: z.array(z.string())
    .optional()
    .describe("Filter by team names."),

  response_format: z.nativeEnum(ResponseFormat)
    .optional()
    .default(ResponseFormat.MARKDOWN)
    .describe("Output format: 'markdown' for human-readable or 'json' for structured data")
}).strict();

export type MeetingStatsInput = z.infer<typeof MeetingStatsInputSchema>;

// Participant stats input schema.
export const ParticipantStatsInputSchema = z.object({
  created_after: z.string()
    .optional()
    .describe("Filter meetings created after this ISO 8601 timestamp, e.g. created_after=2026-01-01T00:00:00Z."),

  created_before: z.string()
    .optional()
    .describe("Filter meetings created before this ISO 8601 timestamp, e.g. created_after=2026-01-01T00:00:00Z."),

  limit: z.number()
    .int()
    .min(1)
    .max(50)
    .optional()
    .default(10)
    .describe("Limit on number of results returned (1-50)"),

  response_format: z.nativeEnum(ResponseFormat)
    .optional()
    .default(ResponseFormat.MARKDOWN)
    .describe("Output format: 'markdown' for human-readable or 'json' for structured data")
}).strict();

export type ParticipantStatsInput = z.infer<typeof ParticipantStatsInputSchema>;