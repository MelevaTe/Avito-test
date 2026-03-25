const apiUrl = import.meta.env.VITE_API_URL;
const ollamaUrl = import.meta.env.VITE_OLLAMA_URL;
const llmProvider = import.meta.env.VITE_LLM_PROVIDER;

const allowedProviders = ["ollama", "gigachat"] as const;

if (!apiUrl) {
  throw new Error("Не задан VITE_API_URL.");
}

if (!llmProvider) {
  throw new Error("Не задан VITE_LLM_PROVIDER.");
}

if (!allowedProviders.includes(llmProvider as (typeof allowedProviders)[number])) {
  throw new Error("VITE_LLM_PROVIDER должен быть 'ollama' или 'gigachat'.");
}

export type LlmProvider = (typeof allowedProviders)[number];

export const API_URL = apiUrl;
export const LLM_PROVIDER = llmProvider as LlmProvider;

if (LLM_PROVIDER === "ollama" && !ollamaUrl) {
  throw new Error("Для provider=ollama нужно задать VITE_OLLAMA_URL.");
}

export const OLLAMA_URL = ollamaUrl ?? "";
