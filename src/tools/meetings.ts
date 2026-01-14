import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { apiGet } from "../services/api-client.js";
import { ListMeetingsInputSchema, type ListMeetingsInput } from "../schemas/meetings.js";
import { ResponseFormat, CHARACTER_LIMIT } from "../constants.js";
import { Meeting, MeetingsResponse } from "../types.js";

// Format the /meetings endpoint response as a markdown object to be readable by LLMs.
const formatMeetingMarkdown = (meeting: Meeting, includeDetails: boolean = false): string => {
  // lines will be an array of strings, starting with an empty array.
  const lines: string[] = [];

  // Meeting information.
  lines.push(`## ${meeting.title}`);
  if (meeting.meeting_title && meeting.meeting_title !== meeting.title) {
    lines.push(`*Meeting title: ${meeting.meeting_title}*`);
  }
  lines.push("");

  lines.push(`- **Recording ID:** ${meeting.recording_id}`);
  lines.push(`- **Date:** ${new Date(meeting.created_at).toLocaleString(undefined, {
    timeZoneName: "short",
  })}`);
  lines.push(`- **Meeting duration:** ${formatDuration(meeting.recording_start_time, meeting.recording_end_time)}`);
  lines.push(`- **Meeting type:** ${meeting.calendar_invitees_domains_type === "one_or_more_external" ? "External" : "Internal"}`);
  lines.push(`- **Recorded by:** ${meeting.recorded_by.name} (${meeting.recorded_by.email})`);
  if (meeting.recorded_by.team) {
    lines.push(`**Team:** ${meeting.recorded_by.team}`);
  }
  lines.push(`- **Fathom URL:** ${meeting.url}`);
  lines.push("");

  // List of participants.
  if (meeting.calendar_invitees.length > 0) {
    lines.push("### Participants");
    for (const participant of meeting.calendar_invitees) {
      const external = participant.is_external ? " (external)" : "";
      lines.push(`- ${participant.name} (${participant.email})${external}`);
    }
    lines.push("");
  }

  if (includeDetails) {
    // Meeting summary.
    if (meeting.default_summary?.markdown_formatted) {
      lines.push("### Meeting Summary");
      lines.push(meeting.default_summary.markdown_formatted);
      lines.push("");
    }

    // Meeting action items.
    if (meeting.action_items && meeting.action_items.length > 0) {
      lines.push("### Action Items");
      for (const item of meeting.action_items) {
        const itemStatus = item.completed ? "[X]" : "[ ]";
        const itemAssignee = item.assignee ? `@${item.assignee.name}` : "";
        lines.push(`${itemStatus} ${item.description} ${itemAssignee} (${item.recording_timestamp})`);
      }
      lines.push("");
    }

    // Meeting CRM matches.
    if (meeting.crm_matches) {
      if (meeting.crm_matches.error) {
        lines.push(`*CRM: ${meeting.crm_matches.error}*`);
      } else if (meeting.crm_matches.contacts?.length) {
        lines.push("### CRM Matches");
        lines.push("");

        lines.push("*Contacts*");
        for (const contact of meeting.crm_matches.contacts) {
          lines.push(`- ${contact.name} (${contact.email}) [${contact.record_url}]`);
        }
        lines.push("");

        if (meeting.crm_matches.companies?.length) {
          lines.push("*Companies*");
          for (const company of meeting.crm_matches.companies) {
            lines.push(`- ${company.name} [${company.record_url}]`);
          }
          lines.push("");
        }

        if (meeting.crm_matches.deals?.length) {
          lines.push("*Deals*");
          for (const deal of meeting.crm_matches.deals) {
            lines.push(`- ${deal.name} ($${deal.amount}) [${deal.record_url}]`);
          }
          lines.push("");
        }
      }
    }
  }

  return lines.join("\n");
}

// Format duration of meeting.
const formatDuration = (start: string, end: string) => {
  const startTime = new Date(start);
  const endTime = new Date(end);
  const duration = endTime.getTime() - startTime.getTime();
  const minutes = Math.round(duration / 60000);

  if (minutes < 60) {
    return `${minutes} min`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }
};