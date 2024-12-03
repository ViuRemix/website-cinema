import React, { useState, useEffect } from "react";
import "./Profile.css";

const Profile = ({ user }) => {
  // Khởi tạo dữ liệu từ localStorage hoặc từ user
  const initialProfile = JSON.parse(localStorage.getItem("userProfile")) || {
    fullName: user?.displayName || "Tên của bạn",
    nickName: user?.email ? user.email.split("@")[0] : "Tên của bạn",
    gender: "",
    language: "",
    country: "",
    timeZone: "",
    email: user?.email || "Chưa có email",
    avatar:
      user?.photoURL ||
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyOel_Kg6LSBouZjynF0WO9JxBmTQR1KOpRg&s",
  };

  // State lưu thông tin profile
  const [profile, setProfile] = useState(initialProfile);

  // State theo dõi chế độ chỉnh sửa
  const [isEditing, setIsEditing] = useState(false);

  // Cập nhật localStorage mỗi khi profile thay đổi
  useEffect(() => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
  }, [profile]);

  // Hàm xử lý thay đổi giá trị input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // Hàm chuyển đổi giữa chế độ chỉnh sửa và lưu
  const handleEdit = () => {
    if (isEditing) {
      // Lưu lại thông tin khi bấm nút "Lưu"
      localStorage.setItem("userProfile", JSON.stringify(profile));
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={profile.avatar} alt="Avatar" className="profile-avatar" />
        <div className="profile-info">
          <h2>{profile.fullName}</h2>
          <p>{profile.email}</p>
        </div>
        <button
          className="profile-edit-btn btn btn-primary"
          onClick={handleEdit}
        >
          {isEditing ? "Lưu" : "Chỉnh sửa"}
        </button>
      </div>
      <div className="profile-form">
        <div className="profile-row">
          <div className="profile-field">
            <label>Họ và tên</label>
            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="form-control"
            />
          </div>
          <div className="profile-field">
            <label>Tên gọi khác</label>
            <input
              type="text"
              name="nickName"
              value={profile.nickName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="form-control"
            />
          </div>
        </div>
        <div className="profile-row">
          <div className="profile-field">
            <label>Giới tính</label>
            <select
              name="gender"
              value={profile.gender}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="form-select"
            >
              <option value="">Chọn</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </div>
          <div className="profile-field">
            <label>Quốc gia</label>
            <input
              type="text"
              name="country"
              value={profile.country}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="form-control"
            />
          </div>
        </div>
        <div className="profile-row">
          <div className="profile-field">
            <label>Ngôn ngữ</label>
            <select
              name="language"
              value={profile.language}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="form-select"
            >
              <option value="">Chọn</option>
              <option value="english">Tiếng Anh</option>
              <option value="spanish">Tiếng Tây Ban Nha</option>
              <option value="vietnamese">Tiếng Việt</option>
            </select>
          </div>
          <div className="profile-field">
            <label>Múi giờ</label>
            <input
              type="text"
              name="timeZone"
              value={profile.timeZone}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="form-control"
            />
          </div>
        </div>
      </div>
      <div className="profile-email-section">
        <h3>Địa chỉ email của tôi</h3>
        <div className="email-item d-flex justify-content-between">
          <span>{profile.email}</span>
          <small>1 tháng trước</small>
        </div>
        {!isEditing && (
          <button className="add-email-btn btn btn-secondary mt-2">
            + Thêm địa chỉ email
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
