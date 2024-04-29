import { downloadAndStoreFileFirebase } from "@/Utils/storeFileFirebase";
import { storage } from "@/Config/firebase.config";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  try {
    console.log("heheh");
    const reqBody = await request.json();
    let { path, fileUrl } = reqBody;
    const imageResponse = await axios.get(fileUrl, {
      responseType: "arraybuffer",
    });
    const imageBuffer = Buffer.from(imageResponse.data);
    console.log("imageResponse", imageResponse);
    console.log("imageBuffer", imageBuffer);
    const dataRef = ref(storage, path);
    const snapshot = await uploadBytes(dataRef, imageBuffer);
    const url = await getDownloadURL(snapshot.ref);
    console.log("Uploading successfull");
    return NextResponse.json(
      {
        message: "Uploading successfull",
        data: url,
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
