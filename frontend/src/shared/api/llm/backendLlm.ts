import { API_URL } from "@/shared/config/env/env";
import type { GenerateLlmOptions } from "./types";

interface BackendLlmGenerateRequest {
  prompt: string;
}

interface BackendLlmGenerateResponse {
  success: boolean;
  suggestion?: string;
  error?: string;
}

export const generateBackendLlmResponse = async (
  prompt: string,
  options?: GenerateLlmOptions,
): Promise<string> => {
  const response = await fetch(`${API_URL}/ai/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt,
    } satisfies BackendLlmGenerateRequest),
    signal: options?.signal,
  });

  const data = (await response.json()) as BackendLlmGenerateResponse;

  if (!response.ok || !data.success) {
    throw new Error(data.error || `LLM backend error: ${response.status}`);
  }

  return data.suggestion?.trim() ?? "";
};
