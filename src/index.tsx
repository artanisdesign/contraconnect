import React from "react";
import ReactDOM from "react-dom/client";
//import '@fontsource/public-sans';
import "@fontsource/open-sans";
import "./index.css";
import App from "./App";
import { StyledEngineProvider } from "@mui/joy/styles";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "hooks/useAuth";
//import reportWebVitals from './reportWebVitals';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
//import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            { /*<ReactQueryDevtools initialIsOpen={false} />*/}
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </AuthProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
