import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'select2/dist/js/select2.min.js';
import "./index.scss";
import "./components/header/SearchPlaceholderFix";

import App from "./App";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);
