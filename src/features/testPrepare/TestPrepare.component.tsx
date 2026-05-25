'use client'

import { useState } from "react";
import { TEST_QUESTIONS } from "./constant/testList";
import { TestHeader } from "./components/TestHeader.component";
import { TestBanner } from "./components/TestBanner.component";
import { TestQuestion } from "./components/TestQuestion.component";
import { useRouter } from "next/navigation";
import { useTestResultStore } from "@/shared/store/testResult.store";

export const TestPrepare = () => {

    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);

    const router = useRouter();

    const setResult = useTestResultStore(
        state => state.setResult
    );
 
    const getGrade = (num: number) => {
        return (
            num < 22 ? 'danger' :
            num < 31 ? 'boundary' :
            num < 39 ? 'warn' :
            'safe'
        )
    }

    const currentQuestion = TEST_QUESTIONS[currentStep];

    const handleSelect = (value: number) => {
        const updated = [...answers];

        updated[currentStep] = value;

        setAnswers(updated);
    };

    const calculateCategoryScores = () => {
        const result: Record<string, number> = {};

        TEST_QUESTIONS.forEach((question, index) => {

            const category = question.categoryId;
            const score = answers[index] || 0;

            if (!result[category]) {
                result[category] = 0;
            }

            result[category] += score;
        });

        return result;
    };

    const handleNext = () => {

        if (!answers[currentStep]) {
            alert('답을 선택해주세요');
            return;
        }

        if (currentStep < TEST_QUESTIONS.length - 1) {

            setCurrentStep(prev => prev + 1);

        } else {

            const totalScore = answers.reduce(
                (acc, cur) => acc + cur,
                0
            );

            const categoryScores = calculateCategoryScores();

            const grade = getGrade(totalScore);

            const resultData = {
                totalScore,
                categoryScores,
                grade,
            };

            // zustand 저장
            setResult(resultData);

            // cookie 저장
            const value = encodeURIComponent(
                JSON.stringify(resultData)
            );

            document.cookie = `
                studentScore=${value};
                path=/;
                max-age=86400;
            `;

            router.push('/find-danger/test-prepare/result');
        }
    };

    return (
        <>
            <div className="banner">

            </div>

            <TestHeader
                current={currentStep + 1}
                total={15}
            />

            <TestQuestion
                img={<TestBanner step={currentStep + 1} />}
                question={currentQuestion}
                selected={answers[currentStep]}
                onSelect={handleSelect}
            />

            <button onClick={handleNext}>
                다음
            </button>
        </>
    )
}