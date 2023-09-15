"use client";
import React from "react";
import Image from "next/image";

import { MyCustomButton } from "../componentindex";
import Style from "./HeroSection.module.css";
import images from "../../../img";

const HeroSection = () => {
  return (
    <div className={Style.heroSection}>
      <div className={Style.heroSection_box}>
        <div className={Style.heroSection_box_left}>
          <h1>Discover, Collect and Sell NFTs</h1>
          <p>
            Discover the most outstanding NFTs on all topics of life. Create
            your NFTs and sell them.
          </p>
          <MyCustomButton btnName="Start Your Search" handleClick={() => {}} />
        </div>
        <div className={Style.heroSection_box_right}>
          <Image
            src={images.hero}
            alt="Hero Section"
            width={600}
            height={600}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
