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

const Collection = () => {
  const searchParams = useSearchParams();
  const passedId = searchParams.get("id");

  const [bannerImage, setBannerImage] = useState(
    "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
  );
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
      Price: { amount: "2 ETH", coinName: "", coinAddress: "" },
      owner: "MetaRivals",
      timeLeft: "6 hours left",
    },
    {
      image: images.nft_image_2,
      name: "clone 2",
      Price: { amount: "2 ETH", coinName: "", coinAddress: "" },
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
              //data: ele.TotalVolume + " ETH",
              data: "5.21 ETH",
              subData: "-",
            },
            {
              Title: "Floor Price",
              data: "5 ETH",
              subData: "-",
            },
            {
              Title: "Best Offer",
              data: "4.6 ETH",
              subData: "-",
            },
          ],
        });
        console.log(ele.NFTs);
        setNFTArray([]);
        ele.NFTs.forEach((e, i) => {
          const newData = {
            Name: e.Name,
            MediaLink: e.MediaLink,
            Category: "LOL",
            _id: e._id,
            Price: e.Price,
            Owner: e.Owner,
            TimeLeft: e.TimeLeft,
          };
          setNFTArray((oldArray) => [...oldArray, newData]);
        });
        setBannerImage(ele.BannerImage);
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
      {/**/}
      <CollectionProfile CollectionData={collectionData} />
      <NFTCardTwo NFTData={NFTArray} />
      <Brand />
    </div>
  );
};

export default Collection;
