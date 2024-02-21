import React, { useEffect } from "react";

//INTERNAL IMPORT
import Style from "./AuthorNFTCardBox.module.css";
import images from "../../../img";
import { NFTCardTwo } from "../../CollectionPage/collectionIndex";
import CollectionCard from "@/component/CollectionCard/CollectionCard";
import FollowerTabCard from "../../component/FollowerTab/FollowerTabCard/FollowerTabCard";
import { useUser } from "@/Context/UserProvider";

const AuthorNFTCardBox = ({
  collectiables,
  created,
  like,
  follower,
  following,
}) => {
  const [state, dispatch] = useUser();

  let collectiablesArray = [
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
  ];

  let createdArray = [
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
  ];

  let likeArray = [
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
  ];

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
    const getUserInfo = async () => {
      if (state.userData.NFTs != undefined) {
        collectiablesArray = state.userData.Collections;
        createdArray = state.userData.NFTs;
        likeArray = state.userData.LikedNFTs;
        console.log(state.userData);
      }
    };
    getUserInfo();
  }, [state.userData]);

  return (
    <div className={Style.AuthorNFTCardBox}>
      {collectiables && state.userData.Collections != undefined && (
        <CollectionCard CollectionData={state.userData.Collections} />
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
