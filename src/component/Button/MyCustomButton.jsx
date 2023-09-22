"use client";
import React from "react";

import Style from "./MyCustomButton.module.css";

const MyCustomButton = ({ btnName, handleClick, icon, classStyle }) => {
  return (
    <div className={Style.box}>
      <button
        className={`${Style.button} ${classStyle}`}
        onClick={() => handleClick()}
      >
        {icon} {btnName}
      </button>
    </div>
  );
};
export default MyCustomButton;
