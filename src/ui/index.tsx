import { createRoot } from "react-dom/client";
import "./styles/main.scss"
import App from "./App";
import React from "react";
import { Provider } from "react-redux"
import store from "./stores/app"

const root = createRoot(document.getElementById("root"))
root.render(
    <Provider store={store}>
        <App />
    </Provider>
)
