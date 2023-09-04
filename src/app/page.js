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
      <Services />
      <BigNFTSlider />
      <Title
        heading="Featured NFTs"
        paragraph="Discover the most outstanding NFTs in all topics of life"
      />
      <Filter />
      <Slider />
      <Brand />
    </div>
  );
};

export default Home;
