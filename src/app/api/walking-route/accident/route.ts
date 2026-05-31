import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {

  const sido = req.nextUrl.searchParams.get('sido')
  const gugun = req.nextUrl.searchParams.get('gugun')

  const url =
    `https://opendata.koroad.or.kr/data/rest/frequentzone/schoolzone/child` +
    `?authKey=${process.env.NEXT_PUBLIC_KOROAD_API_KEY}` +
    `&searchYearCd=2025066`+
    `&siDo=${(
            sido ?? ''
        )}`+
    `&guGun=${(
        gugun ?? ''
    )}`+
    `&type=json`

  const response = await fetch(url)
  const data = await response.json()

  return NextResponse.json(data)
}