import mongoose from "mongoose";
import { connect } from "@/dbConfig/dbConfig";
import NFTsModel from "@/models/NFTModel";
import { NextRequest, NextResponse } from "next/server";
import Collections from "@/models/collectionModel";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const {
      Name,
      MediaLink,
      ContractAddress,
      TokenID,
      TokenStandard,
      Chain,
      Metadata,
      LastUpdated,
      Stats,
      Traits,
      Count,
      Description,
      CreatedAt,
      CollectionID,
    } = reqBody;

    console.log("reqBody");
    console.log(reqBody);

    //check if user exists
    const nft = await NFTsModel.findOne({ Name });

    if (nft) {
      return NextResponse.json({ error: "nft exists" }, { status: 400 });
    } else {
      console.log("Good to go");
    }

    const newNFT = new NFTsModel({
      Name,
      MediaLink,
      ContractAddress,
      TokenID,
      TokenStandard,
      Chain,
      Metadata,
      LastUpdated,
      Stats,
      Traits,
      Count,
      Description,
      CreatedAt,
      CollectionID,
    });

    const id = newNFT._id;

    const NFT = await newNFT.save();

    console.log(NFT);

    const collection = await Collections.findById(CollectionID);
    collection.NFTs.push(id);

    const collectionSaved = await collection.save();

    console.log("collectionSaved");
    console.log(collectionSaved);

    return NextResponse.json(
      {
        message: "NFT created successfully",
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
