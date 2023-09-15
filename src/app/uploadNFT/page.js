"use client";
import React, { useEffect, useState } from "react";
import images from "../../../img";

//INTERNAL IMPORT
import Style from "./upload-nft.module.css";
import { UploadNFT } from "../../UploadNFT/uploadNFTIndex";
import axios from "axios";

const uploadNFT = () => {
  const [collectionArray, setCollectionArray] = useState([]);

  useEffect(() => {
    const GetCollections = async () => {
      try {
        const res = await axios.get("/api/Collections", {
          params: {
            Owner: "MetaRivals",
          },
        });
        console.log(res.data.data);

        res.data.data.forEach((ele) => {
          console.log(ele);
          const newData = {
            Name: ele.Name,
            image: ele.BannerImage,
            category: "LOL",
            id: ele._id,
          };
          setCollectionArray((oldArray) => [...oldArray, newData]);
        });

        console.log("Success retrieval " + res.data);
      } catch (error) {
        console.log("Collection retrieval failed " + error);
        console.log(error.response);
      } finally {
        console.log(collectionArray);
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

export default uploadNFT;
