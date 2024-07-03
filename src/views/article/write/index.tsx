import { postArticleRequest } from "../../../apis";
import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import './style.css';

export default function Write() {

  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (event.target.value) setTitleError("");
  };
  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
    if (event.target.value) setContentError("");
  };

  const uploadPostClickHandler = async () => {
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
      const requestBody = { title, content };
      const result = await postArticleRequest(requestBody);

      if (result && result.code === "SU") {
        alert("업로드되었습니다.");
        navigate("/");
      } else {
        setErrorMessage("업로드 실패");
      }
    } catch (error) {
      console.error("업로드 중 오류가 발생했습니다:", error);
      setErrorMessage("업로드 중 오류가 발생했습니다");
    }
  };

  const cancelClickHandler = () => {
    navigate("/");
  };

  return (
    <div className="write-wrap">
    <div className="write-container">
      <h2>게시글 작성</h2>
      <form>
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className={`form-control ${titleError ? 'is-invalid' : ''}`}
          />
          {titleError && <div className="invalid-feedback">{titleError}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            className={`form-control ${contentError ? 'is-invalid' : ''}`}
          />
          {contentError && <div className="invalid-feedback">{contentError}</div>}
        </div>
        <div className="button-group">
          <button type="button" onClick={cancelClickHandler} className="btn btn-secondary">취소</button>
          <button type="button" onClick={uploadPostClickHandler} className="btn btn-primary">작성</button>
        </div>
      </form>
    </div>
    </div>

    // <table>
    //   <thead>
    //     <tr>
    //       <th>게시글 작성</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     <tr>
    //       <th>제목</th>
    //       <td>
    //         <input
    //           type="text"
    //           placeholder="제목을 입력해 주세요."
    //           value={title}
    //           onChange={handleTitleChange}
    //           style={{ width: "500px", height: 40, borderRadius: 5, textIndent: "10px" }}
    //         />
    //         {titleError && <div style={{ color: 'red' }}>{titleError}</div>}
    //       </td>
    //     </tr>
    //     <tr>
    //       <th>내용</th>
    //       <td>
    //         <textarea
    //           placeholder="내용을 입력해주세요."
    //           value={content}
    //           onChange={handleContentChange}
    //           style={{ width: "500px", height: 400, borderRadius: 5, textIndent: "10px" }}
    //         />
    //         {contentError && <div style={{ color: 'red' }}>{contentError}</div>}
    //       </td>
    //     </tr>
    //   </tbody>
    //   <tfoot>
    //     <tr>
    //       <td>
    //         <button onClick={cancelClickHandler}>취소</button>
    //         <button onClick={uploadPostClickHandler}>작성</button>
    //       </td>
    //     </tr>
    //   </tfoot>
    // </table>
  );
}
