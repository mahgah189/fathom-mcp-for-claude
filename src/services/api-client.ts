import { FATHOM_API_BASE_URL } from "../constants.js";

// Retrieve API key.
export const getApiKey = (): string => {
  const apiKey = process.env.FATHOM_API_KEY;

  if (!apiKey) {
    throw new Error("Missing FATHOM_API_KEY. Add it as an environment variable in .env or in Claude Desktop config files.");
  }

  return apiKey;
}

// Build query strings.
const buildUrl = (
  endpoint: string,
  params?: Record<string, unknown>
): string => {
  const url = new URL(endpoint, FATHOM_API_BASE_URL);

  if (!params) return url.toString();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      for (const item of value) {
        url.searchParams.append(`${key}[]`, String(item));
      }
    } else {
      url.searchParams.append(key, String(value));
    }
  }

  return url.toString();
};

// Handle GET requests.
export const apiGet = async <T>(
  endpoint: string,
  apiKey: string,
  params?: Record<string, unknown>,
): Promise<T> => {
  const url = buildUrl(endpoint, params);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey
    },
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Fathom API error: ${response.status} (${endpoint}): ${text}`);
  }

  return (await response.json()) as T;
};