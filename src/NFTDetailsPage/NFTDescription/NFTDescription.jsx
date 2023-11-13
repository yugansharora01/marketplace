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
import {
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
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

const { ethers } = require("ethers");

const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");

const NFTDescription = ({ NFTData }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [account, setAccount] = useState("");
  const [social, setSocial] = useState(false);
  const [NFTMenu, setNFTMenu] = useState(false);
  const [history, setHistory] = useState(true);
  const [provanance, setProvanance] = useState(false);
  const [owner, setOwner] = useState(false);
  const [priceInUSD, setPriceInUSD] = useState(0);

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
    console.log(process.env.NEXT_PUBLIC_UPDATE_FRONT_END);
    if (!Moralis.Core.isStarted) {
      Moralis.start({
        apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
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

  const ListItem = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const { chainId } = await provider.getNetwork();
      console.log("chainid " + chainId.toString());
      const nftMarketplaceAddress = addresses[chainId].NftMarketplace[0];
      const signer = provider.getSigner(account);
      const contract = new ethers.Contract(
        nftMarketplaceAddress,
        nftMarketplaceAbi,
        signer
      );

      const result = await contract.createListing(
        NFTData.contractAddress,
        NFTData.tokenId,
        1
      );
      console.log(result);
      const reciept = await result.wait(1);
      console.log(reciept);

      try {
        console.log("id:" + passedId.toString());
        const response = await axios.post("/api/UpdateNFT", {
          amount: 1,
          coinName: "weth",
          coinAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
          id: passedId,
        });
        console.log("Success upload ");
        console.log(response.data);
      } catch (error) {
        console.log("NFT upload failed ");
        console.log(error);
        console.log(error.response.data);
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
                  {NFTData.price.amount} {NFTData.price.coinName}
                  <span>( ≈ ${priceInUSD})</span>
                </p>
              </div>

              <span>[{NFTData.count} in stock]</span>
            </div>

            <div className={Style.NFTDescription_box_profile_biding_box_button}>
              {NFTData.price == 0 ? (
                <div>
                  <MyCustomButton
                    icon={<FaWallet />}
                    btnName="Place a bid"
                    handleClick={getPrice}
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
                    handleClick={onOpen}
                    classStyle={Style.button}
                  />
                  {/**/}
                  <>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                      <ModalContent>
                        {(onClose) => (
                          <>
                            <ModalHeader className="flex flex-col gap-1">
                              Modal Title
                            </ModalHeader>
                            <ModalBody>
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Nullam pulvinar risus non risus
                                hendrerit venenatis. Pellentesque sit amet
                                hendrerit risus, sed porttitor quam.
                              </p>
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Nullam pulvinar risus non risus
                                hendrerit venenatis. Pellentesque sit amet
                                hendrerit risus, sed porttitor quam.
                              </p>
                              <p>
                                Magna exercitation reprehenderit magna aute
                                tempor cupidatat consequat elit dolor
                                adipisicing. Mollit dolor eiusmod sunt ex
                                incididunt cillum quis. Velit duis sit officia
                                eiusmod Lorem aliqua enim laboris do dolor
                                eiusmod. Et mollit incididunt nisi consectetur
                                esse laborum eiusmod pariatur proident Lorem
                                eiusmod et. Culpa deserunt nostrud ad veniam.
                              </p>
                            </ModalBody>
                            <ModalFooter>
                              <Button
                                color="danger"
                                variant="light"
                                onPress={onClose}
                              >
                                Close
                              </Button>
                              <Button color="primary" onPress={onClose}>
                                Action
                              </Button>
                            </ModalFooter>
                          </>
                        )}
                      </ModalContent>
                    </Modal>
                  </>
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
