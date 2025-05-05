export type GoalData = {
  title: string;
  description: string; // 👈 추가됨
  dDay: {
    date: string;
    remainingDays: number;
  };
  achieved: string[];
  todos: string[];
};

export const websiteProject: GoalData = {
  title: '🖥️웹사이트 리뉴얼웹사이트 리뉴얼웹사이트 리뉴얼',
  description:
    '회사의 온라인 브랜딩을 강화하기 위해 기존 웹사이트를 전면 개편하는 프로젝트입니다.',
  dDay: {
    date: '25.05.30',
    remainingDays: 37,
  },
  achieved: [
    '와이어프레임 완성',
    '디자인 시안 승인',
    '메인 페이지 프론트엔드 구현',
  ],
  todos: [
    '서브 페이지 퍼블리싱',
    '반응형 레이아웃 구현',
    'API 연동',
    '크로스 브라우저 테스트',
  ],
};

export const marathonPreparation: GoalData = {
  title: 'aaaaㅂㅂqq봄 마라톤가나다라마바',
  description:
    '완주는 목표일 뿐, 과정 속 꾸준함과 건강한 삶의 습관을 만들어가는 여정입니다.', // 짧은 설명
  dDay: {
    date: '25.10.15',
    remainingDays: 175,
  },
  achieved: [
    '5km 30분 내 주파 달성',
    '러닝화 구매 완료',
    '일주일에 3회 조깅 습관 형성',
    '식단 개선 . 단백질 섭취량 늘리기',
    '하프 마라톤 참가 신청 완료',
  ],
  todos: [
    '10km 완주 연습',
    '하프 마라톤 완주 연습',
    '풀 마라톤 대회 신청',
    '심폐 지구력 향상 트레이닝',
    '마라톤 준비 식단 계획 세우기',
    '마라톤 당일 복장 및 준비물 리스트 작성',
  ],
};

export const academicPaper: GoalData = {
  title: '인공지능 윤리에 관한 학술 논문 게재',
  description:
    'AI 기술이 급속도로 발전함에 따라 윤리적 문제들이 대두되고 있습니다. 본 연구는 이러한 흐름 속에서 인간 중심의 윤리 기준을 어떻게 설정하고 적용할 수 있는지를 실증적 데이터를 통해 분석하는 데 목적이 있습니다. 기술과 인간의 공존을 위한 사회적·법적 기반 마련에 기여하고자 합니다.', // 긴 설명
  dDay: {
    date: '25.12.20',
    remainingDays: 111241,
  },
  achieved: [
    '연구 주제 선정 및 지도교수 승인받기',
    '선행 연구 자료 50편 수집',
    '연구 방법론 설계',
    '설문조사 문항 작성 및 IRB 승인',
    '파일럿 테스트 진행 및 결과 분석',
    '연구 계획서 발표',
    '이론적 배경 챕터 초안 작성',
    '예비 데이터 수집 및 분석 완료',
    '학술대회 발표자료 준비',
  ],
  todos: [
    '본 설문조사 배포 및 데이터 수집',
    '통계 분석 실시',
    '연구 결과 챕터 작성',
    '고찰 및 결론 챕터 작성',
    '참고문헌 및 인용 확인',
    '영문 초록 작성',
    '논문 전체 교정 및 수정',
    '지도교수 피드백 반영',
    '학술지 투고 양식에 맞춰 포맷팅',
    '투고 시스템에 논문 제출',
    '심사위원 피드백 반영 및 수정본 제출',
    '최종 출판 승인 확인',
  ],
};

// 기본 데이터 선택
export const defaultGoal = marathonPreparation;
