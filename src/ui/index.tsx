import { createRoot } from "react-dom/client";
import "./styles/main.scss"
import App from "./App";
import React from "react";

const root = createRoot(document.getElementById("root"))
root.render(<App />)
