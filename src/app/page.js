"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import Style from "../styles/index.module.css";
import {
  BigNFTSlider,
  Brand,
  HeroSection,
  Title,
} from "../component/componentindex";

import CollectionCard from "@/component/CollectionCard/CollectionCard";
import images from "../../img";

const Home = () => {
  const [collectionArray, setCollectionArray] = useState([
    {
      image: images.nft_image_1,
      name: "clone 1",
      totalVolume: "2 ETH",
      Owner: { UserName: "MetaRivals" },
      id: "",
    },
    {
      image: images.nft_image_2,
      name: "clone 2",
      totalVolume: "2 ETH",
      Owner: { UserName: "MetaRivals" },
      id: "",
    },
    {
      image: images.nft_image_3,
      name: "clone 3",
      totalVolume: "2 ETH",
      Owner: { UserName: "MetaRivals" },
      id: "",
    },
    {
      image: images.nft_image_1,
      name: "clone 4",
      totalVolume: "2 ETH",
      Owner: { UserName: "MetaRivals" },
      id: "",
    },
    {
      image: images.nft_image_2,
      name: "clone 5",
      totalVolume: "2 ETH",
      Owner: { UserName: "MetaRivals" },
      id: "",
    },
    {
      image: images.nft_image_3,
      name: "clone 6",
      totalVolume: "2 ETH",
      Owner: { UserName: "MetaRivals" },
      id: "",
    },
    {
      image: images.nft_image_1,
      name: "clone 7",
      totalVolume: "2 ETH",
      Owner: { UserName: "MetaRivals" },
      id: "",
    },
    {
      image: images.nft_image_2,
      name: "clone 8",
      totalVolume: "2 ETH",
      Owner: { UserName: "MetaRivals" },
      id: "",
    },
  ]);
  useEffect(() => {
    const GetCollectionData = async () => {
      try {
        const res = await axios.get("/api/LatestCollection", {
          params: {
            sort: 1,
          },
        });
        console.log(res);
        console.log(res.data.data);

        if (res.data.data.length !== 0) setCollectionArray([]);

        res.data.data.forEach((ele) => {
          const newData = {
            ...ele,
          };
          setCollectionArray((oldArray) => [...oldArray, newData]);
        });
        console.log("Success retrieval");
        console.log(res.data);
      } catch (error) {
        console.log("Collection retrieval failed ");
        console.log(error.response);
      }
    };
    GetCollectionData();
  }, []);

  return (
    <div className={Style.homePage}>
      <HeroSection />
      {/**<BigNFTSlider />**/}
      <CollectionCard CollectionData={collectionArray} />
      <Brand />
    </div>
  );
};

export default Home;
