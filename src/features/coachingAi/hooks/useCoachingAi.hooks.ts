import { useTestResultStore } from "@/shared/store/testResult.store";
import { useEffect, useState } from "react";

export const useCoachingAi = (address: string) => {

    const [analysisWeather, setAnalysisWeather] = useState('');
    const [analysisSafePoint, setAnalysisSafePoint] = useState('');
    const [loading, setLoading] = useState(true);

    const {
        totalScore,
        categoryScores,
    } = useTestResultStore();

    useEffect(() => {

        const fetchAnalysis = async () => {

            try {

                const res = await fetch('/api/ai/analyzeAll', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        address,
                        totalScore,
                        categoryScores,
                    }),
                });

                const data = await res.json();

                setAnalysisWeather(data.weatherAnalysis);
                setAnalysisSafePoint(data.safeAnalysis);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        };

        fetchAnalysis();

    }, [address, totalScore, categoryScores]);

    return {
        state: {
            analysisWeather,
            analysisSafePoint,
            loading,
        },
    };
};