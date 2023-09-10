import mongoose from "mongoose";
import { connect } from "@/dbConfig/dbConfig";
import Collections from "@/models/collectionModel";
import NFTsModel from "@/models/NFTModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const {
      CollectionName,
      BannerImage,
      ProfileImage,
      Description,
      Chain,
      TotalVolume,
      CreatedAt /*, NFTs*/,
    } = reqBody;

    console.log(reqBody);

    //check if user exists
    const collection = await Collections.findOne({ CollectionName });

    if (collection) {
      return NextResponse.json({ error: "Collection exists" }, { status: 400 });
    }

    // try {
    //   let NFTarray = [];

    //   //Creating the NFTs
    //   for (const ele of NFTs) {
    //     const newNFT = new NFTsModel({
    //       Name: ele.Name,
    //       Details: ele.Details,
    //       Stats: ele.Stats,
    //       Traits: ele.Traits,
    //       Count: ele.Count,
    //       Description: ele.Description,
    //       CreatedAt: ele.CreatedAt,
    //     });

    //     await newNFT.save();
    //     let { _id } = newNFT;
    //     NFTarray.push(_id);

    //     console.log("NFT saved:");
    //     console.log(newNFT);
    //   }
    // } catch (error) {
    //   return NextResponse.json(
    //     { error: "NFT error " + error.message },
    //     { status: 502 }
    //   );
    // }

    // for (const NFTid of NFTarray) {
    //   const exists = await NFTsModel.findOne({ _id: NFTid });
    //   if (!exists) {
    //     return NextResponse.json({ error: "NFTs not saved" }, { status: 401 });
    //   } else {
    //     console.log(NFTid + " exists ");
    //   }
    // }

    const newCollection = new Collections({
      CollectionName,
      BannerImage,
      ProfileImage,
      Description,
      Chain,
      TotalVolume,
      CreatedAt,
      //NFTs: NFTarray,
    });

    const Collection = await newCollection.save();

    console.log(Collection);

    //NFTarray = [];
    return NextResponse.json(
      {
        message: "Collection created successfully",
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 501 });
  }
}
