import { NextRequest, NextResponse } from "next/server";

const axios = require("axios");

export async function GET(request) {
  try {
    let symbol = "ETH";
    //console.log(symbol);
    const Symbol = request.nextUrl.searchParams.get("symbol");
    if (Symbol != null) {
      symbol = Symbol;
    }
    console.log(symbol);
    console.log(Symbol);
    const url =
      "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?CMC_PRO_API_KEY=3795c294-fac9-4f04-815c-0e15ab526073&symbol=" +
      symbol.toString();
    const response = await axios.get(url);
    if (response) {
      const json = response.data;
      console.log(json);
      return NextResponse.json(
        {
          message: "Price fetched successfully",
          data: response.data.data,
          success: true,
        },
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
