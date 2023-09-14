"use client";
import React, { useEffect, useState } from "react";
import { MdOutlineHttp } from "react-icons/md";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { TiTick } from "react-icons/ti";

//INTERNAL IMPORT
import Style from "./Upload.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import images from "../../img";
import { Button } from "../component/componentindex";
import { DropZone } from "./uploadNFTIndex.js";
import axios from "axios";
import DynamicList from "./DynamicList/DynamicList";

const UploadNFT = ({ collectionArray, setId }) => {
  const [active, setActive] = useState(0);
  const [traitArray, setTraitArray] = useState([]);
  const [statArray, setStatArray] = useState([]);
  const [selectedId, setSelectedId] = useState("");

  const [nftData, setNftData] = useState({
    Name: "",
    MediaLink:
      "https://ivory-possible-rooster-796.mypinata.cloud/ipfs/QmNrATouMgx9czM2co8YRBNdp5qTpmN8rmUgP4tonKsfuE?pinataGatewayToken=",
    ContractAddress: "",
    TokenID: "",
    TokenStandard: "ERC-20",
    Chain: "",
    Metadata: "",
    LastUpdated: Date.now(),
    Stats: [],
    Traits: [],
    Count: 0,
    Description: "",
    CreatedAt: Date.now(),
    CollectionID: "",
  });

  const OnUpload = async () => {
    try {
      console.log("nftData:");
      console.log(nftData);
      const response = await axios.post("/api/NFTs", nftData);
      console.log("Success upload " + response.data);
      setNftData({
        Name: "",
        MediaLink:
          "https://ivory-possible-rooster-796.mypinata.cloud/ipfs/QmNrATouMgx9czM2co8YRBNdp5qTpmN8rmUgP4tonKsfuE?pinataGatewayToken=",
        ContractAddress: "",
        TokenID: "",
        TokenStandard: "ERC-20",
        Chain: "",
        Metadata: "",
        LastUpdated: Date.now(),
        Stats: [],
        Traits: [],
        Count: 0,
        Description: "",
        CreatedAt: Date.now(),
        CollectionID: "",
      });
    } catch (error) {
      console.log("NFT upload failed " + error.data);
      console.log(error);
    }
  };

  useEffect(() => {
    setNftData({
      ...nftData,
      Stats: statArray,
      Traits: traitArray,
    });
  }, [statArray, traitArray]);

  return (
    <div className={Style.upload}>
      <div className={Style.upload_box}>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="nft">NFT media IPFS link</label>
          <input
            type="text"
            placeholder="Profile Image"
            value={nftData.MediaLink}
            className={formStyle.Form_box_input_userName}
            onChange={(e) =>
              setNftData({ ...nftData, MediaLink: e.target.value })
            }
          />
        </div>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="nft">Item Name</label>
          <input
            type="text"
            placeholder="Item Name"
            className={formStyle.Form_box_input_userName}
            onChange={(e) => setNftData({ ...nftData, Name: e.target.value })}
          />
        </div>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="nft">Metadata</label>
          <input
            type="text"
            placeholder="Metadata"
            className={formStyle.Form_box_input_userName}
            onChange={(e) =>
              setNftData({ ...nftData, Metadata: e.target.value })
            }
          />
        </div>

        <DynamicList
          heading={"Trait"}
          array={traitArray}
          setArray={setTraitArray}
        />
        <DynamicList
          heading={"Stat"}
          array={statArray}
          setArray={setStatArray}
        />

        <div className={formStyle.Form_box_input}>
          <label htmlFor="description">Description</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="6"
            placeholder="something about yourself in few words"
            onChange={(e) =>
              setNftData({ ...nftData, Description: e.target.value })
            }
          ></textarea>
          <p>
            The description will be included on the item's detail page
            underneath its image. Markdown syntax is supported.
          </p>
        </div>

        <div className={formStyle.Form_box_input}>
          <label htmlFor="name">Choose collection</label>
          <p className={Style.upload_box_input_para}>
            Choose an exiting collection or create a new one
          </p>

          <div className={Style.upload_box_slider_div}>
            {collectionArray.map((el, i) => (
              <div
                className={`${Style.upload_box_slider} ${
                  active == i + 1 ? Style.active : ""
                }`}
                key={i + 1}
                onClick={() => (
                  setActive(i + 1),
                  setNftData({ ...nftData, CollectionID: el.id })
                )}
              >
                <div className={Style.upload_box_slider_box}>
                  <div className={Style.upload_box_slider_box_img}>
                    <img
                      src={el.image}
                      alt="background image"
                      width={70}
                      height={70}
                      onClick={() =>
                        setNftData({ ...nftData, CollectionID: el.id })
                      }
                      className={Style.upload_box_slider_box_img_img}
                    />
                  </div>
                  <div className={Style.upload_box_slider_box_img_icon}>
                    <TiTick />
                  </div>
                </div>
                <p>Crypto Legend - {el.category} </p>
              </div>
            ))}
          </div>
        </div>

        <div className={Style.upload_box_btn}>
          <Button
            btnName="Upload"
            handleClick={OnUpload}
            classStyle={Style.upload_box_btn_style}
          />
          <Button
            btnName="Preview"
            handleClick={() => {}}
            classStyle={Style.upload_box_btn_style}
          />
        </div>
      </div>
    </div>
  );
};

export default UploadNFT;
