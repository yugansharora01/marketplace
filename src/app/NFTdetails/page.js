"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

import images from "../../../img";

//INTERNAL IMPORT
import { Category, Brand } from "../../component/componentindex";
import NFTDetailsPage from "../../NFTDetailsPage/NFTDetailsPage";
const NFTDetails = () => {
  const searchParams = useSearchParams();
  const passedId = searchParams.get("id");

  const [NFTData, setNFTData] = useState({
    media: images.nft_image_1.src,
    owner: "",
    creator: "",
    price: 0.005,
    description:
      "Tattooed Kitty Gang (“TKG”) is a collection of 666 badass kitty gangsters, with symbol of tattoos, living in the Proud Kitty Gang (“PKG”) metaverse. Each TKG is an 1/1 ID as gangster member & all the joint rights.",
    traits: "",
    stats: "",
    contractAddress: "0x50f5474724e0ee42d9a4e711ccfb275809fd6d4a",
    tokenId: "100300372864",
    tokenStandard: "ERC-20",
    chain: "sepolia",
    metadata: "",
    lastUpdated: "",
    count: 1,
    createdAt: "",
    collectionId: "",
  });

  useEffect(() => {
    const GetNFTData = async () => {
      try {
        const res = await axios.get("/api/NFTs", {
          params: {
            id: passedId,
          },
        });
        console.log(res.data.data);
        const ele = res.data.data;
        setNFTData({
          name: ele.Name,
          media: ele.MediaLink,
          owner: ele.Owner,
          creator: ele.Creator,
          price: ele.Price,
          description: ele.Description,
          traits: ele.Traits,
          stats: ele.Stats,
          contractAddress: ele.ContractAddress,
          tokenId: ele.TokenID,
          tokenStandard: ele.TokenStandard,
          chain: ele.Chain,
          metadata: ele.Metadata,
          lastUpdated: ele.LastUpdated,
          count: ele.Count,
          createdAt: ele.CreatedAt,
          collectionId: ele.CollectionId,
        });
        console.log("Success retrieval");
        console.log(res.data);
      } catch (error) {
        console.log("Collection retrieval failed ");
        console.log(error);
      }
    };
    GetNFTData();
  }, []);

  return (
    <div>
      <NFTDetailsPage NFTData={NFTData} />
      <Brand />
    </div>
  );
};

export default NFTDetails;
