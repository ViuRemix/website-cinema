import React from "react";

const EmailForm = ({ email, setEmail, handleSendEmail }) => {
  return (
    <form onSubmit={handleSendEmail}>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Nhập email của bạn"
          required
        />
      </div>
      <button className="btn-submit" type="submit">
        Gửi Mã Xác Nhận
      </button>
    </form>
  );
};

export default EmailForm;
