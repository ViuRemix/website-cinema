import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  TelegramShareButton,
} from "react-share";
import { useTranslation } from "react-i18next"; // Thêm hook i18n
import "./MovieDetail.css";

import "../i18n";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const { t } = useTranslation(); // Sử dụng hook t để dịch văn bản

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        // Gọi API lấy thông tin chung của phim
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=ca2ef8efffeadbb2449d15ba0ae016fa`
        );
        const movieData = await response.json();

        // Gọi API lấy thông tin đội ngũ làm phim (đạo diễn)
        const creditsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=ca2ef8efffeadbb2449d15ba0ae016fa`
        );
        const creditsData = await creditsResponse.json();

        // Lọc ra thông tin đạo diễn từ danh sách crew
        const director = creditsData.crew.find(
          (person) => person.job === "Director"
        );

        // Kết hợp thông tin phim và đạo diễn
        setMovie({
          ...movieData,
          director: director?.name || t("notAvailable"),
        });
      } catch (error) {
        console.error(t("Error fetching movie details:"), error);
      }
    };

    fetchMovieDetails();
  }, [id, t]);

  if (!movie) {
    return <div>{t("loading...")}</div>; // Hiển thị "Đang tải" theo ngôn ngữ
  }

  const url = window.location.href;
  const title = movie.title;

  return (
    <div className="movie-detail">
      <div className="movie-image">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />
      </div>
      <div className="movie-tittle-right">
        <h1 style={{ fontFamily: '"Lato", sans-serif' }}>
          <b>{movie.title}</b>{" "}
        </h1>
        <div class="container">
          <div className="movie-info row">
            <div className="col-3 order-first">
              <p>
                <span style={{ paddingRight: 8 }}>Đạo diễn:</span>
                {movie.director
                  ? movie.director.split(" ")[0] // Lấy phần đầu tiên của tên đạo diễn
                  : t("notAvailable")}
              </p>
            </div>
            <div className="col order-first">
              <p>
                {" "}
                <span style={{ paddingRight: 8 }}>
                  <i class="bi bi-calendar2-week"></i>
                  {"  "}
                </span>
                {new Date(movie.release_date).getFullYear()}
              </p>
            </div>
            <div className="col-7 order-first">
              <b>
                <span style={{ paddingRight: 8 }}>
                  <i class="bi bi-clock"></i>
                </span>
                {movie.runtime
                  ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
                  : "N/A"}
              </b>
            </div>
            <div className="col-7 order-first">
              <p>
                <span style={{ paddingRight: 8 }}> Thể loại: </span>
                {movie.genres.map((genre) => genre.name).join(", ")}
              </p>
            </div>
          </div>
          <div
            className="movie-description"
            style={{
              textAlign: "left",
              color: "#C0C0C0",
              fontFamily: '"Nanum Gothic",sans-serif"',
            }}
          >
            <p className="movie-overview">{movie.overview}</p>
          </div>
        </div>
        <div className="btn-group-action">
          <button
            className="btn btn-share"
            data-bs-toggle="modal"
            data-bs-target="#shareModal"
          >
            <i className="bi bi-share-fill"></i> {t("chia sẻ")}
          </button>
          <h4>Ngôn ngữ: {movie.spoken_languages[0]?.name}</h4>
          <button
            className="watch-button"
            onClick={() => navigate(`/watch/${id}`)} // Chuyển hướng đến WatchMovie để xem phim
          >
            <i className="bi bi-play-circle-fill"></i>
            Xem phim
          </button>
        </div>

        <div
          className="modal fade"
          id="shareModal"
          tabIndex="-1"
          aria-labelledby="shareModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="shareModalLabel">
                  Chia sẻ phim "{movie.title}"
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="share-buttons flex justify-around">
                  <FacebookShareButton url={url} quote={title}>
                    <button className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                      <i className="bi bi-facebook"></i>
                    </button>
                  </FacebookShareButton>

                  <TwitterShareButton url={url} title={title}>
                    <button className="p-3 bg-blue-400 text-white rounded-full hover:bg-blue-500">
                      <i className="bi bi-twitter"></i>
                    </button>
                  </TwitterShareButton>

                  <WhatsappShareButton url={url} title={title}>
                    <button className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600">
                      <i className="bi bi-whatsapp"></i>
                    </button>
                  </WhatsappShareButton>

                  <EmailShareButton url={url} subject={title} body={url}>
                    <button className="p-3 bg-gray-600 text-white rounded-full hover:bg-gray-700">
                      <i className="bi bi-envelope"></i>
                    </button>
                  </EmailShareButton>

                  <TelegramShareButton url={url} title={title}>
                    <button className="p-3 bg-blue-400 text-white rounded-full hover:bg-blue-500">
                      <i className="bi bi-telegram"></i>
                    </button>
                  </TelegramShareButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
