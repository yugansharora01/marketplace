import mongoose from "mongoose";
import { connect } from "@/dbConfig/dbConfig";
import NFTsModel from "@/models/NFTModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request) {
  try {
    let reqBody = await request.json();
    console.log("reqBody");
    console.log(reqBody);
    const id = reqBody.id;
    const nft = await NFTsModel.findById(id);
    if (reqBody.user) {
      nft.Owner = reqBody.user;
      nft.Creator = reqBody.creator;
      nft.Price.amount = 0;
    } else {
      nft.Price.amount = reqBody.amount;
      nft.Price.coinName = reqBody.coinName;
      nft.Price.coinAddress = reqBody.coinAddress;
    }

    const nftSaved = await nft.save();

    console.log("nftSaved");
    console.log(nftSaved);

    return NextResponse.json(
      {
        message: "NFT Updated successfully",
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
