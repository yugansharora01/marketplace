import mongoose from "mongoose";
import { connect } from "@/dbConfig/dbConfig";
import Collections from "@/models/collectionModel";
import { Router, useRouter } from "next/navigation";
import NFTsModel from "@/models/NFTModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const {
      CollectionName,
      Owner,
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

    const newCollection = new Collections({
      CollectionName,
      Owner,
      BannerImage,
      ProfileImage,
      Description,
      Chain,
      TotalVolume,
      CreatedAt,
    });

    const Collection = await newCollection.save();

    console.log(Collection);

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

export async function GET(request) {
  const Owner = request.nextUrl.searchParams.get("Owner");
  const id = request.nextUrl.searchParams.get("id");
  let collections;
  if (id) {
    collections = await Collections.findById(id);
  } else {
    collections = await Collections.find({ Owner });
  }
  return NextResponse.json(
    {
      message: "Collection fetched successfully",
      data: collections,
      success: true,
    },
    {
      status: 200,
    }
  );
}
