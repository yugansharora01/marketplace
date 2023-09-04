import { connect } from "@/dbConfig/dbConfig";
import Collections from "@/models/collectionModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { collectionName, author, NFTs } = reqBody;

    //const { username, email, password } = reqBody;
    console.log("reqBody " + reqBody);
    console.log(reqBody);

    //check if user exists
    const collection = await Collections.findOne({ collectionName });
    console.log("bef user" + collection);
    if (collection) {
      return NextResponse.json({ error: "Collection exists" }, { status: 400 });
    }

    const newCollection = new Collections({
      collectionName,
      author,
      NFTs,
    });

    const Collection = await newCollection.save();

    console.log("Collection");
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
export const config = {
  api: {
    runtime: "edge", // Specify runtime as "edge"
  },
};
