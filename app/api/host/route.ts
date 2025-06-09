import axios from "axios";
import { url } from "../url";
import { NextResponse, NextRequest } from "next/server";
const localUrl = url + "host";
async function GET() {
	const res = await fetch(localUrl);
	const response = await res.json();

	return NextResponse.json(response, { status: 200 });
}

async function POST(req: NextRequest) {
	const {value} = await req.json()
	const res = await axios.post(localUrl, {
		value: value
	})
	return NextResponse.next();
}

export { GET, POST };
