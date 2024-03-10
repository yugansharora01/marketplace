"use client";
import React from "react";

//INTERNAL IMPORT
import Style from "../uploadNFT/upload-nft.module.css";
import { EditProfile } from "../../EditProfile/EditProfileIndex";

const EditProfilePage = () => {
  return (
    <div className={Style.uploadNFT}>
      <div className={Style.uploadNFT_box}>
        <div className={Style.uploadNFT_box_heading}>
          <h1>Edit Your Profile</h1>
          <p>
            You can set preferred display name, create your profile URL and
            manage other personal settings.
          </p>
        </div>
        <div className={Style.uploadNFT_box_form}>
          <EditProfile />
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
