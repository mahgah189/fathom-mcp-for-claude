/** Types for Fathom MCP server 
*/

// Paginated response object for dealing with paginated API responses.
export interface PaginatedResponse<T> {
  limit: number | null;
  next_cursor: string | null;
  items: T[];
}

// Type for Meetings object returned by the /meetings endpoint.
export interface Meeting {
  title: string;
  meeting_title: string | null;
  recording_id: number;
  url: string;
  share_url: string;
  created_at: string;
  scheduled_start_time: string;
  scheduled_end_time: string;
  recording_start_time: string;
  recording_end_time: string;
  calendar_invitees_domains_type: "only_internal" | "one_or_more_external";
  transcript_language: string;
  calendar_invitees: CalendarInvitee[];
  recorded_by: RecordedBy;
  transcript?: Transcript | null;
  default_summary: Summary;
  action_items?: ActionItems[] | null;
  crm_matches?: CrmMatch | null;
};

// Type for calendar invitee object.
export interface CalendarInvitee {
  name: string;
  email: string;
  email_domain: string;
  is_external: boolean;
  matched_speaker_display_name?: string;
};

// Type for recording owner (recorded_by).
export interface RecordedBy {
  name: string;
  email: string;
  email_domain: string;
  team?: string;
};

// Type for transcript object.
export interface Transcript {
  speaker: Speaker;
  text: string;
  timestamp: string;
};

// Type for speaker object in transcript.
export interface Speaker {
  display_name: string;
  matched_calendar_invitee_email?: string;
};

// Type for summary object.
export interface Summary {
  template_name: string | null;
  markdown_formatted: string | null;
};

// Type for action items object.
export interface ActionItems {
  description: string;
  user_generated: boolean;
  completed: boolean;
  recording_timestamp: string;
  recording_playback_url: string;
  assignee?: Assignee;
};

// Type for Assignee object.
export interface Assignee {
  name: string;
  email: string;
  team?: string;
};

// Type for CRM matches object.
export interface CrmMatch {
  contacts?: Contact[];
  companies?: Company[];
  deals?: Deal[];
  error?: string;
};

// Type for contacts object.
export interface Contact {
  name: string;
  email: string;
  record_url: string;
};

// Type for companies object.
export interface Company {
  name: string;
  record_url: string;
};

// Type for deals object.
export interface Deal {
  name: string;
  amount: number;
  record_url: string;
};

// Analytics types
export interface MeetingStats {
  [key: string]: unknown;
  total_meetings: number;
  duration_stats: DurationStats;
  meetings_by_team: Record<string, number>;
  internal_vs_external: {
    internal: number;
    external: number;
  };
}

export interface SearchResult {
  meeting: Meeting;
  matches: {
    in_title: boolean;
    in_transcript: boolean;
    in_summary: boolean;
    context_snippets: string[];
  };
}

export interface DurationStats {
  [key: string]: unknown;
  average_minutes: number;
  min_minutes: number;
  max_minutes: number;
  total_minutes: number;
}

export interface ParticipantStats {
  [key: string]: unknown;
  top_participants: ParticipantInfo[];
  domain_breakdown: Record<string, number>;
  top_recorders: RecorderInfo[];
}

export interface RecorderInfo {
  [key: string]: unknown;
  name: string;
  email: string;
  recording_count: number;
}

export interface ParticipantInfo {
  [key: string]: unknown;
  name: string;
  email: string;
  meeting_count: number;
}

// Search result
export interface SearchResult {
  meeting: Meeting;
  matches: {
    in_title: boolean;
    in_transcript: boolean;
    in_summary: boolean;
    context_snippets: string[];
  };
}

// Export types for handling paginated responses from each endpoint.
export interface MeetingsResponse extends PaginatedResponse<Meeting> {};