import { CoachingAi } from "@/features/coachingAi/coachingAi.component";
import { PageLayout } from "@/shared/components/pageLayout/PageLayout.component";
import { cookies } from "next/headers";

export default async function  CoachingAiPage(){
        
    const cookieStore = await cookies();
    
    const studentInfoCookie = cookieStore.get('studentInfo')?.value;
    
    const studentInfo = studentInfoCookie
    ? JSON.parse(studentInfoCookie)
    : null;
    
    const address = studentInfo.address

    return(
        <PageLayout>
            <CoachingAi address={address}/>
        </PageLayout>
    )
}