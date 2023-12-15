import mongoose from "mongoose";
import { connect } from "@/dbConfig/dbConfig";
import Users from "@/models/UserModel";
import Collections from "@/models/collectionModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    let {
      CollectionName,
      Owner,
      BannerImage,
      ProfileImage,
      Description,
      Chain,
      TotalVolume,
      CreatedAt /*, NFTs*/,
    } = reqBody;

    console.log("reqBody");
    console.log(reqBody);
    CreatedAt = Date.now();

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

    const id = newCollection._id;

    const Collection = await newCollection.save();

    console.log("Collection saved : ");
    console.log(Collection);

    const user = await Users.findById(Owner);

    console.log("user found");
    console.log(user);

    user.Collections.push(id);

    const userSaved = await user.save();

    console.log("userSaved");
    console.log(userSaved);

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
    return NextResponse.json({ error: error.message }, { status: 500 });
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
    let collections;
    if (id) {
      console.log(id);
      collections = await Collections.findById(id).populate({
        path: "NFTs",
        populate: {
          path: "Owner",
        },
      });
    } else {
      if (sort) {
        collections = await Collections.find({ owner })
          .sort({ CreatedAt: sort })
          .limit(1)
          .populate({
            path: "NFTs",
            populate: {
              path: "Owner",
            },
          });
        console.log(collections);
      } else {
        collections = await Collections.find({ owner }).populate({
          path: "NFTs",
          populate: {
            path: "Owner",
          },
        });
      }
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
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
