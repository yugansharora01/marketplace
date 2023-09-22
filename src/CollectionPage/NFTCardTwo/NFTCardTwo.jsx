"use client";
import React, { useState } from "react";
import Link from "next/link";
import { BsImage } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";

//INTERNAL IMPORT
import Style from "./NFTCardTwo.module.css";

const NFTCardTwo = ({ NFTData }) => {
  const [like, setLike] = useState(false);
  const [likeInc, setLikeInc] = useState(0);

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
    <div className={Style.NFTCardTwo}>
      {NFTData.map((el, i) => (
        <Link href={{ pathname: "NFTdetails", query: { id: el.id } }}>
          <div className={Style.NFTCardTwo_box} key={i + 1}>
            <div className={Style.NFTCardTwo_box_like}>
              <div className={Style.NFTCardTwo_box_like_box}>
                <div className={Style.NFTCardTwo_box_like_box_box}>
                  <BsImage className={Style.NFTCardTwo_box_like_box_box_icon} />
                  <p onClick={() => likeNFT()}>
                    {like ? <AiFillHeart /> : <AiOutlineHeart />}
                    {""}
                    <span>{likeInc}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className={Style.NFTCardTwo_box_img}>
              <img
                src={el.image}
                alt="NFT"
                className={Style.NFTCardTwo_box_img_img}
              />
            </div>

            <div className={Style.NFTCardTwo_box_info}>
              <div className={Style.NFTCardTwo_box_info_left}>
                <p>{el.name}</p>
              </div>
              <small>4{i + 2}</small>
            </div>

            <div className={Style.NFTCardTwo_box_price}>
              <div className={Style.NFTCardTwo_box_price_box}>
                <small>Current Bid</small>
                <p>{el.price} ETH</p>
              </div>
              <div className={Style.NFTCardTwo_box_price_stock}>
                {el.timeLeft ? (
                  <div>
                    <MdTimer />
                    <span>{el.timeLeft}</span>
                  </div>
                ) : (
                  <div className={Style.NFTCardTwo_box_price_stock_owner}>
                    <p>Creator</p>
                    <span>{el.owner}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NFTCardTwo;
