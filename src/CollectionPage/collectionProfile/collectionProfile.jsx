"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialInstagram,
} from "react-icons/ti";

import { BsGlobe } from "react-icons/bs";

//INTERNAL IMPORT
import Style from "./collectionProfile.module.css";

const collectionProfile = ({ CollectionData }) => {
  const resolveSocials = (param) => {
    switch (param) {
      case "Website":
        return <BsGlobe />;
      case "Linkedin":
        return <TiSocialLinkedin />;
      case "Instagram":
        return <TiSocialInstagram />;
      case "Facebook":
        return <TiSocialFacebook />;
      case "Twitter":
        return <TiSocialTwitter />;
      default:
        return "";
    }
  };

  return (
    <div className={Style.collectionProfile}>
      <div className={Style.collectionProfile_box}>
        <div className={Style.collectionProfile_box_left}>
          <img
            src={CollectionData.image}
            alt="nft image"
            className={Style.collectionProfile_box_left_img}
          />

          <div className={Style.collectionProfile_box_left_social}>
            {CollectionData.socials.map((el, i) => (
              <a href={el.link} key={i + 1}>
                {resolveSocials(el.name)}
              </a>
            ))}
          </div>
        </div>

        <div className={Style.collectionProfile_box_middle}>
          <h1>{CollectionData.collectionName}</h1>
          <p>{CollectionData.collectionDescription}</p>

          <div className={Style.collectionProfile_box_middle_box}>
            {CollectionData.cardArray.map((el, i) => (
              <div
                className={Style.collectionProfile_box_middle_box_item}
                key={i + 1}
              >
                <small>{el.Title}</small>
                <p>{el.data}</p>
                <span>{el.subData}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default collectionProfile;
