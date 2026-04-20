import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";
import { ToastProvider } from "./components/Toast";
import { LanguageProvider } from "./i18n";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ConfirmProvider } from "./contexts/ConfirmContext";
import ErrorBoundary from "./components/ErrorBoundary";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider>
          <LanguageProvider>
            <BrowserRouter>
              <AuthProvider>
                <ToastProvider>
                  <ConfirmProvider>
                    <App />
                  </ConfirmProvider>
                </ToastProvider>
              </AuthProvider>
            </BrowserRouter>
          </LanguageProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

