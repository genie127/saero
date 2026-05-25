// prompts/testAnalysis.prompt.ts

import { AI_SYSTEM_PROMPT } from "@/shared/services/aiSystemPrompt";

export const createTestAnalysisPrompt = ({
  totalScore,
  categoryScores,
}: {
  totalScore: number;
  categoryScores: Record<string, number>;
}) => `
${AI_SYSTEM_PROMPT}

당신은 어린이 보행안전 전문가입니다.

총점:
${totalScore}

영역별 점수:
${JSON.stringify(categoryScores)}

위 데이터를 기반으로 분석해주세요.
200자 내외로 작성해주세요
`;