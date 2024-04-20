"use client";
import React, { useEffect, useState } from "react";
import images from "../../../img";

//INTERNAL IMPORT
import Style from "./upload-nft.module.css";
import UploadNFT from "../../UploadNFT/UploadNFT";
import axios from "axios";
import mongoose from "mongoose";
import { useUser } from "@/Context/UserProvider";

const UploadNFTPage = () => {
  const [collectionArray, setCollectionArray] = useState([]);
  const [state, dispatch] = useUser();

  useEffect(() => {
    const GetCollections = async () => {
      try {
        console.log(state.userData._id)
        const res = await axios.get("/api/Collections", {
          params: {
            owner: state.userData._id,
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
            category: ele.category ? ele.category : "LOL",
            chain: ele.Chain,
            id: ele._id,
          };
          setCollectionArray((oldArray) => [...oldArray, newData]);
        });

        console.log("Success retrieval");
        console.log(res.data);
      } catch (error) {
        console.log("Collection retrieval failed ", error);
        console.log(error.response);
      }
    };
    if (state.userData._id) GetCollections();
  }, [state.userData._id]);

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

        {/* <div className={Style.uploadNFT_box_title}>
          <h2>Image, Video, Audio, or 3D Model</h2>
          <p>
            File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG,
            GLB, GLTF. Max size: 100 MB
          </p>
        </div> */}

        <div className={Style.uploadNFT_box_form}>
          <UploadNFT collectionArray={collectionArray} />
        </div>
      </div>
    </div>
  );
};

export default UploadNFTPage;
