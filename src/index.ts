import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { getApiKey } from "./services/api-client.js";

// Server metadata.
const SERVER_NAME = "claude-fathom-mcp";
const SERVER_VERSION = "0.1.0";

// Function for initializing MCP server.
const main = async(): Promise<void> => {
  const apiKey = getApiKey();

  // Create MCP server.
  const server = new McpServer({
    name: SERVER_NAME,
    version: SERVER_VERSION,
  });

  // Register MCP tools.

};