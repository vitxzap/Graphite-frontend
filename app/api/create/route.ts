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
		const c = await axios.post(localUrl, {
			clientId: data.clientId,
			problemName: data.problemName,
			problemDescription: data.problemDescription,
			problemQuery: data.problemQuery,
		});
		const status = c.status;
		if (status != 201) {
			throw new Error(`Erro código: ${c.status}`);
		}
		return NextResponse.json({ status: status });
	} catch (err) {
		throw err;
	}
}

export { POST };
