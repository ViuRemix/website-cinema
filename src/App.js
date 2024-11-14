// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import PrivacyPolicy from "./pages/PrivacyPolicy"; // Import trang Chính sách quyền riêng tư
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <div className="App">
        <Home/>
      </div>
    </Router>
  );
}

export default App;
