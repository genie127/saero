import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("keyword");

  if (!keyword) {
    return NextResponse.json({ error: "keyword required" }, { status: 400 });
  }

  const url = new URL("https://open.neis.go.kr/hub/schoolInfo");

  url.searchParams.append("KEY", process.env.NEIS_API_KEY!);
  url.searchParams.append("Type", "json");
  url.searchParams.append("pIndex", "1");
  url.searchParams.append("pSize", "50");
  url.searchParams.append("SCHUL_NM", keyword);

  const res = await fetch(url.toString());
  const json = await res.json();

  const schools = json.schoolInfo?.[1]?.row ?? [];

  return NextResponse.json(schools);
}