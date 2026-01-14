// Fathom MCP server constants

// Fathom API key: store as environment variable or in Claude Desktop's config.json.
const FATHOM_API_KEY = process.env.FATHOM_API_KEY;

// Fathom API configuration
export const FATHOM_API_BASE_URL = "https://api.fathom.ai/external/v1";

// API request settings
export const FATHOM_API_CONFIG = {
  "X-Api-Key": FATHOM_API_KEY
};

// Valid response formats for MCP schemas.
export enum ResponseFormat {
  MARKDOWN = "markdown",
  JSON = "json"
};

// Valid calendar invitees domain type inputs for MCP schemas.
export enum CalendarInviteesDomainType {
  ALL = "all",
  ONLY_INTERNAL = "only_internal",
  ONE_OR_MORE_EXTERNAL = "one_or_more_external"
};

// Webhook trigger types.
export enum WebhookTriggerType {
  MY_RECORDINGS = "my_recordings",
  SHARED_EXTERNAL_RECORDINGS = "shared_external_recordings",
  MY_SHARED_WITH_TEAM_RECORDINGS = "my_shared_with_team_recordings",
  SHARED_TEAM_RECORDINGS = "shared_team_recordings"
};