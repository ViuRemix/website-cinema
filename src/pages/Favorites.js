import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Favorites.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlay, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Favorites() {
  // Khởi tạo trạng thái (useState)
  // favoriteMovies: Lưu trữ danh sách các phim yêu thích của người dùng.
  // setFavoriteMovies: Hàm để cập nhật danh sách phim yêu thích.
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  // Lấy danh sách phim yêu thích từ localStorage (useEffect)
  // useEffect: Hook này chạy sau khi component được render lần đầu tiên.
  useEffect(() => {
    const savedFavorites =
    // localStorage.getItem("favoriteMovies"): Lấy dữ liệu phim yêu thích đã lưu trữ trong localStorage.
    // JSON.parse(): Chuyển chuỗi JSON thành một mảng.
      JSON.parse(localStorage.getItem("favoriteMovies")) || [];
    setFavoriteMovies(savedFavorites);
  }, []);

  // ID của phim cần xóa.
  const handleRemoveFromFavorites = (movieId) => {
    // movieToRemove: Tìm phim có id trùng với movieId trong danh sách phim yêu thích.
    const movieToRemove = favoriteMovies.find((fav) => fav.id === movieId);
    // updatedFavorites: Lọc danh sách phim yêu thích, loại bỏ phim có id trùng với movieId.
    const updatedFavorites = favoriteMovies.filter((fav) => fav.id !== movieId);
    // setFavoriteMovies(updatedFavorites): Cập nhật lại danh sách phim yêu thích trong trạng thái.
    setFavoriteMovies(updatedFavorites);
    // localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites)): Lưu lại danh sách phim yêu thích đã được cập nhật vào localStorage.
    localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));

    if (movieToRemove) {
      toast.success(`Đã xóa "${movieToRemove.title}" khỏi mục yêu thích!`);
    } else {
      toast.error("Lỗi: Không tìm thấy phim để xóa!");
    }
  };

  return (
    <div>
      <h2>Mục yêu thích</h2>
      {favoriteMovies.length > 0 ? (
        <div className="movie-cards">
          {favoriteMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <Link to={`/movie/${movie.id}`} className="movie-link">
                <img
                  src={movie.imageUrl || "/default-image.jpg"}
                  alt={movie.title}
                  className="movie-card-img"
                />
                <h3>{movie.title}</h3>
                <p>Genre: {movie.genre}</p>
              </Link>

              <Link to={`/movie/${movie.id}`}>
                <button className="watch-movie">
                  <FontAwesomeIcon
                    icon={faPlay}
                    style={{ marginRight: "8px" }}
                  />
                  Xem phim
                </button>
              </Link>

              <button
                onClick={() => handleRemoveFromFavorites(movie.id)}
                className="remove-from-favorites"
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{ marginRight: "8px" }}
                />
                Xóa
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Không có phim nào trong mục yêu thích.</p>
      )}
      <Link
        to="/"
        style={{
          fontSize: "18px",
          color: "white",
          textDecoration: "none",
          padding: "10px 15px",
          borderRadius: "5px",
          marginTop: "20px",
          display: "inline-block",
          textAlign: "center",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <Link to="/" className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: "8px" }} />
          Quay lại
        </Link>
      </Link>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Favorites;
