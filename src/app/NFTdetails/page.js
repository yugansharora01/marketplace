"use client";
import React from "react";

//INTERNAL IMPORT
import { Category, Brand } from "../../component/componentindex";
import NFTDetailsPage from "../../NFTDetailsPage/NFTDetailsPage";
const NFTDetails = () => {
  return (
    <div>
      <NFTDetailsPage />
      <Category />
      <Brand />
    </div>
  );
};

export default NFTDetails;
