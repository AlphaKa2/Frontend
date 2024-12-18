// recoil/followState.js
import { atom } from "recoil";

export const followState = atom({
  key: "followState", // 고유 key
  default: {}, // { [userId]: true/false } 형태로 팔로우 여부를 관리
});
