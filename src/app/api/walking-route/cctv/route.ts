import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {

  const keyword = req.nextUrl.searchParams.get('keyword')

  const url =
    `https://apis.data.go.kr/1741000/cctv_info/info` +
    `?serviceKey=${process.env.NEXT_PUBLIC_DATA_API_KEY}` +
    `&pageNo=1` +
    `&numOfRows=100` +
    `&returnType=json` +
    `&cond[LCTN_ROAD_NM_ADDR::LIKE]=${encodeURIComponent(
      keyword ?? ''
    )}`

  const response = await fetch(url)
  const data = await response.json()

  return NextResponse.json(data)
}