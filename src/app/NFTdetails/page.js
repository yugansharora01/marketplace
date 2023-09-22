"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

//INTERNAL IMPORT
import { Category, Brand } from "../../component/componentindex";
import NFTDetailsPage from "../../NFTDetailsPage/NFTDetailsPage";
const NFTDetails = () => {
  const searchParams = useSearchParams();
  const passedId = searchParams.get("id");

  const [NFTData, setNFTData] = useState({
    media: "",
    owner: "",
    creator: "",
    price: "",
    description: "",
    traits: "",
    stats: "",
    contractAddress: "",
    tokenId: "",
    tokenStandard: "",
    chain: "",
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
          tokenId: ele.TokenId,
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
