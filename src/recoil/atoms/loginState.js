import {atom} from 'recoil';
import {recoilPersist} from "recoil-persist";

const { persistAtom } = recoilPersist();

export const loginState = atom({
  key: "userState", // 고유 키
  default: {
    isAuthenticated: false, // 인증 여부
    accessToken: null, // 액세스 토큰
  },
  effects_UNSTABLE: [persistAtom],
});