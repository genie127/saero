import { SearchLoad } from "@/features/searchLoad/SearchLoad.component";
import { cookies } from 'next/headers';

export default async function SearchLoadPage(){
    
  const cookieStore = await cookies();
  
  const studentInfoCookie = cookieStore.get('studentInfo')?.value;

  const studentInfo = studentInfoCookie
    ? JSON.parse(studentInfoCookie)
    : null;
    
    console.log(studentInfo)

    return(
        <SearchLoad studentInfo={studentInfo}/>
    )
}