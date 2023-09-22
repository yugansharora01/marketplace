import mongoose from "mongoose";
import { connect } from "@/dbConfig/dbConfig";
import Collections from "@/models/collectionModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request) {
  try {
    const owner = request.nextUrl.searchParams.get("owner");
    const sort = request.nextUrl.searchParams.get("sort");
    let limit = request.nextUrl.searchParams.get("limit");
    if (limit > 50) limit = 50;
    if (!limit) limit = 10;
    let collections;
    if (owner) {
      if (sort) {
        collections = await Collections.find({ owner })
          .sort({ CreatedAt: sort })
          .limit(limit);
      } else {
        collections = await Collections.find({ owner });
      }
    } else {
      collections = await Collections.find()
        .sort({ CreatedAt: sort })
        .limit(limit);
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
