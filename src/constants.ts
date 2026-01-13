//Fathom MCP server constants

//Fathom API key: store as environment variable or in Claude Desktop's config.json.
const FATHOM_API_KEY = process.env.FATHOM_API_KEY;

//Fathom API configuration
export const FATHOM_API_BASE_URL = "https://api.fathom.ai/external/v1";

//API request settings
export const FATHOM_API_CONFIG = {
  baseURL: FATHOM_API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "X-Api-Key": FATHOM_API_KEY
  }
};