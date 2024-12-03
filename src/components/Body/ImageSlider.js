import React, { useState, useEffect } from "react";
import "./ImageSlider.css";
import { Link } from "react-router-dom";

const apiKey = "ca2ef8efffeadbb2449d15ba0ae016fa";

const ImageSlider = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Hàm fetch dữ liệu phim từ API
  const fetchMovies = async () => {
    const results = [];
    for (let page = 42; page <= 55; page++) {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=vi-VN&with_genres=16&page=${page}`
      );
      const data = await response.json();
      results.push(...(data.results || []));
    }
    setMovies(results.slice(0, 10)); // Lấy 10 phim đầu tiên để hiển thị
  };

  // Gọi API khi component được mount
  useEffect(() => {
    fetchMovies();
  }, []);

  // Hàm chuyển sang ảnh tiếp theo
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === movies.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Hàm chuyển về ảnh trước
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  };

  // Sử dụng useEffect để tạo hiệu ứng trượt tự động
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Chuyển ảnh sau mỗi 5 giây
    return () => clearInterval(interval); // Xóa interval khi component unmount
  }, [movies]);

  if (movies.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="slider">
      <div
        className="slider-background"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movies[currentIndex].backdrop_path})`,
        }}
      />
      <div className="slider-content">
        <button className="prev" onClick={prevSlide}>
          ❮
        </button>
        <div className="slide-container">
          <img
            src={`https://image.tmdb.org/t/p/w500${movies[currentIndex].poster_path}`}
            alt={movies[currentIndex].title}
            className="slide-image"
          />
          <div className="movie-info">
            <h3>{movies[currentIndex].title}</h3>
            <p>
              <strong>Ngày phát hành:</strong>{" "}
              {movies[currentIndex].release_date}
            </p>
            <p>
              <strong>Đánh giá:</strong> ⭐ {movies[currentIndex].vote_average}
              /10
            </p>
            <p>
              <strong>Lượt xem:</strong> {movies[currentIndex].vote_count}
            </p>

            <p className="movie-description-slide">
              <strong>Mô tả:</strong> {movies[currentIndex].overview}
            </p>
            <Link
              to={`/watch/${movies[currentIndex].id}`}
              className="watch-button"
            >
              <i className="bi bi-play-circle"></i> Xem Phim
            </Link>
          </div>
        </div>
        <button className="next" onClick={nextSlide}>
          ❯
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
