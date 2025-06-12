import { url } from "../url";
import { NextRequest, NextResponse } from "next/server";
const localUrl = url + "server";
async function GET(req: NextRequest) {
	const search = req.nextUrl.searchParams;
	const hostId = search.get("hostId");
	const res = await fetch(`${localUrl}?hostId=${hostId}`);
	const response = await res.json();
	return NextResponse.json(response, { status: 200 });
}

export { GET };
