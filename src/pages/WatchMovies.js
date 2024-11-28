import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./WatchMovie.css"; // Import CSS
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import { useTranslation } from "react-i18next"; // Thêm hook i18n

import ShareModal from "./Sharemovie/ShareModal"; // Đảm bảo đường dẫn đúng
const WatchMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [popularMovies, setPopularMovies] = useState([]); // Phim phổ biến
  const [videos, setVideos] = useState([]); // Videos phim
  const [actors, setActors] = useState(""); // Khởi tạo state cho diễn viên
  const [url, setUrl] = useState(""); // URL cho việc chia sẻ
  const [title, setTitle] = useState(""); // Tiêu đề cho việc chia sẻ
  const apiKey = "ca2ef8efffeadbb2449d15ba0ae016fa"; // Thay bằng API Key của bạn
  const { t } = useTranslation(); // Dịch văn bản

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        // Fetch thông tin chi tiết phim
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
        );
        const data = await response.json();
        setMovie(data);

        // Cập nhật URL và title cho chia sẻ
        setUrl(data.homepage || "");
        setTitle(data.title || ""); // Hoặc "Unknown Title" nếu cần
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

        setPopularMovies(data.results || []);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    const fetchMovieVideos = async () => {
      try {
        // Fetch thông tin video
        const videoResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`
        );
        const videoData = await videoResponse.json();
        setVideos(videoData.results || []); // Lưu danh sách video vào state

        // Fetch thông tin credits (đạo diễn, diễn viên)
        const creditsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`
        );
        const creditsData = await creditsResponse.json();

        // Lọc ra thông tin đạo diễn
        const director = creditsData.crew.find(
          (person) => person.job === "Director"
        );

        // Lọc danh sách diễn viên
        const actorsList = creditsData.cast
          .slice(0, 4)
          .map((actor) => actor.name)
          .join(", ");
        setActors(actorsList); // Lưu danh sách diễn viên vào state

        // Cập nhật lại thông tin đạo diễn vào movie
        setMovie((prevMovie) => ({
          ...prevMovie,
          director: director?.name || t("notAvailable"), // Nếu không có tên đạo diễn thì hiển thị "notAvailable"
        }));
      } catch (error) {
        console.error("Error fetching movie videos and credits:", error);
      }
    };

    fetchMovieDetails();
    fetchPopularMovies(); // Lấy phim phổ biến
    fetchMovieVideos(); // Lấy videos và thông tin credits
  }, [id, apiKey, t]); // Chạy lại khi id thay đổi hoặc khi t (dịch) thay đổi

  if (!movie) return <div>Loading...</div>;

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
      <div className="group-video-list">
        {/* xem phim */}
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

            {/* className cho phần thông tin phim ở dưới */}
            <div className="movie-detail-content">
              <div className="conten-infor">
                <h5 className="movie-title">{movie.title}</h5>
                <div className="movie-rating group-movie">
                  <span className="rating-score">
                    {movie.vote_average
                      ? movie.vote_average.toFixed(1)
                      : "Chưa có đánh giá"}
                  </span>
                  <span className="rating-count">
                    {movie.vote_count ? `(${movie.vote_count})` : "(0)"}
                  </span>

                  {/* làm lưu lại vào này luôn */}
                  <div className="stars">
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>☆</span>
                  </div>
                </div>
                {/* hiển thị thông tin tập phim (số tập, năm sản xuất, quốc gia, mùa phim,  */}
                <p>
                  {movie.release_date
                    ? new Date(movie.release_date).getFullYear()
                    : "N/A"}{" "}
                  • {movie.season_number ? `T${movie.season_number}` : "N/A"} •{" "}
                  {movie.episode_count
                    ? `${movie.episode_count}/${movie.total_episodes} tập`
                    : "Không rõ số tập"}{" "}
                  •{" "}
                  {movie.origin_country
                    ? movie.origin_country.join(", ")
                    : "Không rõ quốc gia"}
                </p>
                {/* phần nội dụng phim */}
                <p className="movie-genre">
                  Nội dung:{" "}
                  {movie.genres[0] ? movie.genres[0].name : "Không có nội dung"}
                </p>
                {/* mô tả phim */}
                <p className="movie-description">
                  <strong>Mô tả:</strong>{" "}
                  {movie.overview ? movie.overview : "Không có mô tả"}
                </p>
              </div>
              {/* Phần bên phải */}
              <div className="movie-info">
                {/* các thôn tin của phim */}
                <div className="movie-details">
                  <div className="movie-actions">
                    <button className="follow-btn">
                      <i class="bi bi-heart" style={{ paddingRight: 12 }}></i>
                      Theo dõi
                    </button>
                    {/* Nút chia sẻ */}
                    <button
                      className=" btn-share-movie"
                      data-bs-toggle="modal"
                      data-bs-target="#shareModal"
                    >
                      <i className="bi bi-share-fill"></i> {t("chia sẻ")}
                    </button>
                    {/* các chia sẻ mạng xã hội */}
                    <ShareModal movie={movie} url={url} title={title} />
                  </div>
                  <div className="movie-information-movie">
                    {/* diễn viên cho phim */}
                    <p>
                      <strong>Diễn viên:</strong>{" "}
                      {actors ? actors : "Chưa có thông tin diễn viên"}
                    </p>

                    <p>
                      <span>Đạo diễn: </span>
                      {movie.director
                        ? movie.director.split(" ")[0]
                        : t("không có sẵn")}
                    </p>
                    {/* thể loại của phim */}
                    <p>
                      <span>Thể loại: </span>
                      {movie.genres.map((genre) => genre.name).join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h1
            style={{
              paddingLeft: "20%",
              marginBottom: 0,
              marginTop: 30,
              color: "red",
              fontSize: 30,
            }}
          >
            <i class="bi bi-exclamation-diamond"></i> Không có video nào cho
            phim này Vui lòng chọn xem khác.
          </h1>
        )}{" "}
        <div className="movie-trailer-movie">
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

                      {/* Kiểm tra và hiển thị genre, nếu không có thì sẽ không hiển thị gì */}
                      {movie.genres && movie.genres.length > 0 && (
                        <p>
                          Genre:{" "}
                          {movie.genres.map((genre) => genre.name).join(", ")}
                        </p>
                      )}
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
        </div>
      </div>
      {/* hiện thông báo */}
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
