import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/app/styles/index.css";
import "./shared/config/i18n/i18n";

import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "@/app/providers/ErrorBoundary";

import ThemeProvider from "@/app/providers/ThemeProvider/ui/ThemeProvider";
import { queryClient } from "@/shared/api/queryClient";
import { TooltipProvider } from "@/shared/ui/Tooltip/Tooltip.tsx";
import App from "./app/App";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Контейнер root не найден. Нe удалось вмонтировать реакт приложение");
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <TooltipProvider>
              <App />
            </TooltipProvider>
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
