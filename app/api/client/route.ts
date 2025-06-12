import { url } from "../url";
import { NextResponse } from "next/server";
const localUrl = url + "client";
async function GET() {
    const res = await fetch(localUrl);
    const response = await res.json();
    return NextResponse.json(response, { status: 200 });
}

export { GET };
