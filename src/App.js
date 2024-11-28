import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import WatchMovie from "./pages/WatchMovies";
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import About from "./pages/About";

// hỗ sơ người dùng
import Profile from "./components/Profile/Profile";
// quên mật khẩu
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";

// Admin components
import Dashboard from "./pages/layouts/Dashboard";
import AdminMovies from "./pages/layouts/AdminMovies";
import LoginFormAdmin from "./pages/layouts/LoginFormAdmin";

// Footer links
import Faq from "./pages/footerLinks/Faq";
import InvestorRelations from "./pages/footerLinks/InvestorRelations";
import PrivacyPolicy from "./pages/footerLinks/PrivacyPolicy";
import SpeedTest from "./pages/footerLinks/SpeedTest";
import HelpCenter from "./pages/footerLinks/HelpCenter";
import Jobs from "./pages/footerLinks/Jobs";
import CookieSettings from "./pages/footerLinks/CookieSettings";
import LegalNotice from "./pages/footerLinks/LegalNotice";
import Account from "./pages/footerLinks/Account";
import ViewingOptions from "./pages/footerLinks/ViewingOptions";
import CompanyInfo from "./pages/footerLinks/CompanyInfo";
import Exclusives from "./pages/footerLinks/Exclusives";
import MediaCenter from "./pages/footerLinks/MediaCenter";
import TermsOfService from "./pages/footerLinks/TermsOfService";
import Contact from "./pages/footerLinks/Contact";
import Favorites from "./pages/Favorites";

function AppContent() {
  const location = useLocation(); // Lấy thông tin đường dẫn hiện tại
  const [user, setUser] = useState(null); // Quản lý trạng thái người dùng
  const [movies, setMovies] = useState([]); // Quản lý danh sách phim

  const isAdminPage = location.pathname.startsWith("/admin"); //khi vào trang admin thì header và footer sẽ ẩn đi

  // Lấy dữ liệu phim từ localStorage hoặc JSON khi tải trang
  // Lấy từ localStorage: Khi trang tải,
  useEffect(() => {
    const savedMovies = localStorage.getItem("movies");
    if (savedMovies) {
      setMovies(JSON.parse(savedMovies));
    } else {
      ///Nếu không có dữ liệu trong localStorage hi nhận được dữ liệu, nó sẽ được chuyển thành định dạng JSON và lưu vào trạng thái movies.
      fetch("/movies.json")
        .then((response) => response.json())
        .then((data) => setMovies(data))
        .catch((error) => console.error("Error loading movies:", error));
    }
  }, []);

  // Cập nhật danh sách phim khi có sự thay đổi
  useEffect(() => {
    if (movies.length > 0) {
      localStorage.setItem("movies", JSON.stringify(movies));
    }
  }, [movies]);

  return (
    <div className="App">
      {/* Ẩn Header và Footer nếu đang ở trang admin */}
      {!isAdminPage && <Header user={user} setUser={setUser} />}

      <Routes>
        {/* Trang yêu thích */}
        <Route path="/favorites" element={<Favorites/>} />
        {/* Trang chính */}
        <Route path="/" element={<Home />} />
        {/* Trang giới thiệu */}
        <Route path="/about" element={<About />} />
        {/* Chi tiết phim */}
        <Route path="/movie/:id" element={<MovieDetail movies={movies} />} />
        <Route path="/watch/:id" element={<WatchMovie />} />
        {/* Trang đăng nhập */}
        <Route path="/login" element={<LoginForm setUser={setUser} />} />
        {/* Trang đăng ký */}
        <Route path="/sign-up" element={<RegisterForm setUser={setUser} />} />
        {/* Trang đquên mật khẩu */}
        <Route path="/forgot-password" element={<ForgotPassword />} />;
        {/* Các route footer khác */}
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
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
        {/* Trang quản lý admin */}
        <Route
          path="/loginAdmin"
          element={<LoginFormAdmin setUser={setUser} />}
        />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/movies" element={<AdminMovies />} />
        {/* Profile người dùng */}
        <Route path="/Profile" element={<Profile />} />
      </Routes>

      {/* Ẩn Footer nếu đang ở trang admin */}
      {!isAdminPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
