import { atom } from 'recoil';

export const travelDataState = atom({
  key: 'travelDataState', // 고유한 키
  default: null, // 초기값
});