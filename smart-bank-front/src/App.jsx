import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import "./provider.js";
import "./components/ButtonConnect/ButtonConnect.jsx";
import Welcome from "./pages/Welcome/Welcome.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import { AppProvider } from "./context/AppContext.jsx";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome></Welcome>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
