import mongoose from "mongoose";
import { connect } from "@/dbConfig/dbConfig";
import Users from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    let { UserName, WalletAddress } = reqBody;

    console.log(reqBody);

    //check if user exists
    const user = await Users.findOne({ WalletAddress });

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
