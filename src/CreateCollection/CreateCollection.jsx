"use client";
import React, { useEffect, useState } from "react";
import { MdOutlineHttp, MdOutlineAttachFile } from "react-icons/md";
import Image from "next/image";
import axios from "axios";

//INTERNAL IMPORT
import Style from "./CreateCollection.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import { MyCustomButton } from "../component/componentindex";
import { useUser } from "@/Context/UserProvider";

const CreateCollection = () => {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useUser();

  const [collection, setCollection] = useState({
    CollectionName: "",
    Owner: "MetaRivals",
    BannerImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrCCUOb7jgI-J7qrlrDj2jlmoOsa4PvCyUg0bj9tCusE56o0liRmgwTEFwScxEgt5pugM&usqp=CAU",
    ProfileImage:
      "https://styles.redditmedia.com/t5_2stnc/styles/communityIcon_uyjx15y39lm91.jpg",
    Category: "",
    Description: "",
    Chain: "Ethereum",
    Website: "",
    TotalVolume: 0,
    CreatedAt: Date.now(),
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

  useEffect(() => {
    console.log(state.userData);
    console.log(state.userData._id);
    setCollection({
      ...collection,
      Owner: state.userData._id,
    });
  }, [state.userData]);

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
            onChange={(e) =>
              setCollection({ ...collection, Description: e.target.value })
            }
          ></textarea>
          <p>
            {
              "The description will be included on the item's detail page \nunderneath its image. Markdown syntax is supported."
            }
          </p>
        </div>

        <div className={Style.upload_box_btn}>
          <MyCustomButton
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
