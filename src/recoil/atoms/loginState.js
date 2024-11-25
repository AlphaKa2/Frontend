import {atom} from 'recoil';
import {recoilPersist} from "recoil-persist";

const { persistAtom } = recoilPersist();

const loginState = atom({
  key: "userState", // 고유 키
  default: {
    isAuthenticated: false, // 인증 여부
    userId: null,
    nickname: null,
    profileImageUrl: null,
    accessToken: null, // 액세스 토큰
  },
  effects_UNSTABLE: [persistAtom],
});

export default loginState;