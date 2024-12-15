import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useNavigate, useParams } from "react-router-dom";
import { fetchEditPost, uploadImageToS3, saveEditedPost } from "../../../api/blog-services/blog/EditPostApi";
import TagInput from "../../../components/blog/TagInput";
import ToggleButton from "../../../components/blog/ToggleButton";
import CancelCheck from "../../../components/blog/CancelCheck";

const PostEditPage = () => {
  const [editPost, setEditPost] = useState({});
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const editorRef = useRef();
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [isPublic, setIsPublic] = useState(true);
  const [isCommentable, setIsCommentable] = useState(true);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // 게시글 수정 데이터 가져오기
    const loadEditPost = async () => {
      try {
        const editPostData = await fetchEditPost(postId);
        setEditPost(editPostData);
        console.log(editPostData);
      } catch (error) {
        console.error("게시글을 가져오는데 실패", error);
      }
    };

    if (postId) {
      loadEditPost();
    }
  }, [postId]);

  useEffect(() => {
    if (editPost.title) {
      setTitle(editPost.title);
    }
    if (editPost.tagNames) {
      setTags(editPost.tagNames);
    }
    if (editPost.content && editorRef.current) {
      editorRef.current.getInstance().setHTML(editPost.content);
    }
    if (editPost) {
      setIsPublic(editPost.isPublic);
      setIsCommentable(editPost.isCommentable);
    }
  }, [editPost]);

  const handleCancel = () => setIsCancelModalOpen(true);
  const checkYes = () => {
    setIsCancelModalOpen(false);
    navigate("/blog-service/api/posts/blog");
  };
  const checkNo = () => setIsCancelModalOpen(false);

  const handleEditedSave = async () => {
    const editorInstance = editorRef.current.getInstance();
    const content = editorInstance.getHTML();

    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    const editedPost = {
      title: title.trim(),
      content: content.trim(),
      isPublic,
      isCommentable,
      tagNames: tags,
    };

    try {
      const response = await saveEditedPost(postId, editedPost);
      if (response.status === 200) {
        alert("수정되었습니다.");
        navigate("/blog-service/api/posts/blog/:nickname");
      } else {
        console.error("게시글 수정 실패");
      }
    } catch (error) {
      console.error("서버 오류:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center p-[20px]">
        <div className="w-[70%] p-1 bg-[#FFFFFF] my-[5em] text-left">
          {/* Title Input */}
          <input
            type="text"
            className="w-[100%] p-[15px] mb-[10px] text-[22px] border-[2px] border-[#ccc] rounded-lg"
            placeholder="제목 입력 (1~100글자)"
            value={title}
            onChange={(e) => {
                setTitle(e.target.value);
              }
            }
          />

          {/* Tags Input */}
          <TagInput tags={tags || []} setTags={setTags} />


          {/* Toast UI Editor */}
          <Editor
            initialValue=""
            ref={editorRef}
            previewStyle="vertical"
            height="400px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            hooks={{
              addImageBlobHook: async (blob, callback) => {
                try {
                  const imageUrl = await uploadImageToS3(blob);
                  if (imageUrl) {
                    callback(imageUrl, "이미지 설명");
                  } else {
                    console.error("이미지 업로드 실패");
                  }
                } catch (error) {
                  console.error("이미지 업로드 중 오류 발생:", error);
                }
              },
            }}
          />
          <div className="mt-7 space-x-8 flex flex-row">
            <div className="flex">
              <div>게시글 공개여부:</div>
              <ToggleButton isToggled={isPublic} setIsToggled={setIsPublic} />
            </div>
            <div className="flex">
              <div>댓글 허용여부:</div>
              <ToggleButton
                isToggled={isCommentable}
                setIsToggled={setIsCommentable}
              />
            </div>
          </div>
          {/* 취소/저장 버튼 */}
          <div className="mt-7 text-right space-x-3">
            <button
              onClick={handleCancel}
              className="bg-[#E24329] text-white border-none rounded-lg px-4 py-2"
            >
              취소
            </button>

            <button
              className="bg-[#111e8d] text-white border-none rounded-lg px-4 py-2"
              onClick={handleEditedSave}
            >
              저장
            </button>
          </div>
          {/* 취소 모달 표시 */}
          {isCancelModalOpen && (
            <CancelCheck onConfirm={checkYes} onCancel={checkNo} />
          )}
        </div>
      </div>
    </>
  );
};

export default PostEditPage;
