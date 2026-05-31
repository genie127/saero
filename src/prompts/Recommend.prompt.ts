export const createRecommendPrompt = ({
  home,
  school,
  blankTime,
  facilities,
}: {
  home: string;
  school: string;
  blankTime: number;
  facilities: string;
}) => `
  학생 집주소:
  ${home}

  학교주소:
  ${school}

  공백시간:
  ${blankTime}분

  돌봄시설 목록:
  ${JSON.stringify(facilities)}

  조건

  1. 학교와 가까운 시설
  2. 집과 가까운 시설
  3. 공백시간 활용 가능
  4. 안전성 고려


  추천결과 노출
  추가정보요청 금지
  내용은 간략하게 한 섹션당 100자 이내로 
  타이틀과 제목 ㅅ ㅏ이, 각 컨텐츠사이에 엔터좀 잘넣어봐

`;