import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BsImages } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

//INTERNAL IMPORT
import Style from "./NFTDetailsImg.module.css";
import images from "../../../img";

const NFTDetailsImg = ({ NFTData }) => {
  const [description, setDescription] = useState(true);
  const [details, setDetails] = useState(true);
  const [traits, setTraits] = useState(true);
  const [stats, setStats] = useState(true);

  const [like, setLike] = useState(false);

  console.log("NFTData");
  console.log(NFTData);

  const open = (val) => {
    if (val == "stats") {
      setStats(!stats);
    } else {
      if (val == "traits") {
        setTraits(!traits);
      } else {
        if (val == "details") {
          setDetails(!details);
        } else {
          if (val == "description") {
            setDescription(!description);
          }
        }
      }
    }
  };

  const likeNFT = () => {
    if (!like) {
      setLike(true);
    } else {
      setLike(false);
    }
  };

  return (
    <div className={Style.NFTDetailsImg}>
      <div className={Style.NFTDetailsImg_box}>
        <div className={Style.NFTDetailsImg_box_NFT}>
          <div className={Style.NFTDetailsImg_box_NFT_like}>
            <BsImages className={Style.NFTDetailsImg_box_NFT_like_icon} />
            <p onClick={() => likeNFT()}>
              {like ? (
                <AiOutlineHeart
                  className={Style.NFTDetailsImg_box_NFT_like_icon}
                />
              ) : (
                <AiFillHeart
                  className={Style.NFTDetailsImg_box_NFT_like_icon}
                />
              )}
              <span>23</span>
            </p>
          </div>

          <div className={Style.NFTDetailsImg_box_NFT_img}>
            <img
              src={images.nft_image_1.src}
              className={Style.NFTDetailsImg_box_NFT_img_img}
              alt="NFT image"
              width={700}
              height={800}
            />
          </div>
        </div>

        {/*description*/}
        <div
          className={Style.NFTDetailsImg_box_description}
          onClick={() => open("description")}
        >
          <p>Description</p>
          {description ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
        </div>

        {description && (
          <div className={Style.NFTDetailsImg_box_description_box}>
            <p>{NFTData.description}</p>
          </div>
        )}

        {/*Traits*/}
        {NFTData.traits.length > 0 ? (
          <div>
            <div
              className={Style.NFTDetailsImg_box_details}
              onClick={() => open("traits")}
            >
              <p>Traits</p>
              {traits ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
            </div>

            {traits && (
              <div className={Style.NFTDetailsImg_box_details_box}>
                {NFTData.traits.map((el, i) => (
                  <div
                    className={Style.NFTDetailsImg_box_details_box_box}
                    key={i + 1}
                  >
                    <span
                      className={Style.NFTDetailsImg_box_details_box_box_key}
                    >
                      {el.key} -&nbsp;
                    </span>
                    <span
                      className={Style.NFTDetailsImg_box_details_box_box_value}
                    >
                      {el.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          ""
        )}

        {/*Stats*/}
        {NFTData.stats.length > 0 ? (
          <div>
            <div
              className={Style.NFTDetailsImg_box_details}
              onClick={() => open("stats")}
            >
              <p>stats</p>
              {stats ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
            </div>

            {stats && (
              <div className={Style.NFTDetailsImg_box_details_box}>
                {NFTData.stats.map((el, i) => (
                  <div
                    className={Style.NFTDetailsImg_box_details_box_box}
                    key={i + 1}
                  >
                    <span
                      className={Style.NFTDetailsImg_box_details_box_box_key}
                    >
                      {el.key} -&nbsp;
                    </span>
                    <span
                      className={Style.NFTDetailsImg_box_details_box_box_value}
                    >
                      {el.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          ""
        )}

        {/*details*/}
        <div
          className={Style.NFTDetailsImg_box_details}
          onClick={() => open("details")}
        >
          <p>Details</p>
          {details ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
        </div>

        {details && (
          <div className={Style.NFTDetailsImg_box_details_box}>
            <div className={Style.NFTDetailsImg_box_details_box_box}>
              <span className={Style.NFTDetailsImg_box_details_box_box_key}>
                Contract Address -&nbsp;
              </span>
              <span className={Style.NFTDetailsImg_box_details_box_box_value}>
                {NFTData.contractAddress}
              </span>
            </div>
            <div className={Style.NFTDetailsImg_box_details_box_box}>
              <span className={Style.NFTDetailsImg_box_details_box_box_key}>
                Token ID -&nbsp;
              </span>
              <span className={Style.NFTDetailsImg_box_details_box_box_value}>
                {NFTData.tokenId}
              </span>
            </div>
            <div className={Style.NFTDetailsImg_box_details_box_box}>
              <span className={Style.NFTDetailsImg_box_details_box_box_key}>
                Token Standard -&nbsp;
              </span>
              <span className={Style.NFTDetailsImg_box_details_box_box_value}>
                {NFTData.tokenStandard}
              </span>
            </div>
            <div className={Style.NFTDetailsImg_box_details_box_box}>
              <span className={Style.NFTDetailsImg_box_details_box_box_key}>
                Chain -&nbsp;
              </span>
              <span className={Style.NFTDetailsImg_box_details_box_box_value}>
                {NFTData.chain}
              </span>
            </div>
            <div className={Style.NFTDetailsImg_box_details_box_box}>
              <div className={Style.NFTDetailsImg_box_details_box_box_key}>
                Last updated -&nbsp;
              </div>
              <div className={Style.NFTDetailsImg_box_details_box_box_value}>
                {NFTData.lastUpdated}
              </div>
            </div>
            {NFTData.creatorEarning ? (
              <div className={Style.NFTDetailsImg_box_details_box_box}>
                <div className={Style.NFTDetailsImg_box_details_box_box_key}>
                  Creator Earning -&nbsp;
                </div>
                <div className={Style.NFTDetailsImg_box_details_box_box_value}>
                  {NFTData.creatorEarning}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTDetailsImg;
