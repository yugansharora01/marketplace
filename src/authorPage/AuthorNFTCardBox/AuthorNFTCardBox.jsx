import React, { useEffect, useState } from "react";

//INTERNAL IMPORT
import Style from "./AuthorNFTCardBox.module.css";
import images from "../../../img";
import { NFTCardTwo } from "../../CollectionPage/collectionIndex";
import CollectionCard from "@/component/CollectionCard/CollectionCard";
import FollowerTabCard from "../../component/FollowerTab/FollowerTabCard/FollowerTabCard";
import { useUser } from "@/Context/UserProvider";
import axios from "axios";

const AuthorNFTCardBox = ({
  collectiables,
  created,
  like,
  follower,
  following,
}) => {
  const [state, dispatch] = useUser();
  const [collections, setCollections] = useState();

  let followerArray = [
    {
      background: images.creatorbackground1,
      user: images.user1,
    },
    {
      background: images.creatorbackground2,
      user: images.user2,
    },
    {
      background: images.creatorbackground3,
      user: images.user3,
    },
    {
      background: images.creatorbackground4,
      user: images.user4,
    },
    {
      background: images.creatorbackground5,
      user: images.user5,
    },
    {
      background: images.creatorbackground6,
      user: images.user6,
    },
  ];

  let followingArray = [
    {
      background: images.creatorbackground3,
      user: images.user3,
    },
    {
      background: images.creatorbackground4,
      user: images.user4,
    },
    {
      background: images.creatorbackground5,
      user: images.user5,
    },
    {
      background: images.creatorbackground6,
      user: images.user6,
    },
    {
      background: images.creatorbackground1,
      user: images.user1,
    },
  ];

  useEffect(() => {
    if (state.userData) {
      console.log(state.userData._id);
      const getUserInfo = async () => {
        const res = await axios.get("/api/Collections", {
          params: {
            owner: state.userData._id,
            id: null,
            sort: null,
            limit: null,
          },
        });
        console.log(res.data.data);
        setCollections(res.data.data);
      };
      getUserInfo();
    }
  }, [state.userData]);

  return (
    <div className={Style.AuthorNFTCardBox}>
      {collectiables && collections != undefined && (
        <CollectionCard CollectionData={collections} />
      )}
      {created && state.userData.NFTs != undefined && (
        <NFTCardTwo NFTData={state.userData.NFTs} />
      )}
      {like && state.userData.LikedNFTs != undefined && (
        <NFTCardTwo NFTData={state.userData.LikedNFTs} />
      )}
      {follower && (
        <div className={Style.AuthorNFTCardBox_box}>
          {followerArray.map((el, i) => (
            <FollowerTabCard i={i} el={el} key={i + 1} />
          ))}
        </div>
      )}
      {following && (
        <div className={Style.AuthorNFTCardBox_box}>
          {followingArray.map((el, i) => (
            <FollowerTabCard i={i} el={el} key={i + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AuthorNFTCardBox;
