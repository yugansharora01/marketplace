"use client";
import React, { useEffect, useState } from "react";
import DropZone from "@/UIComponents/DropZone/DropZone";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

//INTERNAL IMPORT
import Style from "./EditProfile.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import { MyCustomButton } from "../component/componentindex";
import { useUser } from "@/Context/UserProvider";
import { storage } from "@/Config/firebase.config";
import DynamicList from "@/UIComponents/DynamicList/DynamicList";
import TextArea from "@/UIComponents/TextArea/TextArea";
import DropDown from "@/UIComponents/DropDown/DropDown";
import { Socials } from "@/Constants/Constants";
import InputField from "@/UIComponents/InputField/InputField";
import storeFileFirebase from "@/Utils/storeFileFirebase";

const EditProfile = () => {
  const [loading, setLoading] = useState(false);
  const [bannerFileUrl, setBannerFileUrl] = useState("");
  const [bannerFile, setBannerFile] = useState("");
  const [profileFileUrl, setProfileFileUrl] = useState("");
  const [profileFile, setProfileFile] = useState("");
  const [state, dispatch] = useUser();

  const [socialsArray, setSocialsArray] = useState([]);
  const [isBannerUploaded, setIsBannerUploaded] = useState(false);
  const [isProfileUploaded, setIsProfileUploaded] = useState(false);

  const [user, setUser] = useState({
    UserName: "",
    WalletAddress: "MetaRivals",
    BannerImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrCCUOb7jgI-J7qrlrDj2jlmoOsa4PvCyUg0bj9tCusE56o0liRmgwTEFwScxEgt5pugM&usqp=CAU",
    ProfileImage:
      "https://styles.redditmedia.com/t5_2stnc/styles/communityIcon_uyjx15y39lm91.jpg",
    Description: "",
    Socials: [],
  });

  const OnCreate = async () => {
    try {
      console.log("HI");
      console.log(user);
      setLoading(true);
      const response = await axios.post("/api/UpdateUser", user);
      console.log("Success Update ");
      console.log(response.data);
    } catch (error) {
      console.log("User Update failed ");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const OnSave = async () => {
    console.log(user);
    if (isBannerUploaded && bannerFile !== "") {
      await storeFileFirebase(
        `images/${state.userData._id}/${bannerFile.name + v4()}`,
        bannerFile,
        (url) => {
          setUser({ ...user, BannerImage: url });
          setBannerFileUrl(url);
          console.log("banner " + url);
        }
      );
    }
    if (isProfileUploaded && profileFile !== "") {
      await storeFileFirebase(
        `images/${state.userData._id}/${profileFile.name + v4()}`,
        profileFile,
        (url) => {
          setUser({ ...user, ProfileImage: url });
          setProfileFileUrl(url);
          console.log("profile " + url);
        }
      );
    }
    await OnCreate();
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
    setUser(state.userData);
    console.log(state.userData);
  }, [state.userData]);

  return (
    <div className={Style.upload}>
      <div className={Style.upload_banner}>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="nft">Banner Image</label>
          <DropZone
            title="JPG, PNG, WEBM , MAX 100MB"
            setFile={setBannerFile}
            setFileUrl={setBannerFileUrl}
            setSuccess={setIsBannerUploaded}
          />
        </div>
      </div>

      <div className={Style.upload_profile}>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="nft">Profile Image</label>
          <DropZone
            title="JPG, PNG, WEBM , MAX 100MB"
            setFile={setProfileFile}
            setFileUrl={setProfileFileUrl}
            setSuccess={setIsProfileUploaded}
          />
        </div>
      </div>

      <div className={Style.upload_box}>
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
      </div>
    </div>
  );
};

export default EditProfile;
