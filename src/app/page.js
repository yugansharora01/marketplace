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

import { useWeb3Contract, useMoralis } from "react-moralis";
import addresses from "../../constants/networkMapping.json";
import nftAbi from "../../constants/Nft.json";
import nftMarketplaceAbi from "../../constants/NftMarketplace.json";

import { ConnectButton } from "web3uikit";

const Home = () => {
  const [collectionArray, setCollectionArray] = useState([
    {
      image: images.nft_image_1,
      name: "clone 1",
      totalVolume: "2 ETH",
      owner: "MetaRivals",
      id: "",
    },
    {
      image: images.nft_image_2,
      name: "clone 2",
      totalVolume: "2 ETH",
      owner: "MetaRivals",
      id: "",
    },
    {
      image: images.nft_image_3,
      name: "clone 3",
      totalVolume: "2 ETH",
      owner: "MetaRivals",
      id: "",
    },
    {
      image: images.nft_image_1,
      name: "clone 4",
      totalVolume: "2 ETH",
      owner: "MetaRivals",
      id: "",
    },
    {
      image: images.nft_image_2,
      name: "clone 5",
      totalVolume: "2 ETH",
      owner: "MetaRivals",
      id: "",
    },
    {
      image: images.nft_image_3,
      name: "clone 6",
      totalVolume: "2 ETH",
      owner: "MetaRivals",
      id: "",
    },
    {
      image: images.nft_image_1,
      name: "clone 7",
      totalVolume: "2 ETH",
      owner: "MetaRivals",
      id: "",
    },
    {
      image: images.nft_image_2,
      name: "clone 8",
      totalVolume: "2 ETH",
      owner: "MetaRivals",
      id: "",
    },
  ]);
  const { chainId, account, isWeb3Enabled } = useMoralis();
  const chainString = chainId ? parseInt(chainId).toString() : "31337";
  //const nftAddress = addresses[chainString].NftMarketplace[0];
  const { runContractFunction: getOwner } = useWeb3Contract({
    abi: nftMarketplaceAbi,
    contractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    functionName: "getOwner",
    params: {},
  });
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
            name: ele.CollectionName,
            image: ele.BannerImage,
            owner: ele.Owner,
            totalVolume: ele.TotalVolume,
            category: "category",
            id: ele._id,
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

  const [content, setContent] = useState("Hello");

  const onClickButton = async () => {
    const owner = await getOwner({
      onSuccess: (tx) => {
        console.log("tx :-");
        console.log(tx);
      },
    });
    console.log("owner");
    console.log(owner);
    setContent(owner);
  };

  return (
    <div className={Style.homePage}>
      <button onClick={onClickButton}>{content}</button>
      <ConnectButton />
      <HeroSection />
      {/**<BigNFTSlider />**/}
      <CollectionCard CollectionData={collectionArray} />
      <Brand />
    </div>
  );
};

export default Home;
