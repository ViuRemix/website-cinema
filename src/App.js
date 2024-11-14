import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivacyPolicy from "./pages/PrivacyPolicy"; // Import trang Chính sách quyền riêng tư

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          {/* Home here */}
          {/* <Route path="/" element={<Home />} /> Trang Home */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>

        {/* Footer nằm ngoài Routes để luôn hiển thị */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
