import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Movies.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faHeart } from "@fortawesome/free-solid-svg-icons";

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

// khi tìm kiếm mà không có hình ảnh
import search_No_movie from "../../assets/images/search_No_movies.jpeg";

const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

const movies = [
  {
    id: 27205,
    title: "Inception",
    genre_ids: [878, 28],
    imageUrl: inceptionImg,
  },
  { id: 44918, title: "Titanic", genre_ids: [10749], imageUrl: titanicImg },
  {
    id: 155,
    title: "The Dark Knight",
    genre_ids: [28, 80],
    imageUrl: darkKnightImg,
  },
  { id: 76600, title: "Avatar", genre_ids: [878, 12], imageUrl: avatarImg },
  { id: 157336, title: "Interstellar", genre_ids: [878], imageUrl: inter },
  {
    id: 222935,
    title: "The Fault in Our Stars",
    genre_ids: [10749],
    imageUrl: fault,
  },
  { id: 98, title: "Gladiator", genre_ids: [28, 80], imageUrl: gladiator },
  { id: 13, title: "Forrest Gump", genre_ids: [35], imageUrl: forrest },
  { id: 603, title: "The Matrix", genre_ids: [28, 878], imageUrl: matrix },
  { id: 238, title: "The Godfather", genre_ids: [80], imageUrl: godfather },
];

function Movies() {
  // Trạng thái và các Hook
  // Lưu thể loại phim được chọn (mặc định là "All").
  const [selectedGenre, setSelectedGenre] = useState("All");
  // Danh sách phim yêu thích được lưu trong localStorage.
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  // Truy xuất trạng thái hoặc thông tin từ đường dẫn hiện tại.
  // Lấy dữ liệu từ URL
  const location = useLocation();
  // Chuyển hướng đến trang chi tiết phim.
  const navigate = useNavigate();

  // searchResults: Nếu có kết quả tìm kiếm được truyền qua URL, nó sẽ được ưu tiên hiển thị.
  const searchResults = location.state?.movies || [];

  // Khi component được tải, lấy danh sách phim yêu thích từ localStorage và lưu vào favoriteMovies.
  useEffect(() => {
    const savedFavorites =
      JSON.parse(localStorage.getItem("favoriteMovies")) || [];
    setFavoriteMovies(savedFavorites);
  }, []);

  // Lọc phim theo thể loại
  const filteredMovies =
    selectedGenre === "All"
      ? // Nếu chọn "All": Hiển thị toàn bộ phim.
        searchResults.length > 0
        ? // Nếu có searchResults: Sử dụng kết quả tìm kiếm.
          searchResults
        : movies
      : // Nếu không: Lọc từ danh sách movies.
        (searchResults.length > 0 ? searchResults : movies).filter(
          (movie) => movie.genre === selectedGenre
        );

  // Thêm vào danh sách yêu thích
  const handleAddToFavorites = (movie) => {
    // Kiểm tra nếu phim chưa có trong danh sách yêu thích
    if (!favoriteMovies.some((fav) => fav.id === movie.id)) {
      // Thêm phim vào danh sách favoriteMovies.
      const updatedFavorites = [...favoriteMovies, movie];
      setFavoriteMovies(updatedFavorites);
      localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
      toast.success("Đã thêm vào mục yêu thích!");
    } else {
      toast.success("Phim này đã có trong mục yêu thích!");
    }
  };

  // Xem chi tiết phim
  const handleWatchMovie = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const getGenres = (genreIds) => {
    return genreIds
      .map((id) => genres.find((genre) => genre.id === id)?.name)
      .filter((name) => name) // Lọc những tên thể loại hợp lệ
      .join(", ");
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

      {/* Hiển thị danh sách phim */}
      <div className="movie-cards">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={
                    movie.imageUrl || // Dùng ảnh đã import từ local
                    (movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` // Nếu có poster từ API, dùng ảnh đó
                      : null) ||
                    search_No_movie // Nếu không có gì, dùng ảnh mặc định
                  }
                  alt={movie.title}
                  className="movie-card-img"
                />

                <h3>{movie.title}</h3>
                {/* Hiển thị thể loại phim */}
                <p>
                  <span>Thể loại: </span>
                  {getGenres(movie.genre_ids) || "Không có thể loại"}
                </p>
              </Link>
              <div className="button-container">
                <button
                  onClick={() => handleWatchMovie(movie.id)}
                  className="watch-movie"
                >
                  <FontAwesomeIcon
                    icon={faPlay}
                    style={{ marginRight: "8px" }}
                  />
                  Xem phim
                </button>
                <button
                  onClick={() => handleAddToFavorites(movie)}
                  className="add-to-favorites"
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    style={{ marginRight: "8px", color: "red" }}
                  />
                  Yêu thích
                </button>
              </div>
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
