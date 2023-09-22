"use client";
import React from "react";
import { motion } from "framer-motion";

//INTERNAL IMPORT
import Style from "./SliderCard.module.css";

const SliderCard = ({ data }) => {
  return (
    <motion.div className={Style.sliderCard}>
      <div className={Style.sliderCard_box}>
        <motion.div className={Style.sliderCard_box_img}>
          <img
            src={data.background}
            className={Style.sliderCard_box_img_img}
            alt="slider profile"
            objectFit="cover"
          />
        </motion.div>
        <div className={Style.sliderCard_box_title}>
          <p>{data.name}</p>
          <div className={Style.sliderCard_box_title_like}>
            {/* <LikeProfile /> */}
            <small>1 0f {data.count}</small>
          </div>
        </div>

        <div className={Style.sliderCard_box_price}>
          <div className={Style.sliderCard_box_price_box}>
            <small>Current Bid</small>
            <p>{data.price}</p>
          </div>
          {data.timeLeft != "" ? (
            <div className={Style.sliderCard_box_price_time}>
              <small>Remaining time</small>
              <p>{data.timeLeft}</p>
            </div>
          ) : (
            <div className={Style.sliderCard_box_price_time}>
              <small>Creator</small>
              <p>{data.owner}</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SliderCard;
