import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { AppRouter } from "@/app/providers/router";

function App() {
  return (
    <Suspense fallback="">
      <AppRouter />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "var(--avito-bg-surface)",
            color: "var(--avito-text-primary)",
            border: "1px solid var(--avito-border-primary)",
            fontSize: "14px",
            fontFamily: "Roboto, sans-serif",
          },
          success: {
            style: {
              background: "var(--avito-success-bg)",
              borderColor: "var(--avito-success-border)",
            },
            iconTheme: {
              primary: "var(--avito-success-text)",
              secondary: "var(--avito-bg-surface)",
            },
          },
          error: {
            style: {
              background: "var(--avito-danger-bg)",
              borderColor: "var(--avito-danger-border)",
            },
            iconTheme: {
              primary: "var(--avito-danger-text)",
              secondary: "var(--avito-bg-surface)",
            },
          },
        }}
        containerStyle={{ top: 16 }}
        gutter={8}
      />
    </Suspense>
  );
}

export default App;
