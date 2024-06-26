import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
const axios = require("axios");
const FormData = require("form-data");
const JWT = process.env.PINATA_JWT;

// Use the api keys by providing the strings directly
const pinataSDK = require("@pinata/sdk");
const pinata = new pinataSDK(
  "08a33bf6335d376ebbda",
  "4ecd3c226145f604f852bfa130d7e3ae0000f927a5b35cda8a50014687dae94a"
);

export async function POST(request) {
  let fs = require("fs");
  const response = await pinata.testAuthentication();
  console.log("response");
  console.log(response);

  const reqBody = await request.json();
  const { file } = reqBody;
  console.log("reqBody");
  console.log(reqBody);
  console.log("file");
  console.log(file);
  const readableStreamForFile = fs.createReadStream(file.filepath);
  const options = {
    pinataMetadata: {
      name: MyCustomName,
      keyvalues: {
        customKey: "value1",
        customKey2: "customValue2",
      },
    },
    pinataOptions: {
      cidVersion: 0,
    },
  };
  const res = await pinata.pinFileToIPFS(readableStreamForFile, options);
  console.log(res);
}
