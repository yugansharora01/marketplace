"use client";
import React, { useState, useEffect, useReducer } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarMenuItem,
  NavbarMenuToggle,
  NavbarMenu,
  Button,
} from "@nextui-org/react";
import { MdNotifications } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useBalance } from "wagmi";
import { fetchBalance } from "@wagmi/core";
import Style from "./NavBar.module.css";
import { MyCustomButton } from "../componentindex";
import images from "../../../img";
import { useUser } from "@/Context/UserProvider";
import { AuthConstants } from "@/Constants/Constants";
import { discoverMenu, helpCenterMenu } from "./dropdownsContent";

const NavbarComponent = () => {
  const { isConnected, connector: activeConnector } = useAccount({
    onConnect({ address, connector, isReconnected }) {
      postUser(address);
    },
  });

  useEffect(() => {
    const handleConnectorUpdate = ({ account, chain }) => {
      if (account) {
        console.log("new account", account);
        postUser(account);
      } else if (chain) {
        console.log("new chain", chain);
      }
    };

    if (activeConnector) {
      activeConnector.on("change", handleConnectorUpdate);
    }

    return () => {
      if (activeConnector) {
        activeConnector.off("change", handleConnectorUpdate);
      }
    };
  }, [activeConnector]);

  const [state, dispatch] = useUser();

  const postUser = async (WalletAddress) => {
    try {
      console.log(WalletAddress);
      const UserName = "user";
      const response = await axios.post("/api/Users", {
        UserName,
        WalletAddress,
      });
      console.log("Success user submission ");
      console.log(response.data);
      const balance = await fetchBalance({
        address: WalletAddress,
      });

      console.log(JSON.stringify(balance));
      dispatch({
        type: AuthConstants.LOGIN_SUCCESS,
        payload: { ...response.data.data, balance },
      });
    } catch (error) {
      console.log("Users submit failed ");
      console.log(error?.response?.data);
      dispatch({
        type: AuthConstants.LOGIN_FAILURE,
        payload: error.response.data,
      });
    }
  };

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar
      shouldHideOnScroll
      classNames={{
        base: "bg-tertiary bg-opacity-20",
        wrapper: "max-w-[100vw]",
      }}
    >
      <NavbarContent
        className="sm:hidden data-[justify=start]:grow-0"
        justify="start"
      >
        <NavbarMenuToggle />
      </NavbarContent>
      <NavbarContent justify="start" className="grow-0">
        <NavbarBrand className="mr-4 min-w-[20vw] pl-5">
          <Link href="/">
            <Image
              src={images.logo}
              alt="NFT Market Place"
              width={100}
              height={100}
            />
          </Link>
        </NavbarBrand>
        <NavbarContent
          justify="start"
          className="hidden sm:flex grow-1 w-full data-[justify=start]:justify-evenly data-[justify=start]:basis-full"
        >
          <Dropdown className="bg-tertiary shadow-custom1">
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                  endContent={<IoIosArrowDown />}
                  radius="sm"
                >
                  Discover
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="ACME features"
              className=""
              itemClasses={{
                base: "gap-4 bg-tertiary",
              }}
            >
              {discoverMenu.map((val) => (
                <DropdownItem key={val.name} href={val.link}>
                  {val.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown className="bg-tertiary shadow-custom1">
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                  endContent={<IoIosArrowDown />}
                  radius="sm"
                >
                  Help Center
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="ACME features"
              className=""
              itemClasses={{
                base: "gap-4 bg-tertiary",
              }}
            >
              {helpCenterMenu.map((val) => (
                <DropdownItem key={val.name} href={val.link}>
                  {val.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center " justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:w-[10rem] xl:w-full h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<BsSearch size={18} />}
          type="search"
        />
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavbarComponent;
