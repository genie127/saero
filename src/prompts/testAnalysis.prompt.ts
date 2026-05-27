// prompts/testAnalysis.prompt.ts

import { AI_SYSTEM_PROMPT } from "@/shared/services/aiSystemPrompt";

export const createTestAnalysisPrompt = ({
  totalScore,
  categoryScores,
promptTxt,
}: {
  totalScore: number;
  categoryScores: Record<string, number>;
  promptTxt:string;
}) => `
${AI_SYSTEM_PROMPT}

당신은 어린이 보행안전 전문가입니다.

총점:
${totalScore}

영역별 점수:
${JSON.stringify(categoryScores)}


${promptTxt}


`;