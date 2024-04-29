"use client";
import React from "react";

//INTERNAL IMPORT
import Style from "../uploadNFT/upload-nft.module.css";
import CreateCollection from "../../CreateCollection/CreateCollection";

const CreateCollectionPage = () => {
  return (
    <div className={Style.uploadNFT}>
      <div className={Style.uploadNFT_box}>
        <div className={Style.uploadNFT_box_heading}>
          <h1>Create New Collection</h1>
          <p>
            You can set preferred display name, create your profile URL and
            manage other personal settings.
          </p>
        </div>
        <div className={Style.uploadNFT_box_form}>
          <CreateCollection />
        </div>
      </div>
    </div>
  );
};

export default CreateCollectionPage;
