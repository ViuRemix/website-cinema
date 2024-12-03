import React, { useState } from "react";
import "./AdminMovies.css";

const AdminMovies = ({ movies, setMovies }) => {
  const [newMovie, setNewMovie] = useState({
    title: "",
    genre: "",
    imageUrl: "",
    director: "",
    releaseDate: "",
    rating: "",
  });

  const [editMovieId, setEditMovieId] = useState(null);
  const [message, setMessage] = useState(""); // Thêm state để lưu thông báo

  // Xử lý thay đổi thông tin phim
  const handleMovieChange = (e) => {
    const { name, value } = e.target;
    setNewMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  // Thêm phim mới
  const handleAddMovie = (e) => {
    e.preventDefault();
    const newId =
      movies.length > 0 ? Math.max(movies.map((movie) => movie.id)) + 1 : 1;
    setMovies([...movies, { id: newId, ...newMovie }]);
    setNewMovie({
      title: "",
      genre: "",
      imageUrl: "",
      director: "",
      releaseDate: "",
      rating: "",
    });
    setMessage("Movie added successfully!"); // Hiển thị thông báo khi thêm phim thành công
    setTimeout(() => setMessage(""), 1000); // Xóa thông báo sau 3 giây
  };

  // Chỉnh sửa phim
  const handleEditMovie = (e) => {
    e.preventDefault();
    const updatedMovies = movies.map((movie) =>
      movie.id === editMovieId ? { ...movie, ...newMovie } : movie
    );
    setMovies(updatedMovies);
    setNewMovie({
      title: "",
      genre: "",
      imageUrl: "",
      director: "",
      releaseDate: "",
      rating: "",
    });
    setEditMovieId(null);
    setMessage("Movie edited successfully!"); // Hiển thị thông báo khi sửa phim thành công
    setTimeout(() => setMessage(""), 1000); // Xóa thông báo sau 3 giây
  };

  // Xóa tất cả phim
  const handleDeleteÂllMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
    if (editMovieId === id) {
      setNewMovie({ title: "", genre: "", imageUrl: "" });
      setEditMovieId(null);
    }
    setMessage("Movie deleted successfully!"); // Hiển thị thông báo khi xóa phim thành công
    setTimeout(() => setMessage(""), 1000); // Xóa thông báo sau 3 giây
  };
  // Xóa phim
  const handleDeleteMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
    if (editMovieId === id) {
      setNewMovie({ title: "", genre: "", imageUrl: "" });
      setEditMovieId(null);
    }
    setMessage("Movie deleted successfully!"); // Hiển thị thông báo khi xóa phim thành công
    setTimeout(() => setMessage(""), 1000); // Xóa thông báo sau 3 giây
  };

  return (
    <div className="admin-movies-container">
      <h2>Admin Movie Management</h2>

      {/* Thông báo */}
      {message && <div className="success-message">{message}</div>}

      {/* Form Thêm Phim */}
      <div className="movie-form-container">
        <h3>{editMovieId ? "Edit Movie" : "Add New Movie"}</h3>
        <form onSubmit={editMovieId ? handleEditMovie : handleAddMovie}>
          <input
            className="movie-input"
            type="text"
            name="title"
            placeholder="Movie Title"
            value={newMovie.title}
            onChange={handleMovieChange}
            required
          />
          <input
            className="movie-input"
            type="text"
            name="genre"
            placeholder="Genre"
            value={newMovie.genre}
            onChange={handleMovieChange}
            required
          />
          <input
            className="movie-input"
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={newMovie.imageUrl}
            onChange={handleMovieChange}
            required
          />
          <input
            className="movie-input"
            type="text"
            name="director"
            placeholder="Director"
            value={newMovie.director}
            onChange={handleMovieChange}
          />
          <input
            className="movie-input"
            type="date"
            name="releaseDate"
            placeholder="Release Date"
            value={newMovie.releaseDate}
            onChange={handleMovieChange}
          />
          <input
            className="movie-input"
            type="number"
            name="rating"
            placeholder="Rating (1-10)"
            value={newMovie.rating}
            onChange={handleMovieChange}
          />
          {newMovie.imageUrl && (
            <img
              className="movie-preview"
              src={newMovie.imageUrl}
              alt="Preview"
              style={{ width: "100px", height: "auto" }}
            />
          )}
          <button className="submit-button" type="submit">
            {editMovieId ? "Save Changes" : "Add Movie"}
          </button>
        </form>
      </div>

      {/* Liệt kê danh sách phim */}
      <div className="movie-list-container">
        <h3>Movie List</h3>
        <ul>
          {movies.map((movie) => (
            <li key={movie.id} className="movie-list-item">
              {movie.title} - {movie.genre} - {movie.director} -{" "}
              {movie.releaseDate} - Rating: {movie.rating}
              <button
                className="delete-button"
                onClick={() => handleDeleteMovie(movie.id)}
              >
                Delete
              </button>
              <button
                className="edit-button"
                onClick={() => {
                  setEditMovieId(movie.id);
                  setNewMovie({
                    title: movie.title,
                    genre: movie.genre,
                    imageUrl: movie.imageUrl,
                    director: movie.director,
                    releaseDate: movie.releaseDate,
                    rating: movie.rating,
                  });
                }}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminMovies;
