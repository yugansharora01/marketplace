"use client";
import React, { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
} from "@nextui-org/react";

//INTERNAL IMPORT
import Style from "./Upload.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import { MyCustomButton } from "../component/componentindex";
import axios from "axios";
import DynamicList from "./DynamicList/DynamicList";

const UploadNFT = ({ collectionArray }) => {
  const [active, setActive] = useState(0);
  const [traitArray, setTraitArray] = useState([]);
  const [statArray, setStatArray] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(new Set(["Chain"]));
  const [chainsArray, setChainsArray] = useState([
    {
      data: "mainnet",
    },
    {
      data: "sepolia",
    },
  ]);

  const [nftData, setNftData] = useState({
    Name: "",
    Owner: "MetaRivals",
    Price: 1,
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
      console.log("NFT upload failed " + error.response);
      console.log(error.response);
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedKeys.currentKey != "Chain") {
      setNftData({
        ...nftData,
        Chain: selectedKeys.currentKey,
      });
    }
  }, [selectedKeys]);

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
          <label htmlFor="IPFS link">NFT media IPFS link</label>
          <input
            type="text"
            id="IPFS link"
            placeholder="Profile Image"
            value={nftData.MediaLink}
            className={formStyle.Form_box_input_userName}
            onChange={(e) =>
              setNftData({ ...nftData, MediaLink: e.target.value })
            }
          />
        </div>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="Name">Item Name</label>
          <input
            type="text"
            id="Name"
            placeholder="Item Name"
            className={formStyle.Form_box_input_userName}
            onChange={(e) => setNftData({ ...nftData, Name: e.target.value })}
          />
        </div>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="Metadata">Metadata</label>
          <input
            id="Metadata"
            type="text"
            placeholder="Metadata"
            className={formStyle.Form_box_input_userName}
            onChange={(e) =>
              setNftData({ ...nftData, Metadata: e.target.value })
            }
          />
        </div>

        <div className={Style.upload_box_dropdown}>
          <h1> Chain : </h1>
          <div className={Style.upload_box_dropdown_dropdown}>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered">{selectedKeys}</Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Static Actions"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
              >
                {chainsArray.map((el, i) => (
                  <DropdownItem
                    key={el.key ? el.key : el.data}
                    className={el.class}
                    color={el.color}
                  >
                    {el.data}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
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
            id="description"
            cols="30"
            rows="6"
            placeholder="something about yourself in few words"
            className={formStyle.Form_box_input_textarea}
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
          <label>Choose collection</label>
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
                <p>
                  {el.Name} - {el.category}{" "}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className={Style.upload_box_btn}>
          <MyCustomButton
            btnName="Upload"
            handleClick={OnUpload}
            classStyle={Style.upload_box_btn_style}
          />
          <MyCustomButton
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
