import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import loginState from "../../recoil/atoms/loginState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
  faMoon,
  faSun,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import GetUserProfileApi from "../../api/blog-services/profile/GetUserProfile";
import UpdateUserProfileApi from "../../api/blog-services/profile/UpdateUserProfileApi";
import RequestS3urlApi from "../../api/blog-services/profile/RequestS3urlApi";
import RequestImageUpdateApi from "../../api/blog-services/profile/RequestImageUpdateApi";
import UpdateUserImageApi from "../../api/blog-services/profile/UpdateUserImageApi";
import CancelAccountApi from "../../api/blog-services/profile/CancelAccountApi";
import themeState from "../../recoil/atoms/themeState";
import notificationState from "../../recoil/atoms/notificationState";

const ProfileEditPage = () => {
  const [nickname, setNickname] = useState("");
  const [profileDescription, setProfileDescription] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false); // 모달 상태
  const [uploadedFile, setUploadedFile] = useState(null); // 업로드된 파일 상태
  const [errors, setErrors] = useState({
    nickname: false,
    profileDescription: false,
  });

  const { userId } = useRecoilValue(loginState);

  const navigate = useNavigate();
  const location = useLocation();

  // useEffect( async () => {
  //     try{
  //     const {status, data} = await GetUserProfileApi(userId);
  //     if (status == 200) {
  //     nickname = data.nickname;
  //     profileDescription = data.profileDescription;
  //     }} catch(error) {
  //       alert(error);
  //     }
  //   } ,([]));

  // 닉네임, 소개글 렌더링
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const { status, data } = await GetUserProfileApi(userId);
        if (status === 200) {
          setNickname(data.nickname);
          setProfileDescription(data.profileDescription);
          setProfileImageUrl(data.profileImage);
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };
    fetchProfileData();
  }, [userId]);

  // 이미지 삭제 함수
  const handleImageDelete = () => {
    setProfileImageUrl("https://alphaka-storage.s3.amazonaws.com/profile/80924099-9220-4b82-9f49-28332ae6bb53defaultProfile");

  };

  // 이미지 수정 함수
  const handleImageEdit = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = async (event) => {
      const file = event.target.files[0];
      if (file) {
        try {
          setUploadedFile(file); // 업로드된 파일 상태에 저장
          const { status, data } = await RequestS3urlApi(file.name, file.type);
          console.log("Response from RequestS3urlApu:", data);
          const s3Url = data.uploadUrl;
          console.log("Extracted S3 URL:", s3Url);
          if (status === 200) {
            try {
              const { status } = await RequestImageUpdateApi(s3Url, file); // S3에 이미지 업로드
              if (status === 200) {
                console.log("프로필 업로드 완료");
              }
              setProfileImageUrl(URL.createObjectURL(file)); // UI에 이미지 미리보기
              const cleanUrl = new URL(s3Url).origin + new URL(s3Url).pathname;
              setProfileImageUrl(cleanUrl); // 쿼리 파라미터 제외된 URL 저장
            } catch (error) {
              console.error(error.message);
            }
          }
        } catch (error) {
          console.error(error);
          alert(error.message);
        }
      }
    };
    fileInput.click();
  };

  // 이미지 업로드 함수
  const handleImageUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImageUrl(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  // 이미지 저장 핸들링 함수
  const handleImageSave = async () => {
    console.log("handleImageSave 실행");
    if (!uploadedFile) {
      alert("이미지를 먼저 업로드하세요.");
      return;
    }
    try {
      console.log("Before 이미지 저장 API call");
      const response = await UpdateUserImageApi(userId, profileImageUrl);
      console.log("이미지 저장 API 응답:", response);

      if (response.status === 200) {
        alert("프로필 사진이 변경되었습니다.");
      }
    } catch (error) {
      alert(error);
    }
  };

  // 비밀번호 변경
  const handleUpdatePassword = () => {
    navigate("/change-password");
  };

  // 회원탈퇴
  const handleCancelAccount = () => {
    setIsCancelModalOpen(true);
  };

  // 회원탈퇴-돌아가기
  const handleCloseCancelModal = () => {
    setIsCancelModalOpen(false);
  };

  // 회원탈퇴-회원탈퇴
  const handleConfirmCancelAccount = async () => {
    try {
      const {status} = await CancelAccountApi();
      if (status === 200) {
        alert("회원 탈퇴가 완료되었습니다.");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // 취소하기 모달
  const handleCloseClick = () => {
    setIsModalOpen(true);
  };

  // 취소하기 모달 취소
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 취소하기 모달 확인
  const handleConfirmCancel = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  // 프로필 저장 함수
  const handleSave = async () => {
    console.log("handleSave 실행");
    const newErrors = {
      nickname: !nickname,
      profileDescription: !profileDescription,
    };

    setErrors(newErrors);

    if (newErrors.nickname || newErrors.profileDescription) {
      return;
    }

    try {
      console.log("Before 유저 프로필 업데이트 API call");
      const response = await UpdateUserProfileApi(
        userId,
        nickname,
        profileDescription
      );
      console.log("유저 프로필 업데이트 API response:", response); // 추가된 디버깅 로그
      if (response.data.status === 200) {
        return alert("프로필이 저장되었습니다.");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      {/* 취소 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white w-96 rounded-lg p-6 shadow-lg">
            <p className="text-gray-800 font-medium text-lg mb-4">
              정말 취소하시겠습니까?
            </p>
            <div className="flex mt-6 justify-evenly">
              <button
                onClick={handleCloseModal}
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300"
              >
                돌아가기
              </button>
              <button
                onClick={handleConfirmCancel}
                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
              >
                취소하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 회원탈퇴 모달 */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white w-96 rounded-lg p-6 shadow-lg">
            <p className="text-gray-800 font-center text-lg mb-1">
              회원을 탈퇴하시겠습니까?
            </p>
            <p className="text-gray-400 font-center text-sm mb-4">
              회원탈퇴시 정보가 복구되지 않습니다
            </p>
            <div className="flex mt-6 justify-evenly">
              <button
                onClick={handleCloseCancelModal}
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300"
              >
                돌아가기
              </button>
              <button
                onClick={handleConfirmCancelAccount}
                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
              >
                탈퇴하기
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full h-screen max-w-7xl bg-white rounded-lg shadow-lg p-10 mt-12">
        <h2 className="flex text-3xl text-blue-600 mb-8 text-left">
          프로필 변경
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 좌측 섹션 */}
          <div className="space-y-8 ">
            {/* 프로필 사진 */}
            <div className="border rounded-lg p-6 flex flex-col">
              <div className="flex justify-between items-center w-full mb-4">
                <div className="text-gray-700 font-semibold text-lg">
                  프로필 사진
                </div>
                <button
                  className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  onClick={handleImageSave}
                >
                  저장
                </button>
              </div>

              <div className="w-28 h-28 bg-gray-200 rounded-full mb-4 flex items-center justify-center mx-auto">
                {profileImageUrl ? (
                  <img
                    src={profileImageUrl}
                    alt="프로필 이미지"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <p className="text-gray-400 text-sm">프로필 사진</p>
                )}
              </div>

              <div className="flex items-center space-x-4 text-blue-500 justify-center">
                <button onClick={handleImageDelete}>삭제</button>
                <button onClick={handleImageEdit}>수정</button>
              </div>

              {/* 드래그 앤 드롭 영역 */}
              <div
                className="mt-6 bg-gray-100 w-full p-4 rounded-lg text-center border-dashed border-2 border-gray-300"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const files = e.dataTransfer.files;
                  if (files.length) {
                    handleImageUpload(files[0]); // 이미지 업로드 핸들링 함수 호출
                  }
                }}
              >
                <FontAwesomeIcon
                  icon={faUpload}
                  className="text-blue-500 mb-2"
                />
                <p className="text-sm text-gray-400">
                  여기에 이미지를 드래그 앤 드롭하거나
                  <br />
                  SVG, PNG, JPG 혹은 GIF (최대 800x800px) 업로드 버튼을
                  클릭하세요.
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files[0])}
                  className="hidden"
                />
              </div>
            </div>

            <div className="border rounded-lg p-6 space-y-6">
              {/* 알림 수신 여부 */}
              <div>
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-800">알림 수신 여부</p>
                  <label className="relative inline-block w-10 h-6">
                    <input
                      type="checkbox"
                      checked={notificationsEnabled}
                      onChange={() =>
                        setNotificationsEnabled(!notificationsEnabled)
                      }
                      className="hidden"
                    />
                    <span
                      className={`absolute left-0 top-0 bottom-0 w-full rounded-full cursor-pointer transition ${
                        notificationsEnabled ? "bg-blue-500" : "bg-gray-300"
                      }`}
                    ></span>
                    <span
                      className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition transform ${
                        notificationsEnabled ? "translate-x-4" : ""
                      }`}
                    ></span>
                  </label>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  알림 수신 여부에 따라 블로그 알림이 전송됩니다.
                </p>
              </div>

              {/* 화면 모드 */}
              <div>
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-800">화면 모드</p>
                  <label className="relative inline-flex items-center cursor-pointer">
  <input
    type="checkbox"
    checked={darkMode}
    onChange={() => setDarkMode(!darkMode)}
    className="hidden"
  />
<label className="relative inline-flex items-center cursor-pointer">
  <input
    type="checkbox"
    checked={darkMode}
    onChange={() => setDarkMode(!darkMode)}
    className="hidden"
  />
  {/* 라이트 모드 상태 (Dark 버튼) */}
  <button
    type="button"
    className={`hs-dark-mode ${darkMode ? "hidden" : "flex"} bg-gray-300 text-black px-4 py-2 rounded-lg items-center space-x-2`}
    onClick={() => setDarkMode(true)}
  >
    {/* 해 모양 */}
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="5" />
      <path
        d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M16.36 16.36l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M16.36 7.64l1.42-1.42"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
    <span></span>
  </button>

  {/* 다크 모드 상태 (Light 버튼) */}
  <button
    type="button"
    className={`hs-dark-mode ${darkMode ? "flex" : "hidden"} bg-blue-500 text-white px-4 py-2 rounded-lg items-center space-x-2`}
    onClick={() => setDarkMode(false)}
  >
    {/* 달 모양 */}
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M21.75 12.73a9.72 9.72 0 01-9.75 9.75A9.72 9.72 0 012.25 12a7.5 7.5 0 0011.5-11.5 9.72 9.72 0 018 12.23z"
      />
    </svg>
    <span>Dark</span>
  </button>
</label>

</label>

                </div>
                <p className="text-sm text-gray-400 mt-2">
                  화면 테마를 선택할 수 있습니다.
                </p>
              </div>

              {/* 비밀번호 변경 */}
              <div>
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-800">비밀번호 변경</p>
                  <label className="relative inline-block w-32 h-4">
                    <button
                      onClick={handleUpdatePassword}
                      className="w-full text-center bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600"
                    >
                      비밀번호 변경
                    </button>
                  </label>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  비밀번호를 재설정합니다.
                </p>
              </div>

              {/* 회원 탈퇴 */}
              <div>
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-800">비밀번호 변경</p>
                  <label className="relative inline-block w-32 h-4">
                    <button
                      onClick={handleCancelAccount}
                      className="w-full text-center bg-gray-500 text-white py-3 rounded-md hover:bg-red-600"
                    >
                      회원탈퇴
                    </button>
                  </label>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  탈퇴 시 모든 정보가 삭제되며 복구되지 않습니다.
                </p>
              </div>
            </div>
          </div>

          {/* 우측 섹션 */}
          <div className="space-y-8">
            {/* 닉네임 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                닉네임
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                  if (e.target.value.trim()) {
                    setErrors((prev) => ({ ...prev, nickname: false }));
                  }
                }}
                className="w-full border rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.nickname && (
                <p className="text-red-500 text-sm mt-2">
                  * 필수 항목을 입력해주세요.
                </p>
              )}
            </div>

            {/* 소개 글 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                소개 글
              </label>
              <textarea
                value={profileDescription}
                onChange={(e) => {
                  setProfileDescription(e.target.value);
                  if (e.target.value.trim()) {
                    setErrors((prev) => ({
                      ...prev,
                      profileDescription: false,
                    }));
                  }
                }}
                rows="6"
                className="w-full h-96 border rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            {errors.profileDescription && (
              <p className="text-red-500 text-sm mt-2">
                * 필수 항목을 입력해주세요.
              </p>
            )}
            {/* 버튼 그룹 */}
            <div className="flex justify-end space-x-4 ">
              <button
                onClick={handleCloseClick}
                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditPage;
