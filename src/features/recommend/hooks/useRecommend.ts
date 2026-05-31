'use client'

import { useState } from 'react';
import { getRecommendApi } from '@/shared/services/getRecommendApi';
import { StudentInfo } from '../types/recommend.type';

interface RecommendResult {
    facilityName: string;
    reason: string;
    address: string;
}

export const useRecommend = (
    studentInfo: StudentInfo
) => {

    const [result, setResult] =
    useState<string | null>(null);

    const [loading, setLoading] =
        useState(false);

    const getRecommend = async (
        schoolTime: string,
        homeTime: string
    ) => {

        try {

            setLoading(true);

            const [siDo, gunGu] =
                studentInfo.local.split(' ');

            const facilityData =
                await getRecommendApi(
                    siDo,
                    gunGu
                );

            const facilityList =
                facilityData.items?.item ??
                facilityData.response?.body?.items?.item ??
                [];

            const school =
                new Date(
                    `2025-01-01 ${schoolTime}`
                );

            const home =
                new Date(
                    `2025-01-01 ${homeTime}`
                );

            const blankTime =
                Math.floor(
                    (home.getTime() -
                        school.getTime()) /
                        1000 /
                        60
                );

        const aiResponse =
                await fetch('/api/ai/recommend', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        home: studentInfo.address,
                        school: studentInfo.schoolAddress,
                        blankTime,
                        facilities: facilityList,
                    }),
                });

        const aiResult =
                await aiResponse.json();
            
            setResult(aiResult.text);

        } catch (error) {

            console.error(
                '추천 실패',
                error
            );

        } finally {

            setLoading(false);
        }
    };

    return {
        result,
        loading,
        getRecommend,
    };
};