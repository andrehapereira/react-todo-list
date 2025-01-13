import "./normalize.css";
import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ServicesProvider } from "./services/ServicesProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ServicesProvider>
      <App />
    </ServicesProvider>
  </StrictMode>
);
