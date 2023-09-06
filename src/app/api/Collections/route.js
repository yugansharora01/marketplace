import { connect } from "@/dbConfig/dbConfig";
import Collections from "@/models/collectionModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { CollectionName, Description, Chain, TotalVolume, CreatedAt, NFTs } =
      reqBody;

    console.log(reqBody);

    //check if user exists
    const collection = await Collections.findOne({ CollectionName });

    if (collection) {
      return NextResponse.json({ error: "Collection exists" }, { status: 400 });
    }

    const newCollection = new Collections({
      CollectionName,
      Description,
      Chain,
      TotalVolume,
      CreatedAt,
      NFTs,
    });

    console.log("Before save");
    console.log(newCollection);

    const Collection = await newCollection.save();

    console.log("after save");
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
