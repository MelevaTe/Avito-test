/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_OLLAMA_URL?: string;
  readonly VITE_LLM_PROVIDER: "ollama" | "gigachat";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
