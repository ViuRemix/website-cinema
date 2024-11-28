import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Favorites.css";

function Favorites() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const savedFavorites =
      JSON.parse(localStorage.getItem("favoriteMovies")) || [];
    setFavoriteMovies(savedFavorites);
  }, []);

  const handleRemoveFromFavorites = (movieId) => {
    const updatedFavorites = favoriteMovies.filter((fav) => fav.id !== movieId);
    setFavoriteMovies(updatedFavorites);
    localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <h2>Mục yêu thích</h2>
      {favoriteMovies.length > 0 ? (
        <div className="movie-cards">
          {favoriteMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              {/* Kiểm tra poster_path và imageUrl */}
              <Link to={`/movie/${movie.id}`} className="movie-link">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : movie.imageUrl || "/default-image.jpg"
                  }
                  alt={movie.title}
                  className="movie-card-img"
                />
                <h3>{movie.title}</h3>

                {/* Kiểm tra genres hoặc genre */}
                <p>
                  Thể loại:{" "}
                  {movie.genres &&
                  Array.isArray(movie.genres) &&
                  movie.genres.length > 0
                    ? movie.genres.map((genre) => genre.name).join(", ")
                    : "Unknown"}
                </p>
              </Link>

              {/* Nút "Xem phim" */}
              <Link to={`/movie/${movie.id}`}>
                <button className="watch-movie">Xem phim</button>
              </Link>

              {/* Nút xóa yêu thích */}
              <button
                onClick={() => handleRemoveFromFavorites(movie.id)}
                className="remove-from-favorites"
              >
                Xóa
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Không có phim nào trong mục yêu thích.</p>
      )}

      {/* Nút Quay lại */}
      <Link
        to="/"
        style={{
          fontSize: "18px", // Kích thước chữ
          color: "white", // Màu chữ
          textDecoration: "none", // Bỏ gạch chân mặc định
          padding: "10px 15px", // Khoảng cách trong thẻ
          borderRadius: "5px", // Bo tròn các góc
          marginTop: "20px", // Khoảng cách phía trên
          display: "inline-block", // Để thẻ Link hiển thị như một khối nhỏ
          textAlign: "center", // Căn giữa văn bản
          width: "100%", // Chiều rộng 100% để căn giữa trong container
          boxSizing: "border-box", // Đảm bảo padding không làm thay đổi kích thước thẻ
        }}
      >
        <Link to="/" className="back-button">
          Quay lại
        </Link>
      </Link>
    </div>
  );
}

export default Favorites;
