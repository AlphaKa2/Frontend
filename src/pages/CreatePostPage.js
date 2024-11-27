// import React, { useRef, useState, useEffect } from "react";
// import { Editor } from "@toast-ui/react-editor";
// import "@toast-ui/editor/dist/toastui-editor.css";
// import { useNavigate } from "react-router-dom";
// import axios from "./axios";
// import apiClient from "./axios";
// import { v4 as uuidv4 } from "uuid";
// import { jwtDecode } from "jwt-decode";
// import TagInput from "./TagInput";
// import goBack from "../assets/images/left-arrow.png";
// import ToggleButton from "./ToggleButton";

// const MAX_FILE_SIZE = 100 * 1024 * 1024; // 10MB
// const ALLOWED_FILE_TYPES = [
//   "image/jpeg",
//   "image/jpg",
//   "image/png",
//   "image/gif",
// ];

// const CreatePostPage = () => {
//   const editorRef = useRef();
//   const [title, setTitle] = useState("");
//   const [tags, setTags] = useState([]); // 태그 배열 상태 추가
//   const [isPublic, setIsPublic] = useState(true);
//   const [isCommentable, setIsCommentable] = useState(true);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       try {
//         jwtDecode(token);
//       } catch (error) {
//         console.error("토큰 디코딩 오류:", error);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     const style = document.createElement("style");
//     style.innerHTML = `.tui-md-switch { display: none !important; }`;
//     document.head.appendChild(style);

//     return () => {
//       document.head.removeChild(style);
//     };
//   }, []);

//   const validateFile = (file) => {
//     const fileType = file.type;
//     if (!ALLOWED_FILE_TYPES.includes(fileType)) {
//       alert("jpg, jpeg, png, gif 형식의 파일만 업로드 가능합니다.");
//       return false;
//     }
//     if (file.size > MAX_FILE_SIZE) {
//       alert("파일 크기는 최대 10MB까지 허용됩니다.");
//       return false;
//     }
//     return true;
//   };

//   const uploadImageToS3 = async (file) => {
//     if (!validateFile(file)) {
//       return null;
//     }
//     const uniqueIdentifier = uuidv4();
//     const fileExtension = file.name.split(".").pop();
//     const fileName = `${uniqueIdentifier}.${fileExtension}`;
//     try {
//       const { data: presignedData } = await apiClient.post(
//         "/blog-service/api/posts/presigned-url",
//         {
//           fileName,
//           contentType: file.type,
//         }
//       );
//       const presignedUrl = presignedData.data.url;
//       console.log('Presigned URL 담기는지 확인:', presignedUrl);


//       const uploadResponse = await apiClient.put(presignedUrl, file, {
//         headers: { "Content-Type": file.type },
//       });

//        // S3 업로드 응답 로그
//        console.log('S3 업로드 응답 상태:', uploadResponse.status);
//        console.log('S3 업로드 응답 데이터:', uploadResponse.data);
     

//        const imageUrl = `https://alphaka-storage.s3.amazonaws.com/posts/${fileName}`; // S3에 저장된 최종 이미지 URL
//        return imageUrl; // 이미지 URL 반환
//     } catch (error) {
//       if (error.response) {
//         console.error('S3 업로드 실패: 응답 상태 코드', error.response.status);
//         console.error('S3 업로드 실패: 응답 데이터', error.response.data);
//       } else {
//         console.error('S3 업로드 중 발생한 오류:', error.message);
//       }
//       return null;
//     }
//   };

//   const handleSave = async () => {
//     const editorInstance = editorRef.current.getInstance();
//     const content = editorInstance.getMarkdown();

//     if (!title.trim()) {
//       alert("제목을 입력해주세요.");
//       return;
//     }

//     if (!content.trim()) {
//       alert("내용을 입력해주세요.");
//       return;
//     }

//     const postData = {
//       title: title.trim(),
//       content: content.trim(),
//       isPublic: isPublic,
//       isCommentable: isCommentable,
//       tagNames: tags, // 태그 배열 추가
//     };

//     try {
//       const response = await apiClient.post(
//         "/blog-service/auth/api/posts",
//         postData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       if (response.status === 200) {
//         console.log("게시글 저장 성공");
//         navigate("/posts-page");
//       } else {
//         console.error("게시글 저장 실패");
//       }
//     } catch (error) {
//       console.error("서버 오류:", error);
//     }
//   };

//   return (
//     <>
//       <div className="flex justify-center p-[20px]">
//         <div className="w-[70%] p-1 bg-[#FFFFFF] my-[5em] text-left">
//           {/* Title Input */}
//           <input
//             type="text"
//             className="w-[100%] p-[15px] mb-[10px] text-[22px] border-[2px] border-[#ccc] rounded-lg"
//             placeholder="제목 입력 (1~100글자)"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />

//           {/* Tags Input */}
//           <TagInput tags={tags} setTags={setTags} />

//           {/* Toast UI Editor */}
//           <Editor
//             initialValue="글내용을 입력해주세요."
//             ref={editorRef}
//             previewStyle="vertical"
//             height="400px"
//             initialEditType="wysiwyg"
//             useCommandShortcut={true}
//             hooks={{
//               addImageBlobHook: async (blob, callback) => {
//                 try {
//                   const imageUrl = await uploadImageToS3(blob);
//                   if (imageUrl) {
//                     callback(imageUrl, "이미지 설명");
//                   } else {
//                     console.error("이미지 업로드 실패");
//                   }
//                 } catch (error) {
//                   console.error("이미지 업로드 중 오류 발생:", error);
//                 }
//               },
//             }}
//           />
//           <div className="mt-7 space-x-8 flex flex-row">
//             <div className="flex">
//               <div>게시글 공개여부:</div>
//               <ToggleButton isToggled={isPublic} setIsToggled={setIsPublic} />
//             </div>
//             <div className="flex">
//               <div>댓글 허용여부:</div>
//             <ToggleButton
//               isToggled={isCommentable}
//               setIsToggled={setIsCommentable}
//             />
//             </div>
//           </div>
//           {/* 취소/저장 버튼 */}
//           <div className="mt-7 text-right space-x-3">
//             <button className="bg-[#E24329] text-white border-none rounded-lg px-4 py-2">
//               취소
//             </button>
//             <button
//               className="bg-[#111e8d] text-white border-none rounded-lg px-4 py-2"
//               onClick={handleSave}
//             >
//               저장
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CreatePostPage;