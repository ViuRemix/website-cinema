// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import PrivacyPolicy from "./pages/PrivacyPolicy"; // Import the Privacy Policy page
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
        
        {/* Footer nằm ngoài Routes để luôn hiển thị */}
        <Footer />
      </div>
    </Router>

  );
}

export default App;

