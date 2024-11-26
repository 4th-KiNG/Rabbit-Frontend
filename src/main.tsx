import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./fonts/fonts.css";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <QueryClientProvider client={client}>
            <App />
          </QueryClientProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </BrowserRouter>
  </StrictMode>
);
