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
import axios from "axios";

//INTERNAL IMPORT
import Style from "./Upload.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import { MyCustomButton } from "../component/componentindex";
import { useUser } from "@/Context/UserProvider";
import TextArea from "@/UIComponents/TextArea/TextArea";
import InputField from "@/UIComponents/InputField/InputField";
import DynamicList from "@/UIComponents/DynamicList/DynamicList";
import NFTMinting from "./NFTMinting";

const { ethers } = require("ethers");

const UploadNFT = ({ collectionArray }) => {
  const [account, setAccount] = useState("");
  const [active, setActive] = useState(0);
  const [traitArray, setTraitArray] = useState([]);
  const [statArray, setStatArray] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(new Set(["sepolia"]));
  const [chainsArray, setChainsArray] = useState([
    {
      data: "mainnet",
    },
    {
      data: "sepolia",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);

  const [state, dispatch] = useUser();

  const [nftData, setNftData] = useState({
    Name: "",
    Owner: state.userData._id,
    Price: {
      amount: 0,
      coinName: "weth",
      coinAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    },
    MediaLink:
      "https://miro.medium.com/v2/resize:fit:540/0*vUlSsz1sMQ38o5gd.jpg",
    TokenStandard: "ERC-721",
    Chain: "sepolia",
    Metadata: "",
    LastUpdated: Date.now(),
    Stats: [],
    Traits: [],
    Count: 0,
    Description: "",
    Creator: "",
    CreatedAt: Date.now(),
    CollectionID: "",
  });

  const OnUpload = async () => {
    setIsSubmited(true);
    if (
      selectedKeys.currentKey &&
      nftData.MediaLink &&
      nftData.Name &&
      nftData.Creator &&
      nftData.CollectionID
    ) {
      try {
        const { tokenId, nftAddress } = await NFTMinting(
          nftData,
          setNftData,
          account
        );
        console.log(selectedKeys.currentKey);
        setNftData((prev) => {
          return {
            ...prev,
            tokenId,
            nftAddress,
            Chain: selectedKeys.currentKey,
            Stats: statArray,
            Traits: traitArray,
            Owner: state.userData._id,
            Creator: account,
          };
        });
        const response = await axios.post("/api/NFTs", {
          ...nftData,
          tokenId,
          nftAddress,
          Chain: selectedKeys.currentKey,
          Stats: statArray,
          Traits: traitArray,
          Owner: state.userData._id,
          Creator: account,
        });
        console.log("Success upload " + response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    };
    getAccount();
  }, []);

  return (
    <div className={Style.upload}>
      <div className={Style.upload_box}>
        <InputField
          label="NFT media IPFS link"
          placeholder="Profile Image"
          value={nftData.MediaLink}
          onChange={(e) =>
            setNftData({ ...nftData, MediaLink: e.target.value })
          }
          isInValid={isSubmited && nftData.MediaLink == ""}
          invalidText={"LOL"}
          isRequired={true}
        />
        <InputField
          label="Item Name"
          value={nftData.Name}
          onChange={(e) => setNftData({ ...nftData, Name: e.target.value })}
          isInValid={isSubmited && nftData.Name == ""}
          invalidText={"LOL"}
        />

        <div className={Style.upload_box_dropdown}>
          <h1> Chain : </h1>
          <div className={Style.upload_box_dropdown_dropdown}>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered">
                  {selectedKeys.currentKey ? selectedKeys.currentKey : "Chain"}
                </Button>
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

        <TextArea
          placeholder="something about yourself in few words"
          label="Description"
          note="The description will be included on the item's detail page underneath its image. Markdown syntax is supported."
          onChange={(e) =>
            setNftData({ ...nftData, Description: e.target.value })
          }
        />

        {collectionArray.length !== 0 ? (
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
                    {el.Name} - {el.chain}{" "}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}

        <div className={Style.upload_box_btn}>
          <MyCustomButton
            btnName="Upload"
            handleClick={OnUpload}
            classStyle={Style.upload_box_btn_style}
          />
        </div>
      </div>
    </div>
  );
};

export default UploadNFT;
