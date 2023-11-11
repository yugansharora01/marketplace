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

import { useWeb3Contract, useMoralis } from "react-moralis";
import addresses from "../../constants/networkMapping.json";
import nftAbi from "../../constants/Nft.json";
import nftMarketplaceAbi from "../../constants/NftMarketplace.json";

import { useUser } from "@/Context/UserProvider";

const UploadNFT = ({ collectionArray }) => {
  const {
    chainId,
    account,
    isWeb3Enabled,
    enableWeb3,
    isAuthenticated,
    authenticate,
  } = useMoralis();
  const chainString = chainId ? parseInt(chainId).toString() : "31337";
  const nftAddress = addresses[chainString].Nft[0];
  const { runContractFunction: safeMint } = useWeb3Contract();

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
    ContractAddress: nftAddress,
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
    try {
      if (!isWeb3Enabled) {
        await enableWeb3();
      }
      console.log(account);
      const mintOptions = {
        abi: nftAbi,
        contractAddress: nftAddress,
        functionName: "safeMint",
        params: {
          to: account,
          uri: JSON.stringify(nftData),
        },
      };
      let TokenId;
      await safeMint({
        params: mintOptions,
        onSuccess: (tx) => {
          console.log("tx");
          console.log(tx);
          TokenId = tx.value.toString();
          setNftData({
            ...nftData,
            TokenID: tx.value.toString(),
          });
        },
        onError: (error) => {
          console.log("error in safemint");
          console.log(error);
          return;
        },
      });
      console.log("nftData:");
      console.log(nftData);
      const response = await axios.post("/api/NFTs", { ...nftData, TokenId });
      console.log("Success upload " + response.data);
      setNftData({
        ...nftData,
        Name: "",
        Price: {
          amount: 0,
          coinName: "weth",
          coinAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        },
        ContractAddress: nftAddress,
        TokenStandard: "ERC-721",
        Chain: "sepolia",
        Metadata: "",
        LastUpdated: Date.now(),
        Stats: [],
        Traits: [],
        Count: 0,
        Description: "",
        CreatedAt: Date.now(),
      });
    } catch (error) {
      console.log("NFT upload failed " + error.response);
      console.log(error.response);
      console.log(error);
    }
  };

  const onPreview = () => {
    console.log(state.userData);
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

  useEffect(() => {
    if (!isWeb3Enabled) {
      enableWeb3();
    }
    if (!isAuthenticated) {
      console.log("authenticating");
      authenticate({
        onComplete: () => {
          console.log("authenticated");
        },
      });
    }
    console.log(state.userData._id);
    setNftData({
      ...nftData,
      Owner: state.userData._id,
    });
  }, []);

  useEffect(() => {
    console.log(state.userData);
    console.log(state.userData._id);
    setNftData({
      ...nftData,
      Owner: state.userData._id,
    });
  }, [state.userData._id]);

  useEffect(() => {
    console.log("account");
    console.log(account);
    setNftData({
      ...nftData,
      Creator: account,
    });
  }, [account]);

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
            handleClick={onPreview}
            classStyle={Style.upload_box_btn_style}
          />
        </div>
      </div>
    </div>
  );
};

export default UploadNFT;
