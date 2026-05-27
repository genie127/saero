import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
          
    const cookieStore = await cookies();
    
    const studentInfoCookie = cookieStore.get('studentInfo')?.value;
    
    const studentInfo = studentInfoCookie
    ? JSON.parse(studentInfoCookie)
    : null;

    const date = new Date();
    const this_year = date.getFullYear().toString();
    const this_month = (date.getMonth()+1)<10 ? '0'+(date.getMonth()+1): (date.getMonth()+1);
    const from = this_year+this_month+'01'
    const to = this_year+this_month+'31'

  const url = new URL("https://open.neis.go.kr/hub/SchoolSchedule");
   url.searchParams.append("KEY", process.env.NEXT_PUBLIC_NEIS_API_KEY!);
  url.searchParams.append("Type", "json");
  url.searchParams.append("pIndex", "1");
  url.searchParams.append("pSIze", "100");
  url.searchParams.append("ATPT_OFCDC_SC_CODE", studentInfo.atpt);
  url.searchParams.append("SD_SCHUL_CODE", studentInfo.schoolCode);

  url.searchParams.append("AA_FROM_YMD", from);
  url.searchParams.append("AA_TO_YMD", to);
  const res = await fetch(url.toString());
  const json = await res.json();

  console.log(url)
  
  const meal = json.SchoolSchedule?.[1]?.row ?? [];
  
  return NextResponse.json(meal);
}
