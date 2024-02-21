import mongoose from "mongoose";
import { connect } from "@/dbConfig/dbConfig";
import Users from "@/models/UserModel";
import NFTsModel from "@/models/NFTModel";
import Collections from "@/models/collectionModel";
import { NextRequest, NextResponse } from "next/server";
import url from "url";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    let { UserName, WalletAddress } = reqBody;

    console.log(reqBody);

    //check if user exists
    const user = await Users.findOne({ WalletAddress }).populate([
      "NFTs",
      {
        path: "Collections",
        populate: {
          path: "Owner",
        },
      },
      "LikedNFTs",
      "LikedCollections",
    ]);

    if (user) {
      return NextResponse.json(
        {
          message: "User exists",
          data: user,
          success: true,
        },
        {
          status: 201,
        }
      );
    }

    const newUser = new Users({
      UserName,
      WalletAddress,
    });

    const User = await newUser.save();

    console.log(User);

    return NextResponse.json(
      {
        message: "User created successfully",
        data: user,
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

export async function GET(request) {
  try {
    //const id = request.nextUrl.searchParams.get("id");
    const queryParams = url.parse(request.url, true).query; // To read query params
    let { id } = queryParams;
    const user = await Users.findById(id).populate([
      "NFTs",
      "Collections",
      "LikedNFTs",
      "LikedCollections",
    ]);

    return NextResponse.json(
      {
        message: "user fetched successfully",
        data: user,
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
