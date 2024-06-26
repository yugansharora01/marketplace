"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { GrClose } from "react-icons/gr";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";

import Style from "./SideBar.module.css";
import images from "../../../../img";
import Button from "../../Button/MyCustomButton";

import { helpCenterMenu, discoverMenu } from "../dropdownsContent";

const SideBar = ({ setOpenSideMenu }) => {
  const [openDiscover, setOpenDiscover] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);

  const openDiscoverMenu = () => {
    if (!openDiscover) setOpenDiscover(true);
    else setOpenDiscover(false);
  };

  const openHelpMenu = () => {
    if (!openHelp) setOpenHelp(true);
    else setOpenHelp(false);
  };

  const closeSideBar = () => {
    setOpenSideMenu(false);
  };

  return (
    <div className={Style.sideBar}>
      <GrClose
        className={Style.sideBar_closeBtn}
        onClick={() => closeSideBar()}
      />
      <div className={Style.sideBar_box}>
        <Image src={images.logo} alt="logo" width={150} height={150} />
        <p>Discover the most outstanding articles on all topics of NFT</p>
        <div className={Style.sideBar_social}>
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
      <div className={Style.sideBar_menu}>
        <div>
          <div
            className={Style.sideBar_menu_box}
            onClick={() => openDiscoverMenu()}
          >
            <p>Discover</p>
            {openDiscover ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
          </div>
          {openDiscover && (
            <div className={Style.sideBar_discover}>
              {discoverMenu.map((el, i) => (
                <p key={(i = 1)}>
                  <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
                </p>
              ))}
            </div>
          )}
        </div>
        <div>
          <div
            className={Style.sideBar_menu_box}
            onClick={() => openHelpMenu()}
          >
            <p>Help Center</p>
            {openHelp ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
          </div>
          {openHelp && (
            <div className={Style.sideBar_discover}>
              {helpCenterMenu.map((el, i) => (
                <p key={(i = 1)}>
                  <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={Style.sideBar_button}>
        <Button btnName="Create" handleClick={() => {}} />
        <Button btnName="Connect Wallet" handleClick={() => {}} />
      </div>
    </div>
  );
};

export default SideBar;
