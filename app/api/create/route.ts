import { url } from "../url";
import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
const localUrl = url + "problem";
interface createProblem {
	problemName: string;
	problemDescription: string;
	problemQuery?: string;
	clientId?: number;
}
async function POST(req: NextRequest) {
	try {
		const data: createProblem = await req.json();
		await axios.post(localUrl, {
			clientId: data.clientId,
			problemName: data.problemName,
			problemDescription: data.problemDescription,
			problemQuery: data.problemQuery,
		});
		return NextResponse.next()
	} catch (err) {
		throw err;
	}
}

export { POST };
