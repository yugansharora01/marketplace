"use client";
import React, { useEffect, useState } from "react";
import { MdOutlineHttp, MdOutlineAttachFile } from "react-icons/md";
import { DropZone } from "./EditProfileIndex";
import axios from "axios";
import images from "../../img/index";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

//INTERNAL IMPORT
import Style from "./EditProfile.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import { MyCustomButton } from "../component/componentindex";
import { useUser } from "@/Context/UserProvider";
import { storage } from "@/Config/firebase.config";

const EditProfile = () => {
  const [loading, setLoading] = useState(false);
  const [bannerFileUrl, setBannerFileUrl] = useState("");
  const [bannerFile, setBannerFile] = useState("");
  const [profileFileUrl, setProfileFileUrl] = useState("");
  const [profileFile, setProfileFile] = useState("");
  const [state, dispatch] = useUser();

  let isBannerUploaded = false,
    isProfileUploaded = false;

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
      setLoading(true);
      console.log(collection);
      const response = await axios.post("/api/Collections", collection);
      console.log("Success submission ");
      console.log(response.data);
    } catch (error) {
      console.log("Collection submit failed ");
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };

  const OnSave = async () => {
    if (bannerFile == null || profileFile == null) return;
    const bannerImage = ref(
      storage,
      `images/${state.userData._id}/${bannerFile.name + v4()}`
    );
    const profileImage = ref(
      storage,
      `images/${state.userData._id}/${profileFile.name + v4()}`
    );
    uploadBytes(bannerImage, bannerFile).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setBannerFileUrl(url);
        isBannerUploaded = true;
        console.log("banner " + url);
      });
    });
    uploadBytes(profileImage, profileFile).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setProfileFileUrl(url);
        isProfileUploaded = true;
        console.log("profile " + url);
      });
    });
  };

  useEffect(() => {
    if (isBannerUploaded && isProfileUploaded) {
    }
  }, [isBannerUploaded, isProfileUploaded]);

  return (
    <div className={Style.upload}>
      <div className={Style.upload_banner}>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="nft">Banner Image</label>
          <DropZone
            title="JPG, PNG, WEBM , MAX 100MB"
            setFile={setBannerFile}
            setFileUrl={setBannerFileUrl}
            image={images.upload}
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
            image={images.upload}
          />
        </div>
      </div>

      <div className={Style.upload_box}>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="nft">User Name</label>
          <input
            type="text"
            placeholder="Collection Name"
            className={formStyle.Form_box_input_userName}
            onChange={(e) => setUser({ ...user, UserName: e.target.value })}
          />
        </div>

        <div className={formStyle.Form_box_input}>
          <label htmlFor="nft">Category</label>
          <input
            type="text"
            placeholder="Category"
            className={formStyle.Form_box_input_userName}
            onChange={(e) => setUser({ ...user, Category: e.target.value })}
          />
        </div>

        <div className={formStyle.Form_box_input}>
          <label htmlFor="website">website</label>
          <div className={formStyle.Form_box_input_box}>
            <div className={formStyle.Form_box_input_box_icon}>
              <MdOutlineHttp />
            </div>

            <input
              type="text"
              placeholder="website"
              onChange={(e) => setUser({ ...user, Website: e.target.value })}
            />
          </div>

          <p className={Style.upload_box_input_para}>
            {
              "Ciscrypt will include a link to this URL on this item's detail \npage, so that users can click to learn more about it. You are \nwelcome to link to your own webpage with more details."
            }
          </p>
        </div>

        <div className={formStyle.Form_box_input}>
          <label htmlFor="description">Description</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="6"
            placeholder="something about collection in few words"
            onChange={(e) => setUser({ ...user, Description: e.target.value })}
          ></textarea>
          <p>
            {
              "The description will be included on the item's detail page \nunderneath its image. Markdown syntax is supported."
            }
          </p>
        </div>

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
