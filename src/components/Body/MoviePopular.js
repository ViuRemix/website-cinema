import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./MoviePopular.css";

const MoviePopular = () => {
  const [popularMovies1, setPopularMovies1] = useState([]);
  const [popularMovies2, setPopularMovies2] = useState([]);
  const [popularMovies3, setPopularMovies3] = useState([]);
  const [loading, setLoading] = useState(true);
  const movieListRef = useRef(null);
  const apiKey = "ca2ef8efffeadbb2449d15ba0ae016fa"; // Thay bằng API key của bạn

  const fetchPopularMovies = async () => {
    try {
      const results1 = [];
      const results2 = [];
      const results3 = [];

      // Fetch phim từ 200 đến 250 (trang 11-13)
      for (let page = 9; page <= 11; page++) {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
        );
        const data = await response.json();
        results1.push(...(data.results || []));
      }

      // Fetch phim từ 500 đến 550 (trang 25-27)
      for (let page = 42; page <= 44; page++) {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&with_genres=16&page=${page}`
        );
        const data = await response.json();
        results2.push(...(data.results || []));
      }

      // Fetch phim từ 600 đến 650 (trang 30-33)
      for (let page = 36; page <= 39; page++) {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&with_genres=28&page=${page}`
        );
        const data = await response.json();
        results3.push(...(data.results || []));
      }

      // Cập nhật danh sách phim cho mỗi range
      setPopularMovies1(results1.slice(0, 50)); // Lấy 50 phim đầu tiên từ 200–250
      setPopularMovies2(results2.slice(0, 50)); // Lấy 50 phim đầu tiên từ 500–550
      setPopularMovies3(results3.slice(0, 50)); // Lấy 50 phim đầu tiên từ 600–650
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const scrollLeft = () => {
    movieListRef.current.scrollBy({
      left: -300, // Kéo sang trái 300px
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    movieListRef.current.scrollBy({
      left: 300, // Kéo sang phải 300px
      behavior: "smooth",
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="movie-popular-container">
      {/* icon trái */}
      <button className="scroll-button-1 left" onClick={scrollLeft}>
        <i className="bi bi-chevron-left"></i>
      </button>
      {/* Danh sách phim 1 (200–250) */}
      <h4>Phim bộ hot</h4>
      <div className="popular-movie-list" ref={movieListRef}>
        {popularMovies1.length > 0 ? (
          popularMovies1.map((movie) => (
            <div key={movie.id} className="popular-movie-item">
              <Link className="movie-link">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "/default-image.jpg"
                  }
                  alt={movie.title}
                  className="popular-movie-img"
                />
                <div className="movie-overlay">
                  <Link to={`/watch/${movie.id}`} className="Link-action-movie">
                    <i className="bi bi-play-circle"></i>
                  </Link>
                  <h3>{movie.title}</h3>
                </div>
              </Link>
              <div className="popular-movie-details">
                <Link to={`/movie/${movie.id}`}>Xem Chi Tiết</Link>
              </div>
            </div>
          ))
        ) : (
          <p>Không tìm thấy phim nào.</p>
        )}
      </div>
      <button className="scroll-button-1 right" onClick={scrollRight}>
        <i className="bi bi-chevron-right"></i>
      </button>
      {/* iocn 2 tráik */}
      <button className="scroll-button-2 left" onClick={scrollLeft}>
        <i className="bi bi-chevron-left"></i>
      </button>
      <h4>Top 15 Anime hot</h4>
      {/* Danh sách phim 2 (500–550) */}
      <div className="popular-movie-list" ref={movieListRef}>
        {popularMovies2.length > 0 ? (
          popularMovies2.map((movie) => (
            <div key={movie.id} className="popular-movie-item">
              <Link className="movie-link">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "/default-image.jpg"
                  }
                  alt={movie.title}
                  className="popular-movie-img"
                />
                <div className="movie-overlay">
                  <Link to={`/watch/${movie.id}`}>
                    <i className="bi bi-play-circle"></i>
                  </Link>
                  <h3>{movie.title}</h3>
                </div>
              </Link>
              <div className="popular-movie-details">
                <Link to={`/movie/${movie.id}`}>Xem Chi Tiết</Link>
              </div>
            </div>
          ))
        ) : (
          <p>Không tìm thấy phim nào.</p>
        )}
      </div>
      {/* icon  2 phải */}
      <button className="scroll-button-2 right" onClick={scrollRight}>
        <i className="bi bi-chevron-right"></i>
      </button>

      {/* iocn 3 tráik */}
      <button className="scroll-button-3 left" onClick={scrollLeft}>
        <i className="bi bi-chevron-left"></i>
      </button>
      <h4>Phim lẻ nổi bật</h4>
      {/* Danh sách phim 3 (600–650) */}
      <div className="popular-movie-list" ref={movieListRef}>
        {popularMovies3.length > 0 ? (
          popularMovies3.map((movie) => (
            <div key={movie.id} className="popular-movie-item">
              <Link className="movie-link">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "/default-image.jpg"
                  }
                  alt={movie.title}
                  className="popular-movie-img"
                />
                {/* onClick={() => navigate(`/watch/${movie.id}`)} // Chuyển hướng đến WatchMovie để xem phim */}
                <div className="movie-overlay">
                  <Link to={`/watch/${movie.id}`}>
                    <i className="bi bi-play-circle"></i>
                  </Link>
                  <h3>{movie.title}</h3>
                </div>
              </Link>
              <div className="popular-movie-details">
                <Link to={`/movie/${movie.id}`}>Xem Chi Tiết</Link>
              </div>
            </div>
          ))
        ) : (
          <p>Không tìm thấy phim nào.</p>
        )}
      </div>
      {/* icon  3 phải */}
      <button className="scroll-button-3 right" onClick={scrollRight}>
        <i className="bi bi-chevron-right"></i>
      </button>
    </div>
  );
};

export default MoviePopular;
