import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { startX, startY, endX, endY } = await req.json();

  const response = await fetch(
    `https://apis-navi.kakaomobility.com/v1/directions?origin=${startX},${startY}&destination=${endX},${endY}`,
    {
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
      },
    }
  );

  const data = await response.json();

  return NextResponse.json(data);
}