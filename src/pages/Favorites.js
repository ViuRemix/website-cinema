import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Favorites.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPlay,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Favorites() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const savedFavorites =
      JSON.parse(localStorage.getItem("favoriteMovies")) || [];
    setFavoriteMovies(savedFavorites);
  }, []);

  const handleRemoveFromFavorites = (movieId) => {
    const movieToRemove = favoriteMovies.find((fav) => fav.id === movieId);
    const updatedFavorites = favoriteMovies.filter((fav) => fav.id !== movieId);
    setFavoriteMovies(updatedFavorites);
    localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));

    if (movieToRemove) {
      toast.success(`Đã xóa "${movieToRemove.title}" khỏi mục yêu thích!`);
    } else {
      toast.error("Lỗi: Không tìm thấy phim để xóa!");
    }
  };

  return (
    <div className="favorites-container">
      <h2 className="favorites-title">Mục yêu thích</h2>
      {favoriteMovies.length > 0 ? (
        <div className="movies-list">
          {favoriteMovies.map((movie) => (
            <div key={movie.id} className="movie-item">
              <Link to={`/movie/${movie.id}`} className="movie-link-link">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : movie.imageUrl || "/default-image.jpg"
                  }
                  alt={movie.title}
                  className="movie-image"
                />
                <h3 className="movie-title">{movie.title}</h3>

                <p className="movie-genres">
                  Thể loại:{" "}
                  {movie.genres &&
                  Array.isArray(movie.genres) &&
                  movie.genres.length > 0
                    ? movie.genres.map((genre) => genre.name).join(", ")
                    : "Unknown"}
                </p>
              </Link>

              <Link to={`/movie/${movie.id}`} className="watch-movie-btn">
                <FontAwesomeIcon icon={faPlay} style={{ marginRight: "8px" }} />
                Xem phim
              </Link>

              <button
                onClick={() => handleRemoveFromFavorites(movie.id)}
                className="remove-movie-btn"
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
        <p className="no-movies-message">
          Không có phim nào trong mục yêu thích.
        </p>
      )}

      <Link to="/" className="back-button">
        <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: "8px" }} />
        Quay lại
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
