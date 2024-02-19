import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  MdVerified,
  MdCloudUpload,
  MdOutlineReportProblem,
} from "react-icons/md";
import { FiCopy } from "react-icons/fi";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialYoutube,
  TiSocialInstagram,
} from "react-icons/ti";
import { BsThreeDots } from "react-icons/bs";

//INTERNAL IMPORT
import Style from "./AuthorProfileCard.module.css";
import images from "../../../img";
import { MyCustomButton as Button } from "../../component/componentindex.js";
import { useUser } from "@/Context/UserProvider";
import shortenString from "@/Utils/ShortenString";

const AuthorProfileCard = () => {
  const [share, setShare] = useState(false);
  const [report, setReport] = useState(false);
  const [state, dispatch] = useUser();

  //copyAddress function
  const copyAddress = (str) => {
    navigator.clipboard.writeText(str);
  };

  const openShare = () => {
    if (!share) {
      setShare(true);
      setReport(false);
    } else {
      setShare(false);
    }
  };

  const openReport = () => {
    if (!report) {
      setReport(true);
      setShare(false);
    } else {
      setReport(false);
    }
  };

  return (
    <div className={Style.AuthorProfileCard}>
      <div className={Style.AuthorProfileCard_box}>
        <div className={Style.AuthorProfileCard_box_img}>
          <Image
            src={images.nft_image_1}
            className={Style.AuthorProfileCard_box_img_img}
            alt="NFT IMAGES"
            width={220}
            height={220}
          />
        </div>

        <div className={Style.AuthorProfileCard_box_info}>
          <h2>
            Dony Herrera
            <span>
              <MdVerified />
            </span>{" "}
          </h2>

          <div className={Style.AuthorProfileCard_box_info_address}>
            <div>{shortenString(String(state.userData.WalletAddress), 20)}</div>
            <FiCopy
              onClick={() => copyAddress(String(state.userData.WalletAddress))}
              className={Style.AuthorProfileCard_box_info_address_icon}
            />
          </div>

          <p>
            Punk #4786 / An OG Cryptopunk Collector, hoarder of NFTs.
            Contributing to @ether_cards, an NFT Monetization Platform.
          </p>

          <div className={Style.AuthorProfileCard_box_info_social}>
            <a href="#">
              <TiSocialFacebook />
            </a>
            <a href="#">
              <TiSocialInstagram />
            </a>
            <a href="#">
              <TiSocialLinkedin />
            </a>
            <a href="#">
              <TiSocialYoutube />
            </a>
          </div>
        </div>

        <div className={Style.AuthorProfileCard_box_share}>
          <div className={Style.AuthorProfileCard_box_follow_button}>
            <Button btnName="Follow" handleClick={() => {}} />
          </div>
          <div className={Style.AuthorProfileCard_box_follow_button}>
            <MdCloudUpload
              onClick={() => openShare()}
              className={Style.AuthorProfileCard_box_share_icon}
            />
          </div>

          {share && (
            <div className={Style.AuthorProfileCard_box_share_upload}>
              <p>
                <span>
                  <TiSocialFacebook />
                </span>{" "}
                {""}
                Facebook
              </p>
              <p>
                <span>
                  <TiSocialInstagram />
                </span>{" "}
                {""}
                Instragram
              </p>
              <p>
                <span>
                  <TiSocialLinkedin />
                </span>{" "}
                {""}
                LinkedIn
              </p>
              <p>
                <span>
                  <TiSocialYoutube />
                </span>{" "}
                {""}
                YouTube
              </p>
            </div>
          )}

          <BsThreeDots
            onClick={() => openReport()}
            className={Style.AuthorProfileCard_box_report_icon}
          />

          {report && (
            <div className={Style.AuthorProfileCard_box_share_report}>
              <p>
                <span>
                  <MdOutlineReportProblem />
                </span>{" "}
                {""}
                Report abuse
              </p>
              <p className={Style.AuthorProfileCard_box_share_other}>
                <span>
                  <MdVerified />
                </span>{" "}
                {""}
                Follow
              </p>
              <p className={Style.AuthorProfileCard_box_share_other}>
                <span>
                  <TiSocialFacebook />
                </span>{" "}
                {""}
                Facebook
              </p>
              <p className={Style.AuthorProfileCard_box_share_other}>
                <span>
                  <TiSocialInstagram />
                </span>{" "}
                {""}
                Instragram
              </p>
              <p className={Style.AuthorProfileCard_box_share_other}>
                <span>
                  <TiSocialLinkedin />
                </span>{" "}
                {""}
                LinkedIn
              </p>
              <p className={Style.AuthorProfileCard_box_share_other}>
                <span>
                  <TiSocialYoutube />
                </span>{" "}
                {""}
                YouTube
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorProfileCard;
