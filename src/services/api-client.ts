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

// Handle API errors.
export type ErrorHandler = (args: {
  response: Response;
  endpoint: string;
  method: "GET" | "POST" | "DELETE";
}) => Promise<never>;

// Checks to see if error is in json format before returning error.
export const handleApiError = async (response: Response): Promise<string> => {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    try {
      const data: unknown = await response.json();

      if (typeof data === "string") {
        return data;
      }

      if (data && typeof data === "object") {
        const anyData = data as { message?: unknown; error?: unknown };
        if (anyData.message !== undefined) return String(anyData.message);
        if (anyData.error !== undefined) return String(anyData.error);
      }

      return JSON.stringify(data);
    } catch {
      return "";
    }
  }

  try {
    return await response.text();
  } catch {
    return "";
  }
};

// The default error handler can also be inserted by defining another one first.
export const defaultErrorHandler: ErrorHandler = async ({
  response,
  endpoint,
  method
}) => {
  const details = await handleApiError(response);
  throw new Error(
    `Fathom API error: ${response.status} ${method} (${endpoint})${
      details ? `${details}` : ""
    }`
  );
};

// Handle GET requests.
export const apiGet = async <T>(
  endpoint: string,
  apiKey: string,
  onError: ErrorHandler = defaultErrorHandler,
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
    await onError({ response, endpoint, method: "GET" });
  }

  return (await response.json()) as T;
};

// Handle POST requests. Only used for Fathom webhooks. 
export const apiPost = async <T>(
  endpoint: string,
  apiKey: string,
  onError: ErrorHandler = defaultErrorHandler,
  params?: Record<string, unknown>,
): Promise<T> => {
  const url = buildUrl(endpoint, params);

  if (!params) {
    throw new Error("Missing params for POST request");
  }

  const createRequestBody = () => {
    const requestBody: Record<string, unknown> = {
      destination_url: params["destination_url"],
      triggered_for: params["triggered_for"],
    };

    const requestBodyParamOptions = ["include_action_items", "include_crm_matches", "include_summary", "include_transcript"];

    for (const option of requestBodyParamOptions) {
      if (params[option] !== undefined) {
        requestBody[option] = params[option];
      }
    }

    return requestBody;
  };

  const body = JSON.stringify(createRequestBody());

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": apiKey
    },
    body
  });

  if (!response.ok) {
    await onError({ response, endpoint, method: "POST" });
  }

  return (await response.json()) as T;
};

// Handle DELETE requests. Only used for Fathom webhooks.
export const apiDelete = async (
  endpoint: string,
  apiKey: string,
  onError: ErrorHandler = defaultErrorHandler
): Promise<void> => {
  const url = buildUrl(endpoint);

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "X-Api-Key": apiKey
    }
  });

  if (!response.ok) {
    await onError({ response, endpoint, method: "DELETE" });
  }

  console.error(`DELETE success: ${response.status} (${endpoint})`);
};