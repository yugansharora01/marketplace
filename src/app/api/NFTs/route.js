import mongoose from "mongoose";
import { connect } from "@/dbConfig/dbConfig";
import NFTsModel from "@/models/NFTModel";
import { NextRequest, NextResponse } from "next/server";
import Collections from "@/models/collectionModel";

const { v4: uuidv4 } = require("uuid");

connect();

const addNFT = async (data) => {
  data.ContractAddress = uuidv4();
  data.TokenID = uuidv4();
};

export async function POST(request) {
  try {
    const reqBody = await request.json();
    console.log("reqBody");
    console.log(reqBody);

    //check if user exists
    const nft = await NFTsModel.findOne({ Name: reqBody.Name });

    if (nft) {
      return NextResponse.json({ error: "nft exists" }, { status: 400 });
    } else {
      console.log("Good to go");
    }

    //Add NFT to smart contract
    reqBody = await addNFT(reqBody);

    const {
      Name,
      Owner,
      Price,
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

    const newNFT = new NFTsModel({
      Name,
      Owner,
      Price,
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

    //Get id to add this to collections NFT array
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
