import { AI_SYSTEM_PROMPT } from "@/shared/services/aiSystemPrompt";

export const createWeatherAnalysisPrompt = ({
  address,
}: {
  address: string;
}) => `

당신은 어린이 보행안전 전문가입니다.

주소
${address}

위 주소에서 구단위의 지역의 오늘 날씨를 토대로 아이가 등교길에 주의해야할 사항을 간략하게 뽑아 정리해주세요.
ex) 인천광역시 부평구 부영로35일 경우, 부평구 날씨 토대로 등교기 주의사항 내용 정리
100자 내외로 작성해주세요
`;