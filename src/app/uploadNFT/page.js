"use client";
import React, { useEffect, useState } from "react";
import images from "../../../img";

//INTERNAL IMPORT
import Style from "./upload-nft.module.css";
import { UploadNFT } from "../../UploadNFT/uploadNFTIndex";
import axios from "axios";

const UploadNFTPage = () => {
  const [collectionArray, setCollectionArray] = useState([]);

  useEffect(() => {
    const GetCollections = async () => {
      try {
        const res = await axios.get("/api/Collections", {
          params: {
            owner: "MetaRivals",
            id: null,
            sort: null,
            limit: null,
          },
        });
        console.log(res.data.data);

        res.data.data.forEach((ele) => {
          const newData = {
            Name: ele.CollectionName,
            image: ele.BannerImage,
            category: "LOL",
            chain: ele.Chain,
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
    GetCollections();
  }, []);

  return (
    <div className={Style.uploadNFT}>
      <div className={Style.uploadNFT_box}>
        <div className={Style.uploadNFT_box_heading}>
          <h1>Create New NFT</h1>
          <p>
            You can set preferred display name, create your profile URL and
            manage other personal settings.
          </p>
        </div>

        <div className={Style.uploadNFT_box_title}>
          <h2>Image, Video, Audio, or 3D Model</h2>
          <p>
            File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG,
            GLB, GLTF. Max size: 100 MB
          </p>
        </div>

        <div className={Style.uploadNFT_box_form}>
          <UploadNFT collectionArray={collectionArray} />
        </div>
      </div>
    </div>
  );
};

export default UploadNFTPage;
