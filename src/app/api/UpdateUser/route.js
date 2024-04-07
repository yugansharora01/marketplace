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
    console.log("entered post");
    const reqBody = await request.json();
    let {
      _id,
      UserName,
      Description,
      ProfileImage,
      BannerImage,
      Socials,
      WalletAddress,
    } = reqBody;

    console.log(reqBody);

    const existing = await Users.findById(_id);
    console.log("existing");
    console.log(existing);
    //check if user exists
    const user = await Users.findByIdAndUpdate(
      _id,
      {
        UserName,
        Description,
        ProfileImage,
        BannerImage,
        Socials,
      },
      {
        new: true,
      }
    );

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
          data: { WalletAddress, UserName },
          success: false,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      {
        message: "User updated successfully",
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
