import React from "react";
import Style from "../styles/index.module.css";
import {
  BigNFTSlider,
  Brand,
  Filter,
  HeroSection,
  Services,
  Slider,
  Title,
} from "../component/componentindex";

const Home = () => {
  return (
    <div className={Style.homePage}>
      <HeroSection />
      <BigNFTSlider />
      <Slider />
      <Brand />
    </div>
  );
};

export default Home;
