import { LLM_PROVIDER } from "@/shared/config/env/env";
import { generateBackendLlmResponse } from "./backendLlm.ts";
import { generateOllamaResponse } from "./ollama";
import type { GenerateLlmOptions } from "./types";

export const generateLlmResponse = async (
  prompt: string,
  options?: GenerateLlmOptions,
): Promise<string> => {
  if (LLM_PROVIDER === "ollama") {
    return generateOllamaResponse(prompt, options);
  }

  return generateBackendLlmResponse(prompt, options);
};
