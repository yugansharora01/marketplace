"use client";
import React, { useState } from "react";
import Link from "next/link";
import { BsImage } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
//INTERNAL IMPORT
import Style from "./CollectionCard.module.css";
import Mycard from "./mycard";

const CollectionCard = ({ CollectionData }) => {
  console.log("CollectionData");
  console.log(CollectionData);

  return (
    <div className={Style.CollectionCard_wrapper}>
      <h1>Latest Collections</h1>
      <div className={Style.CollectionCard}>
        {CollectionData.map((el, i) => (
          <Mycard el={el} i={i} key={i + 1}></Mycard>
        ))}
      </div>
    </div>
  );
};

export default CollectionCard;
