import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { apiGet } from "../services/api-client.js";
import {
  SearchMeetingsInputSchema,
  MeetingStatsInputSchema,
  ParticipantStatsInputSchema,
  type SearchMeetingsInput,
  type MeetingStatsInput,
  type ParticipantStatsInput
} from "../schemas/analytics.js";
import { ResponseFormat, CHARACTER_LIMIT } from "../constants.js";
import type {
  MeetingsResponse,
  Meeting,
  MeetingStats,
  ParticipantStats,
  SearchResult,
  DurationStats
} from "../types.js";