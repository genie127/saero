import { Recommend } from "@/features/recommend/Recommend.component";
import { cookies } from "next/headers";

export default async function RecommendPage() {

    const cookieStore = await cookies();

    const studentInfoCookie =
        cookieStore.get('studentInfo')?.value;

    const studentInfo =
        studentInfoCookie
            ? JSON.parse(studentInfoCookie)
            : null;

    if (!studentInfo) {
        return <div>학생정보 없음</div>;
    }

    return (
        <Recommend
            studentInfo={studentInfo}
        />
    );
}