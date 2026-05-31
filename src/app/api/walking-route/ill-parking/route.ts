import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {


  const url =
    `	https://apis.data.go.kr/1741000/SectoralSafetyReport` +
    `?ServiceKey =${process.env.NEXT_PUBLIC_DATA_API_KEY}` +
    `&pageNo=1`+
    `&numOfRaws=10`

  const response = await fetch(url)
  const data = await response.json()

  return NextResponse.json(data)
}