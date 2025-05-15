// src/App.jsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { RoutesReact } from "./routesReact/RoutesReact";

function App() {
  return (
    <BrowserRouter>
      <RoutesReact />
    </BrowserRouter>
  );
}

export default App;