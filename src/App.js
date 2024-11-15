import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivacyPolicy from "./pages/PrivacyPolicy"; // Import trang Chính sách quyền riêng tư
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Home/>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
