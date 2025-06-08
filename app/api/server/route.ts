import { url } from "../url";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
const localUrl = url + "server";
async function GET(req: NextRequest) {
	const search = req.nextUrl.searchParams;
	
	const id = search.get("id")
	console.log(id)
    const res = await fetch(`${localUrl}?id=${id}`);
	const response = await res.json()
	
	return NextResponse.json(response, { status: 200 });
	
}


async function POST(req: Request) {
	const { value, hostId } = req.body;
	const res = await axios.post(localUrl, {
		value: value,
		hostId: hostId,
	});
	return res;
}

export { GET, POST };
