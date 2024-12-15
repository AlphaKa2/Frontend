import { selector } from 'recoil';
import { travelPlanState } from './atoms';

// 여행 요약 텍스트 생성
export const travelSummarySelector = selector({
  key: 'travelSummarySelector',
  get: ({ get }) => {
    const travelPlan = get(travelPlanState);

    // travelPlanState의 데이터를 사용하여 요약 텍스트 생성
    return `
      ${travelPlan.start_date}부터 ${travelPlan.end_date}까지 
      ${travelPlan.TRAVEL_STATUS_DAYS}일 동안 
      ${travelPlan.ROAD_ADDR}에서 여행.
    `;
  },
});