import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getArticleRequest, patchArticleRequest } from "apis";
import Article from "types/interface/article.interface";
import { PostArticleRequestDto } from "apis/request/article";
import "./style.css"

export default function Update() {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [article, setArticle] = useState<Article | null>(null);
  const [postRequest, setPostRequest] = useState<PostArticleRequestDto>({
    title: "",
    content: "",
  });

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await getArticleRequest(articleId);
        const { title, content } = response as Article;
        if (!title || !content) {
          throw new Error("Invalid response structure");
        }
        setArticle(response as Article | null);
        setTitle(title);
        setContent(content);
        setPostRequest({ title, content });
      } catch (error) {
        console.error("게시물 정보를 불러오는 중 오류가 발생했습니다:", error);
        alert("게시물 정보를 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchArticle();
  }, [articleId]);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (event.target.value) setTitleError("");
    setPostRequest((prevState) => ({
      ...prevState,
      title: event.target.value,
    }));
  };

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
    if (event.target.value) setContentError("");
    setPostRequest((prevState) => ({
      ...prevState,
      content: event.target.value,
    }));
  };

  const cancelClickHandler = (articleId: number | string | undefined) => {
    if (!articleId) return;
    navigate(`/article/detail/${articleId}`);
  };

  const updatePostClickHandler = async () => {
    let hasError = false;
    if (!title) {
      setTitleError("제목을 입력해주세요.");
      hasError = true;
    }
    if (!content) {
      setContentError("내용을 입력해주세요.");
      hasError = true;
    }
    if (hasError) return;
    try {
      const result = await patchArticleRequest(articleId, { title, content });
      if (result && result.code === "SU") {
        alert("수정 완료");
        navigate(`/article/detail/${articleId}`);
      } else {
        setErrorMessage("수정 실패");
      }
    } catch (error) {
      console.error("수정 중 오류가 발생했습니다:", error);
      setErrorMessage("수정 중 오류가 발생했습니다.");
    }
  };

  if (!article) {
    return <div>게시물을 불러오는데 실패 했습니다.</div>;
  }

  return (
    <div className="article-update-wrap">
      <div className="article-update-container">
        <h2>게시물 수정</h2>
        <div className="article-update-content">
          <div className="update-row">
            <label className="update-label">제목:</label>
            <input
              className="update-input"
              type="text"
              value={title}
              onChange={handleTitleChange}
            />
            {titleError && <div className="error-message">{titleError}</div>}
          </div>
          <div className="update-row">
            <label className="update-label">내용:</label>
            <textarea
              className="update-textarea"
              value={content}
              onChange={handleContentChange}
            />
            {contentError && <div className="error-message">{contentError}</div>}
          </div>
        </div>
        <div className="update-buttons">
          <button className="button" onClick={() => cancelClickHandler(articleId)}>취소</button>
          <button className="button" onClick={updatePostClickHandler}>수정</button>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
}
