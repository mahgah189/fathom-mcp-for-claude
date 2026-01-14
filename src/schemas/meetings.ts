import { z } from "zod";
import { ResponseFormat, CalendarInviteesDomainType } from "../constants.js";

/** Schemas for meetings tool.
 * 
 * Schemas act as a source of truth for the MCP, defining valid inputs for tools. This puts guardrails around how the LLM uses tools
 * and enable errors for invalid calls & inputs. Zod also enables actionable error feedback for LLMs. */ 

// Schema for list meetings.
export const ListMeetingsInputSchema = z.object({
  calendar_invitees_domains: z.array(z.string())
    .optional()
    .describe("Returns meetings where any of the given company domains appear in the meeting. Example: ['acme.com', 'client.com']"),

  calendar_invitees_domains_type: z.nativeEnum(CalendarInviteesDomainType)
    .optional()
    .default(CalendarInviteesDomainType.ALL)
    .describe("Filter by whether calendar invitee list includes external email domains. Available options: all, only_internal, one_or_more_external "),

  created_after: z.string()
    .optional()
    .describe("Filter to meetings with created_at after this timestamp, e.g. created_after=2026-01-01T00:00:00Z."),

  created_before: z.string()
    .optional()
    .describe("Filter to meetings with created_at before this timestamp, e.g. created_before=2026-01-01T00:00:00Z."),
  
  cursor: z.string()
    .optional()
    .describe("Cursor is used as reference when results are paginated, e.g. next_cursor is next page of results."),
  
  include_action_items: z.boolean()
    .optional()
    .default(false)
    .describe("Include the action items for each meeting."),

  include_crm_matches: z.boolean()
    .optional()
    .default(false)
    .describe("Include CRM matches for each meeting. Only returns data from your or your team's linked CRM."),

  include_summary: z.boolean()
    .optional()
    .default(false)
    .describe("Include the summary for each meeting. Unavailable for OAuth connected apps (use /recordings instead)."),

  include_transcript: z.boolean()
    .optional()
    .default(false)
    .describe("Include the transcript for each meeting. Unavailable for OAuth connected apps (use /recordings instead)."),

  recorded_by: z.array(z.string().email())
    .optional()
    .describe("Email addresses of users who recorded meetings. Pass the parameter once per value, e.g. recorded_by[]=ceo@acme.com&recorded_by[]=pm@acme.com. Returns meetings recorded by any of the specified users."),

  teams: z.array(z.string())
    .optional()
    .describe("Team names to filter by. Pass the parameter once per value, e.g. teams[]=Sales&teams[]=Engineering. Returns meetings that belong to any of the specified teams."),

  response_format: z.nativeEnum(ResponseFormat)
    .optional()
    .default(ResponseFormat.MARKDOWN)
    .describe("Output format: 'markdown' for human-readable or 'json' for structured data")
}).strict();

export type ListMeetingsInput = z.infer<typeof ListMeetingsInputSchema>;