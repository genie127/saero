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
    const this_day = date.getDate()<10 ? '0'+date.getDate(): date.getDate();
    const this_sem = date.getMonth() < 7 ? '1' : '2';
    const today = this_year+this_month+this_day;

  const url = new URL("https://open.neis.go.kr/hub/elsTimetable");
   url.searchParams.append("KEY", process.env.NEXT_PUBLIC_NEIS_API_KEY!);
  url.searchParams.append("Type", "json");
  url.searchParams.append("pIndex", "1");
  url.searchParams.append("pSIze", "100");
  url.searchParams.append("ATPT_OFCDC_SC_CODE", studentInfo.atpt);
  url.searchParams.append("SD_SCHUL_CODE", studentInfo.schoolCode);
  url.searchParams.append("AY", this_year);
  url.searchParams.append("SEM", this_sem);
  url.searchParams.append("ALL_TI_YMD", today);
  url.searchParams.append("GRADE", studentInfo.grade);
  url.searchParams.append("CLASS_NM", studentInfo.class);
  const res = await fetch(url.toString());
  const json = await res.json();

  
  const timeTable = json.elsTimetable?.[1]?.row ?? [];
  
  return NextResponse.json(timeTable);
}
