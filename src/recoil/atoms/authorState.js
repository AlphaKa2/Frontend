import { atom } from "recoil";

const authorState = atom({
  key: "authorState", // 고유 키값
  default: "", // 초기값
});

export default authorState;
