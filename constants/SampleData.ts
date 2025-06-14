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
  createdDate: string;
  dDay: {
    date: string;
    remainingDays: number;
  };
  achieved: TaskItem[];
  todos: TaskItem[];
  isCompleted: boolean;
};

export const readingGoal: GoalData = {
  id: generateUUID(),
  title: '책 10권 읽기',
  icon: 'book-open',
  createdDate: '25.01.01',
  dDay: {
    date: '25.12.31',
    remainingDays: 290,
  },
  achieved: [
    {id: generateUUID(), text: '독서 계획 세우기', isCompleted: true},
    {id: generateUUID(), text: '도서관 회원 가입', isCompleted: true},
    {id: generateUUID(), text: '5권 완독', isCompleted: true},
  ],
  todos: [
    {id: generateUUID(), text: '매주 100 페이지씩 읽기', isCompleted: false},
    {id: generateUUID(), text: '독서 기록장 작성', isCompleted: false},
    {id: generateUUID(), text: '다양한 장르 도전', isCompleted: false},
    {id: generateUUID(), text: '독서 모임 참여', isCompleted: false},
  ],
  isCompleted: false,
};

export const websiteProject: GoalData = {
  id: generateUUID(),
  title: '웹사이트 리뉴얼',
  icon: 'code',
  createdDate: '25.01.01',
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
  createdDate: '24.12.01',
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
  title: '인공지능 윤리에 관한 학술 논문sdds 게재sdsdsssss',
  icon: 'book',
  createdDate: '24.11.15',
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

export const languageLearning: GoalData = {
  id: generateUUID(),
  title: '영어 회화 마스터',
  icon: 'language',
  createdDate: '24.10.01',
  dDay: {
    date: '25.09.01',
    remainingDays: 131,
  },
  achieved: [
    {id: generateUUID(), text: '기초 문법 복습 완료', isCompleted: true},
    {
      id: generateUUID(),
      text: '매일 30분 듣기 실천 30일 달성',
      isCompleted: true,
    },
    {id: generateUUID(), text: '영어 일기 10편 작성', isCompleted: true},
  ],
  todos: [
    {
      id: generateUUID(),
      text: '원어민 회화 수업 10회 수강',
      isCompleted: false,
    },
    {id: generateUUID(), text: 'TED 강연 5편 청취 및 요약', isCompleted: false},
    {id: generateUUID(), text: '영어 독서 2권 완독', isCompleted: false},
    {id: generateUUID(), text: '영어 스터디 그룹 참여', isCompleted: false},
  ],
  isCompleted: false,
};

export const readingChallenge: GoalData = {
  id: generateUUID(),
  title: '2025 독서 챌린지',
  icon: 'book',
  createdDate: '24.12.31',
  dDay: {
    date: '24.12.31',
    remainingDays: 210,
  },
  achieved: [
    {id: generateUUID(), text: '1월: "어린 왕자" 완독', isCompleted: true},
    {id: generateUUID(), text: '2월: "데미안" 완독', isCompleted: true},
    {id: generateUUID(), text: '3월: "총, 균, 쇠" 완독', isCompleted: true},
  ],
  todos: [
    {
      id: generateUUID(),
      text: '4월: "미드나잇 라이브러리" 읽기',
      isCompleted: false,
    },
    {id: generateUUID(), text: '5월: "자기 혁명" 읽기', isCompleted: false},
    {
      id: generateUUID(),
      text: '6월: "호밀밭의 파수꾼" 읽기',
      isCompleted: false,
    },
    {id: generateUUID(), text: '연말 독서 감상문 작성', isCompleted: false},
  ],
  isCompleted: false,
};

export const photoExhibition: GoalData = {
  id: generateUUID(),
  title: '개인 사진전 개최',
  icon: 'camera',
  createdDate: '24.09.01',
  dDay: {
    date: '25.11.30',
    remainingDays: 245,
  },
  achieved: [
    {id: generateUUID(), text: '출품작 컨셉 기획', isCompleted: true},
    {id: generateUUID(), text: '촬영 장비 점검', isCompleted: true},
    {id: generateUUID(), text: '촬영지 섭외', isCompleted: true},
  ],
  todos: [
    {id: generateUUID(), text: '작품 10점 촬영', isCompleted: false},
    {id: generateUUID(), text: '사진 후보 선정', isCompleted: false},
    {id: generateUUID(), text: '전시회 장소 예약', isCompleted: false},
    {id: generateUUID(), text: '홍보 포스터 제작', isCompleted: false},
  ],
  isCompleted: false,
};

export const certificateExam: GoalData = {
  id: generateUUID(),
  title: '정보처리기사 자격증 취득',
  icon: 'certificate',
  createdDate: '24.08.15',
  dDay: {
    date: '25.06.15',
    remainingDays: 126,
  },
  achieved: [
    {id: generateUUID(), text: '필기 교재 구입', isCompleted: true},
    {id: generateUUID(), text: '필기 1회독 완료', isCompleted: true},
    {id: generateUUID(), text: '기출문제 3회분 풀이', isCompleted: true},
  ],
  todos: [
    {id: generateUUID(), text: '실기 교재 정리', isCompleted: false},
    {id: generateUUID(), text: '실기 모의고사 2회', isCompleted: false},
    {id: generateUUID(), text: '시험 접수', isCompleted: false},
    {id: generateUUID(), text: '최종 복습', isCompleted: false},
  ],
  isCompleted: false,
};

// 기본 데이터 선택
export const defaultGoal = marathonPreparation;
