export type GoalData = {
  title: string;
  dDay: {
    date: string;
    remainingDays: number;
  };
  achieved: string[];
  todos: string[];
};

export const websiteProject: GoalData = {
  title: '웹사이트 리뉴얼',
  dDay: {
    date: '2025-05-30',
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
  title: '봄 마라톤 완주하기',
  dDay: {
    date: '2025-10-15',
    remainingDays: 175,
  },
  achieved: [
    '5km 30분 내 주파 달성',
    '러닝화 구매 완료',
    '일주일에 3회 조깅 습관 형성',
    '식단 개선 - 단백질 섭취량 늘리기',
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
  dDay: {
    date: '2025-12-20',
    remainingDays: 241,
  },
  achieved: [
    '연구 주제 선정 및 지도교수 승인',
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
