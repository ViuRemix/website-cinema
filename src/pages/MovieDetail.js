import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const { movieId } = useParams(); // Lấy ID phim từ URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    // Lấy thông tin chi tiết của phim từ API
    const fetchMovieDetail = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=YOUR_API_KEY`
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetail();
  }, [movieId]); // Chạy lại khi movieId thay đổi

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div className="movie-detail">
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Rating: {movie.vote_average}</p>
      {/* Bạn có thể thêm các thông tin khác của phim ở đây */}
    </div>
  );
};

export default MovieDetail;
