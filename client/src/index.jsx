import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import 'mapbox-gl/dist/mapbox-gl.css';

import { AuthProviderWrapper } from "./contexts/auth.context"; // <== IMPORT

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProviderWrapper>
        <App />
      </AuthProviderWrapper>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
