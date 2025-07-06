import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./context/UserContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <BrowserRouter>
      <UserContext>
        <App />
      </UserContext>
    </BrowserRouter>
  // </StrictMode>
);
