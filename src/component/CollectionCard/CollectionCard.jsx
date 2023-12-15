"use client";
import React, { useState } from "react";
import Link from "next/link";
import { BsImage } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
//INTERNAL IMPORT
import Style from "./CollectionCard.module.css";

const CollectionCard = ({ CollectionData }) => {
  const [like, setLike] = useState(false);
  const [likeInc, setLikeInc] = useState(0);
  console.log(CollectionData);

  const likeNFT = () => {
    if (!like) {
      setLike(true);
      setLikeInc(likeInc + 1);
    } else {
      setLike(false);
      setLikeInc(likeInc - 1);
    }
  };

  return (
    <div className={Style.CollectionCard_wrapper}>
      <h1>Latest Collections</h1>
      <div className={Style.CollectionCard}>
        {CollectionData.map((el, i) => (
          <Link
            href={{ pathname: "collection", query: { id: `${el.id}` } }}
            key={i + 1}
          >
            <div className={Style.CollectionCard_box} key={i + 1}>
              <div className={Style.CollectionCard_box_like}>
                <div className={Style.CollectionCard_box_like_box}>
                  <div className={Style.CollectionCard_box_like_box_box}>
                    <BsImage
                      className={Style.CollectionCard_box_like_box_box_icon}
                    />
                    <p onClick={() => likeNFT()}>
                      {like ? <AiFillHeart /> : <AiOutlineHeart />}
                      {""}
                      <span>{likeInc}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className={Style.CollectionCard_box_img}>
                <img
                  src={el.BannerImage}
                  alt="NFT"
                  className={Style.CollectionCard_box_img_img}
                />
              </div>

              <div className={Style.CollectionCard_box_info}>
                <div className={Style.CollectionCard_box_info_left}>
                  <p>{el.CollectionName}</p>
                </div>
                <small>{i + 1}</small>
              </div>

              <div className={Style.CollectionCard_box_info}>
                <div className={Style.CollectionCard_box_price_time}>
                  <small>Creator</small>
                  <p>{el.Owner.UserName}</p>
                </div>
                <div className={Style.CollectionCard_box_price_time}>
                  <small>Total Volume</small>
                  <p>{el.totalVolume}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CollectionCard;
