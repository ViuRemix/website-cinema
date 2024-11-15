import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
// import MovieDetail from "./pages/MovieDetail"; // Trang chi tiết phim
import LoginForm from "./components/LoginForm"; // Trang đăng nhập
// import SignupForm from "./components/SignupForm"; // Trang đăng ký

function App() {
  const [user, setUser] = useState(null); // Quản lý trạng thái người dùng

  return (
    <Router>
      <div className="App">
        <Header user={user} setUser={setUser} />{" "}
        {/* Truyền user và setUser vào Header */}
        <Routes>
          {/* <Route path="/" element={<Home />} />
          cho chọn phim
          <Route path="/genres/:genre" element={<Home />} />
          <Route path="/movie/:movieId" element={<MovieDetail />} /> */}
          <Route path = "/" element={<Home/>}/>
          <Route path="/login" element={<LoginForm />} />{" "}
        </Routes>

        {/* Footer nằm ngoài Routes để luôn hiển thị */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
