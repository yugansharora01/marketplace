import mongoose from "mongoose";
import { connect } from "@/dbConfig/dbConfig";
import NFTsModel from "@/models/NFTModel";
import { NextRequest, NextResponse } from "next/server";
import Collections from "@/models/collectionModel";

const { v4: uuidv4 } = require("uuid");

connect();

export async function POST(request) {
  try {
    let reqBody = await request.json();
    console.log("reqBody");
    console.log(reqBody);

    const { Name } = reqBody;

    //check if user exists
    const nft = await NFTsModel.findOne({ Name });

    if (nft) {
      return NextResponse.json({ error: "nft exists" }, { status: 400 });
    } else {
      console.log("Good to go");
    }

    const {
      Owner,
      Price,
      MediaLink,
      ContractAddress,
      TokenId,
      TokenStandard,
      Chain,
      Creator,
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
      TokenID: TokenId,
      TokenStandard,
      Chain,
      Creator,
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

export async function GET(request) {
  try {
    const owner = request.nextUrl.searchParams.get("owner");
    const id = request.nextUrl.searchParams.get("id");
    const sort = request.nextUrl.searchParams.get("sort");
    let limit = request.nextUrl.searchParams.get("limit");
    if (limit > 50) limit = 50;
    if (!limit) limit = 10;
    let NFT;
    if (id) {
      console.log(id);
      NFT = await NFTsModel.findById(id).populate("Owner");
    } else {
      if (sort) {
        NFT = await NFTsModel.find({ owner })
          .sort({ CreatedAt: sort })
          .limit(1)
          .populate("Owner");
        console.log(NFT);
      } else {
        NFT = await NFTsModel.find({ owner }).populate("Owner");
      }
    }
    return NextResponse.json(
      {
        message: "Collection fetched successfully",
        data: NFT,
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
