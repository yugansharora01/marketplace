"use client";
import React from "react";

import Style from "../../styles/collection.module.css";
import {
  Banner,
  CollectionProfile,
  NFTCardTwo,
} from "../../CollectionPage/collectionIndex";
import { Slider, Brand } from "../../component/componentindex";
import images from "../../../img";

const collection = () => {
  const collectionArray = [
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
  ];
  return (
    <div className={Style.collection}>
      <Banner bannerImage={images.creatorbackground1} />
      <CollectionProfile />
      <NFTCardTwo NFTData={collectionArray} />
      <Slider />
      <Brand />
    </div>
  );
};

export default collection;
