import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
// import MovieDetail from "./pages/MovieDetail"; // Trang chi tiết phim
import LoginForm from "./components/LoginForm"; // Trang đăng nhập

// các footer link

import Faq from "./pages/footerLinks/Faq"; // Trang Câu hỏi thường gặp
import InvestorRelations from "./pages/footerLinks/InvestorRelations"; // Quan hệ với nhà đầu tư
import PrivacyPolicy from "./pages/footerLinks/PrivacyPolicy"; // Trang Riêng tư
import SpeedTest from "./pages/footerLinks/SpeedTest"; // Kiểm tra tốc độ
import HelpCenter from "./pages/footerLinks/HelpCenter"; // Trung tâm trợ giúp
import Jobs from "./pages/footerLinks/Jobs"; // Việc làm
import CookieSettings from "./pages/footerLinks/CookieSettings"; // Tùy chọn cookie
import LegalNotice from "./pages/footerLinks/LegalNotice"; // Thông báo pháp lý
import Account from "./pages/footerLinks/Account"; // Tài khoản
import ViewingOptions from "./pages/footerLinks/ViewingOptions"; // Các cách xem
import CompanyInfo from "./pages/footerLinks/CompanyInfo"; // Thông tin doanh nghiệp
import Exclusives from "./pages/footerLinks/Exclusives"; // Chỉ có trên Vieflix
import MediaCenter from "./pages/footerLinks/MediaCenter"; // Trung tâm đa phương tiện
import TermsOfService from "./pages/footerLinks/TermsOfService"; // Điều khoản sử dụng
import Contact from "./pages/footerLinks/Contact"; // Liên hệ với chúng tôi

function App() {
  const [user, setUser] = useState(null); // Quản lý trạng thái người dùng

  // Hàm cập nhật thông tin người dùng
  const updateUser = (updatedInfo) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedInfo, // Gộp thông tin mới với thông tin cũ
    }));
    console.log("User updated:", updatedInfo);
  };

  return (
    <Router>
      <div className="App">
        <Header user={user} setUser={setUser} />{" "}
        {/* Truyền user và setUser vào Header */}
        <Routes>
          {/*
          cho chọn phim
          <Route path="/genres/:genre" element={<Home />} />
          <Route path="/movie/:movieId" element={<MovieDetail />} /> */}
          <Route path="/" element={<Home />} />
          {/* nhớ chuyển prop không thì sẽ bị setUser is not a function */}
          <Route path="/login" element={<LoginForm setUser={setUser} />} />
          {/* CHO footer link chuyển trang*/}
          <Route path="/terms" element={<TermsOfService />} />{" "}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />{" "}
          <Route path="/faq" element={<Faq />} />
          <Route path="/investor-relations" element={<InvestorRelations />} />
          <Route path="/speed-test" element={<SpeedTest />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/cookie-settings" element={<CookieSettings />} />
          <Route path="/legal-notice" element={<LegalNotice />} />
          <Route path="/account" element={<Account />} />
          <Route path="/viewing-options" element={<ViewingOptions />} />
          <Route path="/company-info" element={<CompanyInfo />} />
          <Route path="/exclusives" element={<Exclusives />} />
          <Route path="/media-center" element={<MediaCenter />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        {/* Footer nằm ngoài Routes để luôn hiển thị */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
