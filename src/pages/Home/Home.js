import React from "react";
import ImageSlider from "../../components/Body/ImageSlider";
import Movies from "../../components/Body/Movies";
import CustomerForm from "../../components/Body/CustomerForm";
import MoviePopular from "../../components/Body/MoviePopular";

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
