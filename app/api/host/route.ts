import { url } from "../url";
import axios from "axios";
import { NextResponse, NextRequest } from "next/server";
const localUrl = "http://localhost:3001/host";
async function GET() {
	const res = await fetch(localUrl);
	const response = await res.json();
	return NextResponse.json(response, { status: 200 });
}

async function POST(req: NextRequest) {
	const { value } = req.body;
	const res = await fetch(localUrl, {
		method: "POST",
        body: JSON.stringify({
            value: value
        })
	});
}

export { GET, POST };
