import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Server metadata.
const SERVER_NAME = "claude-fathom-mcp";
const SERVER_VERSION = "0.1.0";

// Function for initializing MCP server.
const main = async(): Promise<void> => {
  const apiKey = process.env.FATHOM_API_KEY;
  if (!apiKey) {
    console.error("ERROR: No FATHOM_API_KEY variable found.");
    console.error("");
    console.error("To use this MCP server, add a Fathom API key.");
    console.error("1. Get your API key from Fathom (Settings -> API");
    console.error("2. Add the API key as an environment variable in:");
    console.error("     - the project's .env file as 'FATHOM_API_KEY=(paste API key here without parantheses)");
    console.error("     - Claude Desktop's config.json file:")
    console.error(JSON.stringify({
      mcpServers: {
        fathom: {
          command: "node",
          args: ["path/to/claude-fathom-mcp/dist/index.js"],
          env: {
            FATHOM_API_KEY: "paste API key here inside of quotation marks"
          }
        }
      }
    }, null, 2));
    process.exit(1);
  }

  // Create MCP server.
  const server = new McpServer({
    name: SERVER_NAME,
    version: SERVER_VERSION,
  });

  // Register MCP tools.
  
};