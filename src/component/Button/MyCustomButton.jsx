"use client";
import React from "react";
import Style from "./MyCustomButton.module.css";
import { Button } from "@nextui-org/react";

const MyCustomButton = ({
  btnName,
  handleClick,
  icon,
  classStyle,
  btnProps,
}) => {
  return (
    <Button
      {...btnProps}
      className={`${Style.button} ${classStyle}`}
      onClick={() => handleClick()}
    >
      {icon}
      {btnName}
    </Button>
  );
};
export default MyCustomButton;
