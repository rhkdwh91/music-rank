import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<Navigate to="/" />}></Route>
        </Routes>
        <div id="modal-root"></div>
      </div>
    </BrowserRouter>
  );
}
