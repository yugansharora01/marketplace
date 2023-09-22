"use client";
import React from "react";

//INTERNAL IMPORT
import Style from "./Banner.module.css";

const Banner = ({ bannerImage }) => {
  return (
    <div className={Style.banner}>
      <div className={Style.banner_img}>
        <img src={bannerImage} alt="background" className={Style.img} />
      </div>

      <div className={Style.banner_img_mobile}>
        <img
          src={bannerImage}
          alt="background"
          width={1600}
          height={900}
          className={Style.img}
        />
      </div>
    </div>
  );
};

export default Banner;
