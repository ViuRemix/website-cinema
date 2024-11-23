import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ searchMovies }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false); // Trạng thái mic
  const [spokenText, setSpokenText] = useState(""); // Lưu trữ văn bản đã nói
  const [showModal, setShowModal] = useState(false); // Kiểm tra modal hiển thị
  const navigate = useNavigate();

  // Hàm xử lý tìm kiếm chung cho cả Enter và Click
  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      searchMovies(searchQuery);
      navigate(`/search?query=${searchQuery}`);
    }
  };

  // Hàm xử lý khi nhấn Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // Gọi chung hàm handleSearch
    }
  };

  // Tìm kiếm tự động khi người dùng nhập vào ô tìm kiếm
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Tìm kiếm khi có giá trị nhập vào nhưng không điều hướng
    if (query.trim() !== "") {
      searchMovies(query);
    }
  };

  // Hàm nhận diện giọng nói
  const startVoiceSearch = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-US"; // Cài đặt ngôn ngữ cho giọng nói là tiếng Anh

    recognition.onstart = () => {
      setIsListening(true); // Cập nhật trạng thái mic đang mở
      setShowModal(true); // Hiển thị modal khi nhận diện bắt đầu
      setSpokenText(""); // Xóa văn bản cũ
    };

    recognition.onend = () => {
      setIsListening(false); // Cập nhật trạng thái mic tắt khi nhận diện kết thúc
      setShowModal(false); // Ẩn modal khi nhận diện kết thúc
    };

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      console.log("Transcript:", transcript);
      setSpokenText(transcript); // Cập nhật văn bản đã nói
      setSearchQuery(transcript); // Cập nhật văn bản trong ô input
    };

    recognition.start(); // Bắt đầu nhận diện giọng nói
  };

  // Hàm đóng modal
  const closeModal = () => {
    setShowModal(false); // Đóng modal
    setIsListening(false); // Dừng nhận diện giọng nói
  };

  // Sử dụng useEffect để gọi tìm kiếm khi có sự thay đổi trong searchQuery hoặc spokenText
  useEffect(() => {
    if (searchQuery.trim() !== "") {
      searchMovies(searchQuery);
    }
  }, [searchQuery, spokenText]); // Tìm kiếm khi có sự thay đổi trong văn bản

  return (
    <div>
      <div className="input-group mb-3 header-search">
        <input
          type="text"
          className="form-control"
          placeholder="Tìm kiếm phim..."
          value={searchQuery}
          onChange={handleInputChange} // Tìm kiếm khi nhập vào
          onKeyDown={handleKeyDown} // Tìm kiếm khi nhấn Enter
          aria-label="Tìm kiếm phim..."
        />
        <button
          className="btn btn-search"
          type="button"
          onClick={handleSearch} // Tìm kiếm khi nhấn nút tìm kiếm
        >
          <i className="bx bx-search"></i>
        </button>
        <button
          className="btn btn-voice-search"
          type="button"
          onClick={startVoiceSearch} // Khởi động nhận diện giọng nói
        >
          {isListening ? (
            <i className="bi bi-mic-mute"></i> // Biểu tượng mic tắt khi đang nghe
          ) : (
            <i className="bi bi-mic"></i> // Biểu tượng mic khi sẵn sàng nghe
          )}
        </button>
      </div>

      {/* Modal hiển thị khi đang nhận diện giọng nói */}
      {showModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          aria-labelledby="voiceSearchModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="voiceSearchModalLabel">
                  {isListening ? "Đang nghe..." : "Kết quả tìm kiếm giọng nói"}
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={closeModal} // Đóng modal
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </h5>
              </div>
              <div className="modal-body">
                {isListening ? (
                  <p>
                    <i className="bi bi-mic"></i>{" "}
                  </p>
                ) : (
                  <p>Bạn đã nói: {spokenText}</p> // Hiển thị văn bản đã nói
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
