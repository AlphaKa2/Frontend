
import {atom, selector} from 'recoil';
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

export const userIdByNicknameSelector = selector({
  key: 'userIdByNicknameSelector',
  get: ({ get }) => {
    const user = get(loginState); // loginState를 가져옴
    if (user.nickname) {
      return user.userId; // nickname이 있으면 userId 반환
    }
    return null; // 없으면 null 반환
  },
});

export default loginState;