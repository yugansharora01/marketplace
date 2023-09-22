"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

import Style from "../../styles/collection.module.css";
import {
  Banner,
  CollectionProfile,
  NFTCardTwo,
} from "../../CollectionPage/collectionIndex";
import { Slider, Brand } from "../../component/componentindex";
import images from "../../../img";

const collection = () => {
  const searchParams = useSearchParams();
  const passedId = searchParams.get("id");

  const [bannerImage, setBannerImage] = useState(images.creatorbackground1);
  const [collectionData, setCollectionData] = useState({
    image: images.nft_image_1,
    socials: [
      {
        link: "#",
        name: "Linkedin",
      },
      {
        link: "#",
        name: "Website",
      },
      {
        link: "#",
        name: "Twitter",
      },
    ],
    collectionName: "Awesome NFTs Collection",
    collectionDescription:
      "Karafuru is home to 5,555 generative arts where colors reign supreme. Leave the drab reality and enter the world of Karafuru by Museum of Toys.",
    cardArray: [
      {
        Title: "Total Volume",
        data: "$195,4683",
        subData: "-",
      },
      {
        Title: "Floor Price",
        data: "$195,4683",
        subData: "-",
      },
      {
        Title: "Best Offer",
        data: "$195,4683",
        subData: "-",
      },
    ],
  });

  const [NFTArray, setNFTArray] = useState([
    {
      image: images.nft_image_1,
      name: "clone 1",
      price: "2 ETH",
      owner: "MetaRivals",
      timeLeft: "6 hours left",
    },
    {
      image: images.nft_image_2,
      name: "clone 2",
      price: "2 ETH",
      owner: "MetaRivals",
      timeLeft: "6 hours left",
    },
    {
      image: images.nft_image_3,
      name: "clone 3",
      price: "2 ETH",
      owner: "MetaRivals",
      timeLeft: "6 hours left",
    },
    {
      image: images.nft_image_1,
      name: "clone 4",
      price: "2 ETH",
      owner: "MetaRivals",
      timeLeft: "6 hours left",
    },
    {
      image: images.nft_image_2,
      name: "clone 5",
      price: "2 ETH",
      owner: "MetaRivals",
      timeLeft: "6 hours left",
    },
    {
      image: images.nft_image_3,
      name: "clone 6",
      price: "2 ETH",
      owner: "MetaRivals",
      timeLeft: "6 hours left",
    },
    {
      image: images.nft_image_1,
      name: "clone 7",
      price: "2 ETH",
      owner: "MetaRivals",
      timeLeft: "6 hours left",
    },
    {
      image: images.nft_image_2,
      name: "clone 8",
      price: "2 ETH",
      owner: "MetaRivals",
      timeLeft: "6 hours left",
    },
  ]);

  useEffect(() => {
    const GetCollectionData = async () => {
      try {
        const res = await axios.get("/api/Collections", {
          params: {
            id: passedId,
          },
        });
        console.log(res.data.data);
        const ele = res.data.data;
        setCollectionData({
          ...collectionData,
          image: ele.ProfileImage,
          collectionName: ele.CollectionName,
          collectionDescription: ele.Description,
          cardArray: [
            {
              Title: "Total Volume",
              data: ele.TotalVolume + " ETH",
              subData: "-",
            },
            {
              Title: "Floor Price",
              data: "$195,4683",
              subData: "-",
            },
            {
              Title: "Best Offer",
              data: "$195,4683",
              subData: "-",
            },
          ],
        });
        console.log(ele.NFTs);
        setNFTArray([]);
        ele.NFTs.forEach((e, i) => {
          const newData = {
            name: e.Name,
            image: e.MediaLink,
            category: "LOL",
            id: e._id,
            price: e.Price,
            owner: e.Owner,
            timeLeft: e.TimeLeft,
          };
          setNFTArray((oldArray) => [...oldArray, newData]);
          setBannerImage(ele.BannerImage);
        });
        console.log("Success retrieval");
        console.log(res.data);
      } catch (error) {
        console.log("Collection retrieval failed ");
        console.log(error);
      }
    };
    GetCollectionData();
  }, []);

  return (
    <div className={Style.collection}>
      <Banner bannerImage={bannerImage} />
      <CollectionProfile CollectionData={collectionData} />
      <NFTCardTwo NFTData={NFTArray} />
      <Brand />
    </div>
  );
};

export default collection;
