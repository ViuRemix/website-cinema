import React, { useState } from "react";
import "./style/CustomerForm.css";
function CustomerForm() {
  const [question, setQuestion] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim()) {
      setSubmitted(true);
      // Xử lý câu hỏi ở đây (ví dụ: gửi đến server)
      console.log("Customer's question submitted:", question);
      setQuestion(""); // Xóa câu hỏi sau khi gửi
    }
  };

  return (
    <div
      className="customer-inquiry-form"
      style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}
    >
      <h2>Customer Inquiry</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Please enter your question or issue here..."
          value={question}
          onChange={handleInputChange}
          rows="4"
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
      {submitted && (
        <p style={{ color: "green" }}>
          Thank you for your question. We will respond soon!
        </p>
      )}
    </div>
  );
}

export default CustomerForm;
