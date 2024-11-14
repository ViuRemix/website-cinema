import React, { useState, useEffect } from 'react';
import './style/ImageSlider.css';

// Import các ảnh từ thư mục assets
import image1 from '../assets/quangcao1.jpg';
import image2 from '../assets/quangcao2.jpeg';
import image3 from '../assets/quangcao3.jpg';

const images = [image1, image2, image3];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Hàm chuyển sang ảnh tiếp theo
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Hàm chuyển về ảnh trước
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Sử dụng useEffect để tạo hiệu ứng trượt tự động
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Chuyển ảnh sau mỗi 3 giây
    return () => clearInterval(interval); // Xóa interval khi component unmount
  }, []);

  return (
    <div className="slider">
      <button className="prev" onClick={prevSlide}>❮</button>
      <img src={images[currentIndex]} alt="slideshow" className="slide-image" />
      <button className="next" onClick={nextSlide}>❯</button>
    </div>
  );
};

export default ImageSlider;
