import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./WatchMovie.css"; // Import CSS
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const WatchMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [popularMovies, setPopularMovies] = useState([]); // Phim phổ biến
  const [videos, setVideos] = useState([]); // Videos phim
  const apiKey = "ca2ef8efffeadbb2449d15ba0ae016fa";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    const fetchPopularMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
        );
        const data = await response.json();
        const shuffledMovies = randomizeArray(data.results || []); // Sắp xếp ngẫu nhiên
        setPopularMovies(shuffledMovies);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    const fetchMovieVideos = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`
        );
        const data = await response.json();
        setVideos(data.results || []);
      } catch (error) {
        console.error("Error fetching movie videos:", error);
      }
    };

    fetchMovieDetails();
    fetchPopularMovies(); // Gọi hàm mới
    fetchMovieVideos();
  }, [id]);

  // Hàm sắp xếp ngẫu nhiên
  const randomizeArray = (array) => {
    return array.sort(() => Math.random() - 0.5); // Sắp xếp ngẫu nhiên
  };

  if (!movie) {
    return <div className="loading">Loading...</div>;
  }

  const youtubeVideos = Array.isArray(videos)
    ? videos.filter((video) => video.site === "YouTube")
    : [];
  const selectedVideo = youtubeVideos.length > 0 ? youtubeVideos[0] : null;

  // thêm vào yêu thích
  const handleAddToFavorites = (movie) => {
    const savedFavorites =
      JSON.parse(localStorage.getItem("favoriteMovies")) || [];
    if (savedFavorites.some((fav) => fav.id === movie.id)) {
      toast.info(`"${movie.title}" đã có trong danh sách yêu thích!`);
      return;
    }
    const updatedFavorites = [...savedFavorites, movie];
    localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
    toast.success(`Đã thêm "${movie.title}" vào danh sách yêu thích!`);
  };

  return (
    <div className="movie-details">
      <div className="header-movies">
        <button className="back title" onClick={() => window.history.back()}>
          <i className="bi bi-arrow-left"></i> The Last Dance
        </button>
        <div className="actions">
          <button
            className="favorite btn btn-danger"
            onClick={() => handleAddToFavorites(movie)}
          >
            <span role="img" aria-label="heart">
              ❤️
            </span>
          </button>

          <button className="download">Download</button>
        </div>
      </div>
      {selectedVideo ? (
        <div className="video-list">
          <div key={selectedVideo.id} className="video-item">
            <div className="ratio ratio-16x9">
              <iframe
                className="video-frame"
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${selectedVideo.key}`}
                title={selectedVideo.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      ) : (
        <h1
          style={{
            paddingLeft: 80,
            marginBottom: 30,
            marginTop: 30,
            color: "red",
          }}
        >
          Không có video nào cho phim này.
        </h1>
      )}
      <h2>Phim Phổ Biến</h2>
      <ul className="now-playing-list">
        <div className="movie-cards">
          {Array.isArray(popularMovies) && popularMovies.length > 0 ? (
            popularMovies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <Link to={`/movie/${movie.id}`}>
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "/default-image.jpg"
                    }
                    alt={movie.title}
                    className="movie-card-img"
                  />
                  <h3>{movie.title}</h3>
                  <p>Genre: {movie.genre}</p>
                </Link>
                <div className="movie-card-details">
                  <Link to={`/movie/${movie.id}`}>Xem Chi Tiết</Link>
                </div>
              </div>
            ))
          ) : (
            <p>Không tìm thấy phim nào.</p>
          )}
        </div>
      </ul>
      <ToastContainer
        position="top-right"
        autoClose={2000}
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
};

export default WatchMovie;
