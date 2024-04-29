import React from "react";
//import { Loading } from "@nextui-org/react";

const CustomLoader = ({ isLoading }) => {
  return <>{isLoading ? <div className="h-full w-full">Loading</div> : ""}</>;
};

export default CustomLoader;
