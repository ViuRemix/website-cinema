import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./WatchMovie.css"; // Import CSS
import { Link } from "react-router-dom";

const WatchMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [videos, setVideos] = useState([]);
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

    const fetchNowPlayingMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`
        );
        const data = await response.json();
        setNowPlayingMovies(data.results);
      } catch (error) {
        console.error("Error fetching now playing movies:", error);
      }
    };

    const fetchMovieVideos = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`
        );
        const data = await response.json();
        setVideos(data.results);
      } catch (error) {
        console.error("Error fetching movie videos:", error);
      }
    };

    fetchMovieDetails();
    fetchNowPlayingMovies();
    fetchMovieVideos();
  }, [id]);

  if (!movie) {
    return <div className="loading">Loading...</div>;
  }

  // Lọc video từ YouTube và lấy video đầu tiên nếu có, nếu không có thì lấy video tiếp theo.
  const youtubeVideos = videos.filter((video) => video.site === "YouTube");
  const selectedVideo = youtubeVideos.length > 0 ? youtubeVideos[0] : videos[0];

  return (
    <div className="movie-details">
      <div className="header-movies">
        <button className="back title" onClick={() => window.history.back()}>
          <i className="bi bi-arrow-left"></i> The Last Dance
        </button>
        <div className="actions">
          <button className="favorite btn btn-danger">
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

      <h2>Phim đang phát</h2>
      <ul className="now-playing-list">
        <div className="movie-cards">
          {nowPlayingMovies.length > 0 ? (
            nowPlayingMovies.map((movie) => (
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
              </div>
            ))
          ) : (
            <p>Không tìm thấy phim nào.</p>
          )}
        </div>
      </ul>
    </div>
  );
};

export default WatchMovie;
