import mongoose from "mongoose";
import { connect } from "@/dbConfig/dbConfig";
import Users from "@/models/UserModel";
import Collections from "@/models/collectionModel";
import { NextRequest, NextResponse } from "next/server";
import url from "url";

connect();

export async function GET(request) {
  try {
    const queryParams = url.parse(request.url, true).query; // To read query params
    let { owner, sort, limit } = queryParams;
    if (limit > 50) limit = 50;
    if (!limit) limit = 10;
    let collections;
    if (owner) {
      if (sort) {
        collections = await Collections.find({ owner })
          .populate("Owner")
          .sort({ CreatedAt: sort })
          .limit(limit);
      } else {
        collections = await Collections.find({ owner }).populate("Owner");
      }
    } else {
      collections = await Collections.find()
        .populate("Owner")
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
