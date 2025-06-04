import {generateUUID} from '@/utils/uuid';

export type TaskItem = {
  id: string;
  text: string;
  isCompleted: boolean;
};

export type GoalData = {
  id: string;
  title: string;
  icon: string;
  dDay: {
    date: string;
    remainingDays: number;
  };
  achieved: TaskItem[];
  todos: TaskItem[];
  isCompleted: boolean;
};

export const websiteProject: GoalData = {
  id: generateUUID(),
  title: '웹사이트 리뉴얼',
  icon: 'code',
  dDay: {
    date: '25.05.30',
    remainingDays: 37,
  },
  achieved: [
    {id: generateUUID(), text: '와이어프레임 완성', isCompleted: true},
    {id: generateUUID(), text: '디자인 시안 승인', isCompleted: true},
    {
      id: generateUUID(),
      text: '메인 페이지 프론트엔드 구현',
      isCompleted: true,
    },
  ],
  todos: [
    {id: generateUUID(), text: '서브 페이지 퍼블리싱', isCompleted: false},
    {id: generateUUID(), text: '반응형 레이아웃 구현', isCompleted: false},
    {id: generateUUID(), text: 'API 연동', isCompleted: false},
    {id: generateUUID(), text: '크로스 브라우저 테스트', isCompleted: false},
  ],
  isCompleted: false,
};

export const marathonPreparation: GoalData = {
  id: generateUUID(),
  title: '봄 마라톤',
  icon: 'flag-checkered',
  dDay: {
    date: '25.10.15',
    remainingDays: 175,
  },
  achieved: [
    {id: generateUUID(), text: '5km 30분 내 주파 달성', isCompleted: true},
    {id: generateUUID(), text: '러닝화 구매 완료', isCompleted: true},
    {
      id: generateUUID(),
      text: '일주일에 3회 조깅 습관 형성',
      isCompleted: true,
    },
    {
      id: generateUUID(),
      text: '식단 개선 . 단백질 섭취량 늘리기',
      isCompleted: true,
    },
    {id: generateUUID(), text: '하프 마라톤 참가 신청 완료', isCompleted: true},
  ],
  todos: [
    {id: generateUUID(), text: '10km 완주 연습', isCompleted: false},
    {id: generateUUID(), text: '하프 마라톤 완주 연습', isCompleted: false},
    {id: generateUUID(), text: '풀 마라톤 대회 신청', isCompleted: false},
    {id: generateUUID(), text: '심폐 지구력 향상 트레이닝', isCompleted: false},
    {
      id: generateUUID(),
      text: '마라톤 준비 식단 계획 세우기',
      isCompleted: false,
    },
    {
      id: generateUUID(),
      text: '마라톤 당일 복장 및 준비물 리스트 작성',
      isCompleted: false,
    },
  ],
  isCompleted: false,
};

export const academicPaper: GoalData = {
  id: generateUUID(),
  title: '인공지능 윤리에 관한 학술 논문 게재',
  icon: 'docs',
  dDay: {
    date: '25.12.20',
    remainingDays: 97,
  },
  achieved: [
    {
      id: generateUUID(),
      text: '연구 주제 선정 및 지도교수 승인받기',
      isCompleted: true,
    },
    {id: generateUUID(), text: '선행 연구 자료 50편 수집', isCompleted: true},
    {id: generateUUID(), text: '연구 방법론 설계', isCompleted: true},
    {
      id: generateUUID(),
      text: '설문조사 문항 작성 및 IRB 승인',
      isCompleted: true,
    },
    {
      id: generateUUID(),
      text: '파일럿 테스트 진행 및 결과 분석',
      isCompleted: true,
    },
    {id: generateUUID(), text: '연구 계획서 발표', isCompleted: true},
    {id: generateUUID(), text: '이론적 배경 챕터 초안 작성', isCompleted: true},
    {
      id: generateUUID(),
      text: '예비 데이터 수집 및 분석 완료',
      isCompleted: true,
    },
    {id: generateUUID(), text: '학술대회 발표자료 준비', isCompleted: true},
  ],
  todos: [
    {
      id: generateUUID(),
      text: '본 설문조사 배포 및 데이터 수집',
      isCompleted: false,
    },
    {id: generateUUID(), text: '통계 분석 실시', isCompleted: false},
    {id: generateUUID(), text: '연구 결과 챕터 작성', isCompleted: false},
    {id: generateUUID(), text: '고찰 및 결론 챕터 작성', isCompleted: false},
    {id: generateUUID(), text: '참고문헌 및 인용 확인', isCompleted: false},
    {id: generateUUID(), text: '영문 초록 작성', isCompleted: false},
    {id: generateUUID(), text: '논문 전체 교정 및 수정', isCompleted: false},
    {id: generateUUID(), text: '지도교수 피드백 반영', isCompleted: false},
    {
      id: generateUUID(),
      text: '학술지 투고 양식에 맞춰 포맷팅',
      isCompleted: false,
    },
    {id: generateUUID(), text: '투고 시스템에 논문 제출', isCompleted: false},
    {
      id: generateUUID(),
      text: '심사위원 피드백 반영 및 수정본 제출',
      isCompleted: false,
    },
    {id: generateUUID(), text: '최종 출판 승인 확인', isCompleted: false},
  ],
  isCompleted: false,
};

// 기본 데이터 선택
export const defaultGoal = marathonPreparation;
