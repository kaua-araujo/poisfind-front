import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./home/Home"; 
import CreatePOI from "./pages/createPOI";
import ProxPOI from "./pages/proxPOI";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePOI/>} />
        <Route path="/listar-por-proximidade" element={<ProxPOI/>} />
      </Routes>
    </Router>
  );
}

export default App;
