"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 } from "uuid";

//INTERNAL IMPORT
import DropZone from "@/UIComponents/DropZone/DropZone";
import Style from "./EditProfile.module.css";
import { MyCustomButton } from "../component/componentindex";
import { useUser } from "@/Context/UserProvider";
import DynamicList from "@/UIComponents/DynamicList/DynamicList";
import TextArea from "@/UIComponents/TextArea/TextArea";
import { Socials } from "@/Constants/Constants";
import InputField from "@/UIComponents/InputField/InputField";
import { storeAndDeleteFileFirebase } from "@/Utils/storeFileFirebase";

const EditProfile = () => {
  const [loading, setLoading] = useState(false);
  const [bannerFile, setBannerFile] = useState("");
  const [profileFile, setProfileFile] = useState("");
  const [socialsArray, setSocialsArray] = useState([]);
  const [isBannerUploaded, setIsBannerUploaded] = useState(false);
  const [isProfileUploaded, setIsProfileUploaded] = useState(false);
  const [state, dispatch] = useUser();

  const [user, setUser] = useState({
    UserName: "",
    WalletAddress: "",
    BannerImage: "",
    ProfileImage: "",
    Description: "",
    Socials: [],
  });

  const uploadBanner = async () => {
    if (isBannerUploaded && bannerFile !== "") {
      const url = await storeAndDeleteFileFirebase(
        `images/${state.userData._id}/${bannerFile.name + v4()}`,
        bannerFile,
        user.BannerImage
      );
      setUser((prev) => {
        return { ...prev, BannerImage: url };
      });
      console.log("banner " + url);
    }
  };
  const uploadProfile = async () => {
    if (isProfileUploaded && profileFile !== "") {
      const url = await storeAndDeleteFileFirebase(
        `images/${state.userData._id}/${profileFile.name + v4()}`,
        profileFile,
        user.ProfileImage
      );
      setUser((prev) => {
        return { ...prev, ProfileImage: url };
      });
      console.log("profile " + url);
    }
  };

  const OnSave = async () => {
    console.log(user);
    try {
      setLoading(true);
      const response = await axios.post("/api/UpdateUser", user);
      console.log("Success Update ", response.data);
    } catch (error) {
      console.log("User Update failed ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const temp = [];
    socialsArray.forEach((ele) => {
      const item = { platform: ele.key, link: ele.value };
      temp.push(item);
    });
    setUser({ ...user, Socials: temp });
  }, [socialsArray]);

  useEffect(() => {
    if (state.userData.UserName) {
      setUser(state.userData);
      let array = [];
      state.userData.Socials.forEach((val) => {
        let newField = { key: val.platform, value: val.link };
        array.push(newField);
      });
      setSocialsArray(array);
    }
  }, [state.userData]);

  useEffect(() => {
    uploadBanner();
  }, [bannerFile]);

  useEffect(() => {
    uploadProfile();
  }, [profileFile]);

  return (
    <>
      <div className={Style.Form_box_input}>
        <label htmlFor="nft">Banner Image</label>
        <DropZone
          title="JPG, PNG, WEBM , MAX 100MB"
          setFile={setBannerFile}
          setSuccess={setIsBannerUploaded}
        />
      </div>

      <div className={Style.Form_box_input}>
        <label htmlFor="nft">Profile Image</label>
        <DropZone
          title="JPG, PNG, WEBM , MAX 100MB"
          setFile={setProfileFile}
          setSuccess={setIsProfileUploaded}
        />
      </div>

      <InputField
        label="User Name"
        placeholder="User Name"
        value={user.UserName}
        onChange={(e) => setUser({ ...user, UserName: e.target.value })}
      />

      <DynamicList
        keys={Socials}
        heading={"Socials"}
        array={socialsArray}
        setArray={setSocialsArray}
      />

      <TextArea
        label="Description"
        placeholder="something about collection in few words"
        note="The description will be included on the item's detail page underneath its image. Markdown syntax is supported."
        onChange={(e) => setUser({ ...user, Description: e.target.value })}
      />

      <div className={Style.upload_box_btn}>
        <MyCustomButton
          btnName="Save Changes"
          handleClick={OnSave}
          classStyle={Style.upload_box_btn_style}
        />
      </div>
    </>
  );
};

export default EditProfile;
