import React from "react";

const PasswordResetForm = ({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  handleResetPassword,
}) => {
  return (
    <form onSubmit={handleResetPassword}>
      <div className="form-group">
        <label>Mật khẩu mới:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Nhập mật khẩu mới"
          required
        />
      </div>
      <div className="form-group">
        <label>Xác nhận mật khẩu:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Xác nhận mật khẩu"
          required
        />
      </div>
      <button className="btn-submit" type="submit">
        Đặt Lại Mật Khẩu
      </button>
    </form>
  );
};

export default PasswordResetForm;
