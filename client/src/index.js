import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@emotion/react";
import darkTheme from "./themes/dark";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalStatesContextProvider from "./context/GlobalStateProvider";
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalStatesContextProvider>
        <ThemeProvider theme={darkTheme}>
          <App />
        </ThemeProvider>
      </GlobalStatesContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
