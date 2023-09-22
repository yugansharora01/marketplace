import React from "react";

//INTERNAL IMPORT
import { NFTDescription, NFTDetailsImg, NFTTabs } from "./NFTDetailsIndex";
import Style from "./NFTDetailsPage.module.css";

const NFTDetailsPage = ({ NFTData }) => {
  return (
    <div className={Style.NFTDetailsPage}>
      <div className={Style.NFTDetailsPage_box}>
        <NFTDetailsImg NFTData={NFTData} />
        <NFTDescription NFTData={NFTData} />
      </div>
    </div>
  );
};

export default NFTDetailsPage;
