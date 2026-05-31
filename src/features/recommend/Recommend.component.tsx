'use client'
import './recommend.scss'
import { RecommendForm } from '@/features/recommend/components/RecommendForm';
import { RecommendResult } from '@/features/recommend/components/RecommendResult';
import { useRecommend } from '@/features/recommend/hooks/useRecommend';
import { StudentInfo } from './types/recommend.type';

interface Props {
    studentInfo: StudentInfo;
}

export const Recommend = ({ studentInfo }: Props) => {

    const {
        result,
        getRecommend,
        loading
    } = useRecommend(studentInfo);

    return (
        <div className="recommend">
            <div className="tit_sec">
                <h3>돌봄시설 추천</h3>
                <p className="desc">
                    AI로봇 세이로가 우리 아이의 하루를 <br />
                살펴보고 이동과 시간에 맞추어<br />
                맞춤 스케쥴을 추천해요.

                </p>
            </div>
            <RecommendForm
                onSubmit={getRecommend}
            />

            <RecommendResult
                result={loading ? '로딩중' : result}
            />
        </div>
    );
};