import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Movies.css";

// hiện thị thông báo
import { toast, ToastContainer } from "react-toastify";
// các hình ảnh
import inceptionImg from "../../assets/images/incetion.jpg";
import titanicImg from "../../assets/images/titanic.jpg";
import darkKnightImg from "../../assets/images/thedarkknight.jpg";
import avatarImg from "../../assets/images/avatar.jpeg";
import inter from "../../assets/images/inters.jpg";
import fault from "../../assets/images/fault.webp";
import gladiator from "../../assets/images/gladiator1.jpg";
import lala from "../../assets/images/lala1.jpg";
import forrest from "../../assets/images/forrest.jpg";
import matrix from "../../assets/images/matrix.jpg";
import godfather from "../../assets/images/godfather.jpg";

const movies = [
  { id: 27205, title: "Inception", genre: "Sci-Fi", imageUrl: inceptionImg },
  { id: 44918, title: "Titanic", genre: "Romance", imageUrl: titanicImg },
  {
    id: 155,
    title: "The Dark Knight",
    genre: "Action",
    imageUrl: darkKnightImg,
  },
  { id: 76600, title: "Avatar", genre: "Sci-Fi", imageUrl: avatarImg },
  { id: 157336, title: "Interstellar", genre: "Sci-Fi", imageUrl: inter },
  {
    id: 222935,
    title: "The Fault in Our Stars",
    genre: "Romance",
    imageUrl: fault,
  },
  { id: 98, title: "Gladiator", genre: "Action", imageUrl: gladiator },
  { id: 13, title: "Forrest Gump", genre: "Comedy", imageUrl: forrest },
  { id: 603, title: "The Matrix", genre: "Action", imageUrl: matrix },
  { id: 238, title: "The Godfather", genre: "Crime", imageUrl: godfather },
];

function Movies() {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const searchResults = location.state?.movies || [];

  useEffect(() => {
    const savedFavorites =
      JSON.parse(localStorage.getItem("favoriteMovies")) || [];
    setFavoriteMovies(savedFavorites);
  }, []);

  const filteredMovies =
    selectedGenre === "All"
      ? searchResults.length > 0
        ? searchResults
        : movies
      : (searchResults.length > 0 ? searchResults : movies).filter(
          (movie) => movie.genre === selectedGenre
        );

  const handleAddToFavorites = (movie) => {
    if (!favoriteMovies.some((fav) => fav.id === movie.id)) {
      const updatedFavorites = [...favoriteMovies, movie];
      setFavoriteMovies(updatedFavorites);
      localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
      toast.success("Đã thêm vào mục yêu thích!");
    } else {
      toast.success("Phim này đã có trong mục yêu thích!");
    }
  };

  const handleWatchMovie = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div>
      <select
        onChange={(e) => setSelectedGenre(e.target.value)}
        value={selectedGenre}
      >
        <option value="All">Chọn thể loại</option>
        <option value="Sci-Fi">Khoa học viễn tưởng</option>
        <option value="Romance">Lãng mạn</option>
        <option value="Action">Hành động</option>
      </select>

      <div className="movie-cards">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <Link to={`/movie/${movie.id}`}>
                {/* Kiểm tra nếu không có poster_path thì dùng ảnh mặc định */}
                <img
                  src={
                    movie.imageUrl || // Dùng ảnh đã import từ local
                    `https://image.tmdb.org/t/p/w500${movie.poster_path}` || // Nếu có poster từ API, dùng ảnh đó
                    "../../assets/images/godfather.jpg" // Nếu không có gì, dùng ảnh mặc định
                  }
                  alt={movie.title}
                  className="movie-card-img"
                />
                <h3>{movie.title}</h3>
                <p>Genre: {movie.genre}</p>
              </Link>
              <button
                onClick={() => handleWatchMovie(movie.id)}
                className="watch-movie"
              >
                Xem phim
              </button>
              <button
                onClick={() => handleAddToFavorites(movie)}
                className="add-to-favorites"
              >
                Yêu thích
              </button>
            </div>
          ))
        ) : (
          <p>Không tìm thấy phim nào.</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Movies;
