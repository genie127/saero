export const createMapAnalysisPrompt = ({
  accidentCount,
  cctvCount,
  illegalParkingCount,
}: {
  accidentCount: number;
  cctvCount: number;
  illegalParkingCount: number;
}) => `
통학 경로 안전도를 분석해주세요.

분석 데이터

- 어린이보호구역 사고 건수: ${accidentCount}건
- CCTV 설치 건수: ${cctvCount}건
- 안전신고 건수: ${illegalParkingCount}건

점수 계산 규칙

- 기본점수 100점
- 사고 건당 -10점
- 안전신고 건당 -10점
- CCTV가 0개인 경우 -20점

반드시 아래 형식으로 답변

안전점수: XX점

위험요인:
- ...

종합의견:
...

각각 영역별 산정된점수를 필수로 표기, 
만일 데이터 조회가 되지 않는 건 0건으로 표기
줄넘김 잘하고 간략하게 전체 200자 넘지않게
`;