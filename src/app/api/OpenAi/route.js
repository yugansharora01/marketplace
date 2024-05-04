import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  organization: process.env.NEXT_PUBLIC_OPENAI_ORGANIZATION_ID,
  project: process.env.NEXT_PUBLIC_OPENAI_PROJECT_ID,
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(request) {
  const reqBody = await request.json();
  const { prompt } = reqBody;
  console.log(prompt, process.env.NEXT_PUBLIC_OPENAI_API_KEY);
  //   const imageSize =
  //     size === "small" ? "256x256" : size === "medium" ? "512x512" : "1024x1024";

  try {
    const response = await openai.images.generate({
      model: "dall-e-2",
      prompt,
      n: 1,
      size: "256x256",
    });

    const imageUrl = response.data[0].url;
    return NextResponse.json(
      {
        success: true,
        data: imageUrl,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    return NextResponse.json(
      {
        success: false,
        error: error,
      },
      {
        status: 400,
      }
    );
  }
}
