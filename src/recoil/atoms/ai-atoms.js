import { atom } from 'recoil';

export const travelPlanState = atom({
  key: 'travelPlanState', // 고유 키
  default: {
    TRAVEL_PURPOSE: [], // 선택된 여행 목적
    MVMN_NM: '', // 교통 수단
    AGE_GRP: '20S', // 연령대 (기본값 설정)
    GENDER: '남', // 성별 (기본값 설정)
    TRAVEL_STYL_1: 'NEUTRAL', // 여행 스타일
    TRAVEL_MOTIVE_1: '', // 여행 동기
    TRAVEL_STATUS_ACCOMPANY: '', // 동행자
    TRAVEL_STATUS_DAYS: 0, // 여행 기간
    ROAD_ADDR: '', // 전체 주소
    recommendation_type: 'AI-GENERATED', // 추천 유형 (기본값 설정)
    start_date: '', // 여행 시작 날짜
    end_date: '', // 여행 종료 날짜
  },
});