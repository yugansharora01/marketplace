"use client";
import React from "react";
import Link from "next/link";

import Style from "./HelpCenter.module.css";
import { helpCenterMenu } from "../dropdownsContent";

const HelpCenter = () => {
  return (
    <div>
      {helpCenterMenu.map((el, i) => (
        <div key={i + 1} className={Style.helpCenter}>
          <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default HelpCenter;
