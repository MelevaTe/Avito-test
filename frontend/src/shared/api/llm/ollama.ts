import { OLLAMA_URL } from "@/shared/config/env/env";
import type { GenerateLlmOptions } from "./types";

interface OllamaGenerateRequest {
  model: string;
  prompt: string;
  stream: false;
}

interface OllamaGenerateResponse {
  model: string;
  response: string;
  done: boolean;
}

interface GenerateOllamaOptions extends GenerateLlmOptions {
  model?: string;
}

const DEFAULT_MODEL = "llama3";

export const generateOllamaResponse = async (
  prompt: string,
  options?: GenerateOllamaOptions,
): Promise<string> => {
  const body: OllamaGenerateRequest = {
    model: options?.model ?? DEFAULT_MODEL,
    prompt,
    stream: false,
  };

  const response = await fetch(`${OLLAMA_URL}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: options?.signal,
  });

  if (!response.ok) {
    throw new Error(`Ollama error: ${response.status}`);
  }

  const data = (await response.json()) as OllamaGenerateResponse;

  return data.response;
};
