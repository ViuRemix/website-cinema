// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import PrivacyPolicy from "./pages/PrivacyPolicy"; // Import trang Chính sách quyền riêng tư

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Xin chào các bạn nha
          </a>

          {/* Chính sách quyền riêng tư có thể đưa vào footer hoặc header*/}
          <Link to="/privacy-policy" className="App-link">
            Chính Sách Quyền Riêng Tư
          </Link>
        </header>

        <Routes>
          {/* Cho chính sách quyền riêng tư  */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
