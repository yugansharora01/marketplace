"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
} from "react-icons/ti";

import { RiSendPlaneFill } from "react-icons/ri";

import images from "../../../img";
import Style from "./Footer.module.css";
import { Discover, HelpCenter, helpCenter } from "../Navbar/index";

const Footer = () => {
  return (
    <div className={Style.footer}>
      <div className={Style.footer_box_social}>
        <Image
          src={images.logo}
          alt="footer logo"
          width={100}
          height={100}
          className={Style.footer_box_social_img}
        />
        <p>Discover the most outstanding articles on all topics of NFT</p>
        <div className={Style.footer_social}>
          <a href="#">
            <TiSocialFacebook />
          </a>
          <a href="#">
            <TiSocialLinkedin />
          </a>
          <a href="#">
            <TiSocialTwitter />
          </a>
          <a href="#">
            <TiSocialYoutube />
          </a>
          <a href="#">
            <TiSocialInstagram />
          </a>
        </div>
      </div>
      <div className={Style.footer_discover}>
        <h3>Discover</h3>
        <div className={Style.footer_discover_list}>
          <Discover />
        </div>
      </div>
      <div className={Style.footer_help}>
        <h3>Help</h3>
        <div className={Style.footer_help_list}>
          <HelpCenter />
        </div>
      </div>
      <div className={Style.footer_subscribe}>
        <h3>Subscribe</h3>
        <div className={Style.footer_subscribe_input}>
          <input placeholder="Enter Your email" />
          <RiSendPlaneFill className={Style.footer_subscribe_send} />
        </div>
        <div className={Style.footer_subscribe_msg}>
          <p>
            Subscribe to get the update on What's new in one of the best NFT
            marketplace.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
