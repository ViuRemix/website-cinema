import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./style/Movies.css";

// Import ảnh cho các bộ phim
import inceptionImg from "../assets/incetion.jpg";
import titanicImg from "../assets/titanic.jpg";
import darkKnightImg from "../assets/thedarkknight.jpg";
import avatarImg from "../assets/avatar.jpeg";
import inter from "../assets/inters.jpg";
import fault from "../assets/fault.webp";
import gladiator from "../assets/gladiator1.jpg";
import lala from "../assets/lala1.jpg";
import forrest from "../assets/forrest.jpg";
import matrix from "../assets/matrix.jpg";
import godfather from "../assets/godfather.jpg";

// Mảng dữ liệu phim với ảnh đã được import
const movies = [
  { id: 1, title: "Inception", genre: "Sci-Fi", imageUrl: inceptionImg },
  { id: 2, title: "Titanic", genre: "Romance", imageUrl: titanicImg },
  { id: 3, title: "The Dark Knight", genre: "Action", imageUrl: darkKnightImg },
  { id: 4, title: "Avatar", genre: "Sci-Fi", imageUrl: avatarImg },
  { id: 5, title: "Interstellar", genre: "Sci-Fi", imageUrl: inter },
  { id: 6, title: "The Fault in Our Stars", genre: "Romance", imageUrl: fault },
  { id: 7, title: "Gladiator", genre: "Action", imageUrl: gladiator },
  { id: 8, title: "Forrest Gump", genre: "Comedy", imageUrl: forrest },
  { id: 9, title: "The Matrix", genre: "Action", imageUrl: matrix },
  { id: 10, title: "The Godfather", genre: "Crime", imageUrl: godfather },
];

function Movies() {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const location = useLocation();
  const searchResults = location.state?.movies || []; // Lấy danh sách phim từ location (nếu có)

  // Lọc các bộ phim theo thể loại
  const filteredMovies =
    selectedGenre === "All"
      ? searchResults.length > 0
        ? searchResults
        : movies
      : (searchResults.length > 0 ? searchResults : movies).filter(
          (movie) => movie.genre === selectedGenre
        );

  return (
    <div>
      {/* Dropdown để chọn thể loại */}
      <select
        onChange={(e) => setSelectedGenre(e.target.value)}
        value={selectedGenre}
      >
        <option value="All">All</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Romance">Romance</option>
        <option value="Action">Action</option>
      </select>

      {/* Hiển thị các card phim */}
      <div className="movie-cards">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <Link to={`/movie/${movie.id}`}>
                {/* Kiểm tra nếu không có poster_path thì dùng ảnh mặc định */}
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : movie.imageUrl
                  }
                  alt={movie.title}
                  className="movie-card-img"
                />
                <h3>{movie.title}</h3>
                <p>Genre: {movie.genre}</p>
              </Link>
            </div>
          ))
        ) : (
          <p>Không tìm thấy phim nào.</p>
        )}
      </div>
    </div>
  );
}

export default Movies;
