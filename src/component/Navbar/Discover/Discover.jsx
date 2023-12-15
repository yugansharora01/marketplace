"use client";
import React from "react";
import Link from "next/link";

import Style from "./Discover.module.css";
import { discoverMenu } from "../dropdownsContent";

const Discover = () => {
  return (
    <div>
      {discoverMenu.map((el, i) => (
        <div key={i + 1} className={Style.discover}>
          <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default Discover;
