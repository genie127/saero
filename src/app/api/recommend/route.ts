
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request:NextRequest
){

      const siDo = request.nextUrl.searchParams.get('siDo');
      const gunGu = request.nextUrl.searchParams.get('gunGu');


    const url =
        `http://apis.data.go.kr/1383000/idis/serviceInstitutionService/getServiceInstitutionList`+
        `?ServiceKey=${process.env.NEXT_PUBLIC_DATA_API_KEY}`+
        `&pageNo=1`+
        `&type=json`+
        `&numOfRows=100`+
        `&ctpvNm=${siDo ?? ''}`+
        `&sggNm=${gunGu ?? ''}`;

    const response = await fetch(url);

    const data = await response.json();

    return NextResponse.json(data);
}