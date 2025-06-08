import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./reset.css";
import "./variables.css";
import TagManager from "react-gtm-module";

TagManager.initialize({ gtmId: "GTM-KJDLLH9G" });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
