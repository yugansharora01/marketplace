"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { MdNotifications } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { CgMenuLeft, CgMenuRight } from "react-icons/cg";

import Style from "./NavBar.module.css";
import { Discover, HelpCenter, Profile, Notification, SideBar } from "./index";
import { MyCustomButton } from "../componentindex";

import images from "../../../img";

const Navbar = () => {
  const [discover, setDiscover] = useState(false);
  const [help, setHelp] = useState(false);
  const [notification, setNotification] = useState(false);
  const [profile, setProfile] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [connected, setConnected] = useState(false);

  const Unset = () => {
    setDiscover(false);
    setHelp(false);
    setNotification(false);
    setProfile(false);
  };

  const openMenu = (e) => {
    if (e == "Discover") {
      Unset();
      setDiscover(!discover);
    } else if (e == "Help Center") {
      Unset();
      setHelp(!help);
    } else if (e == "Notification") {
      Unset();
      setNotification(!notification);
    } else if (e == "Profile") {
      Unset();
      setProfile(!profile);
    } else if (e == "Sidebar") {
      Unset();
      setOpenSideMenu(!openSideMenu);
    }
  };

  const openNotification = () => {
    if (!notification) {
      Unset();
      setNotification(true);
    } else {
      setNotification(false);
    }
  };

  const openProfile = () => {
    if (!profile) {
      Unset();
      setProfile(true);
    } else {
      setProfile(false);
    }
  };
  const openSideBar = () => {
    if (!openSideMenu) {
      setOpenSideMenu(true);
    } else {
      setOpenSideMenu(false);
    }
  };

  return (
    <div className={Style.navbar}>
      <div className={Style.navbar_container}>
        <div className={Style.navbar_container_left}>
          <div className={Style.logo}>
            <Image
              src={images.logo}
              alt="NFT Market Place"
              width={100}
              height={100}
            />
          </div>
          <div className={Style.navbar_container_left_box_input}>
            <div className={Style.navbar_container_left_box_input_box}>
              <input type="text" placeholder="Search NFT" />
              <BsSearch onClick={() => {}} className={Style.search_icon} />
            </div>
          </div>
        </div>
        <div className={Style.navbar_container_right}>
          {/* Discover */}
          <div className={Style.navbar_container_right_discover}>
            <p onClick={(e) => openMenu("Discover")}>Discover</p>
            {discover && (
              <div className={Style.navbar_container_right_discover_box}>
                <Discover />
              </div>
            )}
          </div>
          {/* Help Center */}
          <div className={Style.navbar_container_right_help}>
            <p onClick={(e) => openMenu("Help")}>Help Center</p>
            {help && (
              <div className={Style.navbar_container_right_help_box}>
                <HelpCenter />
              </div>
            )}
          </div>
          {/* Notification */}
          <div className={Style.navbar_container_right_notify}>
            <MdNotifications
              className={Style.notify}
              onClick={() => openMenu("Notification")}
            />
            {notification && <Notification />}
          </div>
          {/*CREATE BUTTON SECTIONS*/}
          <div className={Style.navbar_container_right_button}>
            <MyCustomButton btnName="Create" handleClick={() => {}} />
          </div>

          {/*USER PROFILE*/}
          <div className={Style.navbar_container_right_profile_box}>
            <div className={Style.navbar_container_right_profile}>
              <Image
                src={images.user1}
                alt="Profile"
                width={40}
                height={40}
                onClick={() => openMenu("Profile")}
                className={Style.navbar_container_right_profile}
              />
              {profile && <Profile />}
            </div>
          </div>
          {/*Menu Button*/}
          <div className={Style.navbar_container_right_menuBtn}>
            <CgMenuRight
              className={Style.menuIcon}
              onClick={() => openMenu("Sidebar")}
            />
          </div>
        </div>
      </div>
      {/*SIDE BAR*/}
      {openSideMenu && (
        <div className={Style.sideBar}>
          <SideBar setOpenSideMenu={setOpenSideMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
