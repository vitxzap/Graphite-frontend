import { NextRequest, NextResponse } from "next/server";
import { url } from "../url";
const localUrl = url + "problem";
import axios from "axios";
interface createProblem {
  problemName: string;
  problemDescription?: string;
  problemQuery?: string;
  clientId: number;
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

async function GET() {
  try {
    const rawData = await fetch(localUrl);
    const data = await rawData.json();
    return NextResponse.json(data, {status: 200});
  } catch (err) {
    throw err;
  }
}

export { GET, POST };
