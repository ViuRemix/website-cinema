import React from "react";
import ImageSlider from "../components/shared/ImageSlider";
import Movies from "../components/shared/Movies";
import CustomerForm from "../components/shared/CustomerForm";
import MoviePopular from "../components/shared/MoviePopular";

const Home = () => {
  return (
    <div>
      <ImageSlider />
      <Movies />
      <MoviePopular />
      <CustomerForm />
    </div>
  );
};

export default Home;
