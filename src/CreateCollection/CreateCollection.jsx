"use client";
import React, { useEffect, useState } from "react";
import { MdOutlineHttp, MdOutlineAttachFile } from "react-icons/md";
import Image from "next/image";
import axios from "axios";

//INTERNAL IMPORT
import Style from "./CreateCollection.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import images from "../../img";
import { Button } from "../component/componentindex";
import { DropZone } from "./CreateCollectionIndex.js";

const CreateCollection = () => {
  const [loading, setLoading] = useState(false);
  const [BannerImage, setBannerImage] = useState("");
  const [ProfileImage, setProfileImage] = useState("");
  const [BannerImageUrl, setBannerImageUrl] = useState("");
  const [ProfileImageUrl, setProfileImageUrl] = useState("");

  const [collection, setCollection] = useState({
    CollectionName: "",
    Owner: "MetaRivals",
    BannerImage:
      "https://ivory-possible-rooster-796.mypinata.cloud/ipfs/QmUwck5p9khT4iYXiWmNZzvb3TAQU46Lyt69aaUwFPiNnm?_gl=1*ka6i6f*_ga*MTEzMjkxNjA4NS4xNjk0NDQ4OTkz*_ga_5RMPXG14TE*MTY5NDYyMTc4NS42LjEuMTY5NDYyMTc4OC41Ny4wLjA.",
    ProfileImage:
      "https://ivory-possible-rooster-796.mypinata.cloud/ipfs/Qmab7dNcGwkvYN2rasWd2v5MSiFajb5YcLwLyxTgCQWx1k?_gl=1*ka6i6f*_ga*MTEzMjkxNjA4NS4xNjk0NDQ4OTkz*_ga_5RMPXG14TE*MTY5NDYyMTc4NS42LjEuMTY5NDYyMTc4OC41Ny4wLjA.",
    Category: "",
    Description: "",
    Chain: "Ethereum",
    Website: "",
    TotalVolume: 0,
    CreatedAt: Date.now(),
  });

  // useEffect(() => {
  //   setCollection({ ...collection, BannerImage: BannerImage });
  //   console.log(collection.BannerImage);
  //   console.log(BannerImage);
  // }, [BannerImage]);

  // useEffect(() => {
  //   setCollection({ ...collection, ProfileImage: ProfileImage });
  //   console.log(collection.ProfileImage);
  //   console.log(ProfileImage);
  // }, [ProfileImage]);

  const OnCreate = async () => {
    try {
      setLoading(true);
      console.log(collection);
      const response = await axios.post("/api/Collections", collection);
      console.log("Success submission " + response.data);
    } catch (error) {
      console.log("Collection submit failed " + error.response.data);
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={Style.upload}>
      <div className={Style.upload_banner}>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="nft">Banner Image IPFS link</label>
          <input
            type="text"
            placeholder="Banner Image"
            value={collection.BannerImage}
            className={formStyle.Form_box_input_userName}
            onChange={(e) =>
              setCollection({ ...collection, BannerImage: e.target.value })
            }
          />
        </div>
      </div>

      <div className={Style.upload_profile}>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="nft">Profile Image IPFS link</label>
          <input
            type="text"
            placeholder="Profile Image"
            value={collection.ProfileImage}
            className={formStyle.Form_box_input_userName}
            onChange={(e) =>
              setCollection({ ...collection, ProfileImage: e.target.value })
            }
          />
        </div>
      </div>

      <div className={Style.upload_box}>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="nft">Collection Name</label>
          <input
            type="text"
            placeholder="Collection Name"
            className={formStyle.Form_box_input_userName}
            onChange={(e) =>
              setCollection({ ...collection, CollectionName: e.target.value })
            }
          />
        </div>

        <div className={formStyle.Form_box_input}>
          <label htmlFor="nft">Category</label>
          <input
            type="text"
            placeholder="Category"
            className={formStyle.Form_box_input_userName}
            onChange={(e) =>
              setCollection({ ...collection, Category: e.target.value })
            }
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
              onChange={(e) =>
                setCollection({ ...collection, Website: e.target.value })
              }
            />
          </div>

          <p className={Style.upload_box_input_para}>
            Ciscrypt will include a link to this URL on this item's detail page,
            so that users can click to learn more about it. You are welcome to
            link to your own webpage with more details.
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
            onChange={(e) =>
              setCollection({ ...collection, Description: e.target.value })
            }
          ></textarea>
          <p>
            The description will be included on the item's detail page
            underneath its image. Markdown syntax is supported.
          </p>
        </div>

        <div className={Style.upload_box_btn}>
          <Button
            btnName="Create"
            handleClick={OnCreate}
            classStyle={Style.upload_box_btn_style}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateCollection;
