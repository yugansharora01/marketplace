import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  MdVerified,
  MdCloudUpload,
  MdTimer,
  MdReportProblem,
  MdOutlineDeleteSweep,
} from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { FaWallet, FaPercentage } from "react-icons/fa";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
} from "react-icons/ti";
import { BiTransferAlt, BiDollar } from "react-icons/bi";

import axios from "axios";

//INTERNAL IMPORT
import Style from "./NFTDescription.module.css";
import { useSearchParams } from "next/navigation";
import images from "../../../img";
import { MyCustomButton } from "../../component/componentindex.js";
import { NFTTabs } from "../NFTDetailsIndex";
import shortenString from "@/Utils/ShortenString";
import clipString from "@/Utils/ClipString";
import nftMarketplaceAbi from "../../../constants/NftMarketplace.json";
import addresses from "../../../constants/networkMapping.json";
import TokenSymbol from "../../../constants/SymbolToToken.json";
import ListNFTDialog from "../ListNFTDialog/ListNFTDialog";
import { useUser } from "@/Context/UserProvider";
import { NFT, NftCard } from "web3uikit";

const { ethers } = require("ethers");

const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");

const NFTDescription = ({ NFTData }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [account, setAccount] = useState("");
  const [social, setSocial] = useState(false);
  const [NFTMenu, setNFTMenu] = useState(false);
  const [history, setHistory] = useState(true);
  const [provanance, setProvanance] = useState(false);
  const [owner, setOwner] = useState(false);
  const [priceInUSD, setPriceInUSD] = useState(0);
  const [state, dispatch] = useUser();

  const searchParams = useSearchParams();
  const passedId = searchParams.get("id");

  const historyArray = [
    images.user1,
    images.user2,
    images.user3,
    images.user4,
    images.user5,
  ];
  const provananceArray = [
    images.user6,
    images.user7,
    images.user8,
    images.user9,
    images.user10,
  ];
  const ownerArray = [
    images.user1,
    images.user8,
    images.user2,
    images.user6,
    images.user5,
  ];

  const getPrice = async () => {
    console.log(process.env.NEXT_PUBLIC_MORALIS_API_KEY);
    if (!Moralis.Core.isStarted) {
      console.log("start");
      await Moralis.start({
        apiKey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6Ijk4ZjQ4ZGJhLTM3ZWYtNDE4My1hNWNjLTI5YmJiNjJmNzk2NCIsIm9yZ0lkIjoiMzUyMTMyIiwidXNlcklkIjoiMzYxOTMxIiwidHlwZUlkIjoiMWM3YmFkYzctYTA1NC00OTgxLTg3OTctNTVkOTA1ODUwZTMyIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2OTE1MTA1NjEsImV4cCI6NDg0NzI3MDU2MX0.HIbgf2MjgEPzYp8mQ84EmgKoeUZC3PLVhElcSoQlcyc",
      });
    }

    const address = "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0";

    const chain = EvmChain.ETHEREUM;

    const response = await Moralis.EvmApi.token.getTokenPrice({
      address,
      chain,
    });
    setPriceInUSD(parseFloat(response.toJSON().usdPrice) * NFTData.price);
  };

  const coinMarketPrice = async (symbol) => {
    let response;
    try {
      console.log(symbol);
      response = await axios.get("/api/CoinMarketCap", {
        params: {
          symbol: symbol,
        },
      });
      let TokenPrice = Number(response.data.data[symbol][0].quote["USD"].price);
      setPriceInUSD((TokenPrice * NFTData.price.amount).toFixed(4));
    } catch (ex) {
      response = null;
      console.log(ex);
    }
  };

  const getNFTContract = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const { chainId } = await provider.getNetwork();
        console.log("chainid " + chainId.toString());
        const nftMarketplaceAddress = addresses[chainId].NftMarketplace[0];
        console.log(account);
        const signer = provider.getSigner(account);
        const contract = new ethers.Contract(
          nftMarketplaceAddress,
          nftMarketplaceAbi,
          signer
        );
        return contract;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ListItem = async (token, amount) => {
    if (window.ethereum) {
      try {
        const contract = await getNFTContract();

        const result = await contract.createListing(
          NFTData.contractAddress,
          NFTData.tokenId,
          amount
        );
        console.log(result);
        const reciept = await result.wait(1);
        console.log(reciept);
        try {
          console.log("id:" + passedId.toString());
          const response = await axios.post("/api/UpdateNFT", {
            amount: amount,
            coinName: token,
            coinAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            id: passedId,
          });
          console.log("Success upload ");
          console.log(response.data);
        } catch (error) {
          console.log("NFT Listing data update failed ");
          console.log(error);
          console.log(error.response.data);
        }
      } catch (error) {
        console.log("NFT Listing failed ");
        console.log(error);
      }
    }
  };

  const BuyItem = async (nftAddress, tokenId, Price) => {
    if (window.ethereum) {
      try {
        const contract = await getNFTContract();
        const p = BigInt(Number(Price)) * BigInt(10000000000);
        const result = await contract.buyListing(nftAddress, tokenId, {
          value: p,
        });
        console.log(result);
        const reciept = await result.wait(1);
        console.log(reciept);
        try {
          console.log("id:" + passedId.toString());
          const response = await axios.post("/api/UpdateNFT", {
            user: state.userData._id,
            id: passedId,
          });
          console.log("Success upload ");
          console.log(response.data);
        } catch (error) {
          console.log("NFT Listing data update failed ");
          console.log(error);
          console.log(error.response.data);
        }
      } catch (error) {
        console.log("NFT Buying failed ");
        console.log(error);
      }
    }
  };

  const openSocial = () => {
    if (!social) {
      setSocial(true);
      setNFTMenu(false);
    } else {
      setSocial(false);
    }
  };

  const openNFTMenu = () => {
    if (!NFTMenu) {
      setNFTMenu(true);
      setSocial(false);
    } else {
      setNFTMenu(false);
    }
  };

  const openTabs = (e) => {
    const btnText = e.target.innerText;

    if (btnText == "Bid History") {
      setHistory(true);
      setProvanance(false);
      setOwner(false);
    } else if (btnText == "Provanance") {
      setHistory(false);
      setProvanance(true);
      setOwner(false);
    }
  };

  const openOwmer = () => {
    if (!owner) {
      setOwner(true);
      setHistory(false);
      setProvanance(false);
    } else {
      setOwner(false);
      setHistory(true);
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

  useEffect(() => {
    if (NFTData.price.coinName != undefined) {
      coinMarketPrice(NFTData.price.coinName);
    }
  }, [NFTData.price.coinName]);

  const check = (val) => {
    console.log(val);
  };

  return (
    <div className={Style.NFTDescription}>
      <div className={Style.NFTDescription_box}>
        {/* //Part ONE */}
        <div className={Style.NFTDescription_box_share}>
          <p>Virtual Worlds</p>
          <div className={Style.NFTDescription_box_share_box}>
            <MdCloudUpload
              className={Style.NFTDescription_box_share_box_icon}
              onClick={() => openSocial()}
            />

            {social && (
              <div className={Style.NFTDescription_box_share_box_social}>
                <a href="#">
                  <TiSocialFacebook /> Facebooke
                </a>
                <a href="#">
                  <TiSocialInstagram /> Instragram
                </a>
                <a href="#">
                  <TiSocialLinkedin /> LinkedIn
                </a>
                <a href="#">
                  <TiSocialTwitter /> Twitter
                </a>
                <a href="#">
                  <TiSocialYoutube /> YouTube
                </a>
              </div>
            )}

            <BsThreeDots
              className={Style.NFTDescription_box_share_box_icon}
              onClick={() => openNFTMenu()}
            />

            {NFTMenu && (
              <div className={Style.NFTDescription_box_share_box_social}>
                <a href="#">
                  <BiDollar /> Change price
                </a>
                <a href="#">
                  <BiTransferAlt /> Transfer
                </a>
                <a href="#">
                  <MdReportProblem /> Report abouse
                </a>
                <a href="#">
                  <MdOutlineDeleteSweep /> Delete item
                </a>
              </div>
            )}
          </div>
        </div>
        {/* //Part TWO */}
        <div className={Style.NFTDescription_box_profile}>
          <h1>{clipString(NFTData.Name, 20)}</h1>
          <div className={Style.NFTDescription_box_profile_box}>
            <div className={Style.NFTDescription_box_profile_box_right}>
              <Image
                src={images.user2}
                alt="profile"
                width={40}
                height={40}
                className={Style.NFTDescription_box_profile_box_left_img}
              />

              <div className={Style.NFTDescription_box_profile_box_right_info}>
                <small>Owner</small> <br />
                <span>
                  {shortenString(NFTData.creator, 40)} <MdVerified />
                </span>
              </div>
            </div>
          </div>

          <div className={Style.NFTDescription_box_profile_biding}>
            <div className={Style.NFTDescription_box_profile_biding_box_price}>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_price_bid
                }
              >
                <small>Current Price</small>
                <p>
                  {NFTData.price.amount} {NFTData.price.coinName} ( ≈ $
                  {priceInUSD})
                </p>
              </div>

              <span>[{NFTData.count} in stock]</span>
            </div>

            <div className={Style.NFTDescription_box_profile_biding_box_button}>
              {NFTData.price.amount != 0 ? (
                <div>
                  <MyCustomButton
                    icon={<FaWallet />}
                    btnName="Buy NFT"
                    handleClick={() => {
                      BuyItem(
                        NFTData.contractAddress,
                        NFTData.tokenId,
                        NFTData.price.amount
                      );
                    }}
                    classStyle={Style.button}
                  />
                  <MyCustomButton
                    icon={<FaPercentage />}
                    btnName="Make offer"
                    handleClick={() => {}}
                    classStyle={Style.button}
                  />
                </div>
              ) : (
                <div>
                  <MyCustomButton
                    icon={<FaWallet />}
                    btnName="List NFT"
                    handleClick={() => {
                      //check(NFTData.price.amount);
                      setOpenDialog(true);
                    }}
                    classStyle={Style.button}
                  />
                  {/**/}
                  <ListNFTDialog
                    open={openDialog}
                    setOpenDialog={setOpenDialog}
                    tokens={Object.keys(TokenSymbol)}
                    ListItem={ListItem}
                  ></ListNFTDialog>
                </div>
              )}
            </div>

            <div className={Style.NFTDescription_box_profile_biding_box_tabs}>
              <button onClick={(e) => openTabs(e)}>Bid History</button>
              <button onClick={(e) => openTabs(e)}>Provanance</button>
              <button onClick={() => openOwmer()}>Owner</button>
            </div>

            {history && (
              <div className={Style.NFTDescription_box_profile_biding_box_card}>
                <NFTTabs dataTab={historyArray} />
              </div>
            )}
            {provanance && (
              <div className={Style.NFTDescription_box_profile_biding_box_card}>
                <NFTTabs dataTab={provananceArray} />
              </div>
            )}

            {owner && (
              <div className={Style.NFTDescription_box_profile_biding_box_card}>
                <NFTTabs dataTab={ownerArray} icon={<MdVerified />} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDescription;
