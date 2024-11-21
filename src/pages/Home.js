import React from "react";
import ImageSlider from "../components/shared/ImageSlider";
import Movies from "../components/shared/Movies";
import CustomerForm from "../components/shared/CustomerForm";

const Home = () => {
  return (
    <div>
      <ImageSlider />
      <Movies />

      <CustomerForm />
    </div>
  );
};

export default Home;
