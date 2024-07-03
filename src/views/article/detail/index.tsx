import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteArticleRequest,
  getArticleRequest
} from "apis";
import { ResponseDto } from "apis/response";
import { DeleteArticleResponseDto } from "apis/response/article";
import Article from "types/interface/article.interface";
import './style.css';


const ArticleDetail: React.FC = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const navigator = useNavigate();
  const [deletingArticleId, setDeletingArticleId] = useState<number | null>(
    null
  );
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await getArticleRequest(articleId);
        const { title, content } = response as Article;
        if (!title || !content) {
          throw new Error("Invalid response structure");
        }
        setArticle(response as Article);
        setLoading(false);
      } catch (error) {
        console.error(" 정보를 불러오는 중 오류가 발생했습니다:", error);
        alert(" 정보를 불러오는 중 오류가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [articleId]);

  const handleContentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const updatePostClickHandler = (articleId: number | string | undefined) => {
    if (!articleId) return;
    navigator(`/article/update/${articleId}`);
  };

  const deletePostClickHandler = (articleId: number | string | undefined) => {
    if (!articleId) {
      alert("해당 게시물이 없습니다.");
      return;
    }
    deleteArticleRequest(articleId).then(deleteArticleResponse);
  };

  const deleteArticleResponse = (
    responseBody: DeleteArticleResponseDto | ResponseDto | null
  ) => {
    if (responseBody && responseBody.code === "SU") {
      alert("해당 게시물이 삭제되었습니다.");
      navigator("/");
    } else {
      alert("삭제 실패");
    }
    setDeletingArticleId(null);
  };


  if (loading) {
    return <div>로딩중 ....</div>;
  }

  if (!article) {
    return <div>해당 게시물을 불러오는 데 실패했습니다.</div>;
  }

  return (
    <div className="article-detail-wrap">
    <div className="article-detail-container">
      <h2>상세보기</h2>
      <div className="article-detail-content">
        <div className="detail-row">
          <div className="detail-label">제목:</div>
          <div className="detail-value">{article.title}</div>
        </div>
        <div className="detail-row">
          <div className="detail-label">내용:</div>
          <div className="detail-value">{article.content}</div>
        </div>
      </div>
      <div className="detail-buttons">
        <div className="button" onClick={() => navigator("/")}>목록</div>
        <div className="button" onClick={() => updatePostClickHandler(articleId)}>수정</div>
        <div className="button" onClick={() => deletePostClickHandler(articleId)}>삭제</div>
      </div>
    </div>
    </div>
    
    // <div className="article-detail-container">
    //   <h2> 상세보기</h2>
    //   <table>
    //     <tbody>
    //       <tr>
    //         <th className="inquire-detail-title">제목</th>
    //         <td className="inquire-detail-content">{article.title}</td>
    //       </tr>
    //       <tr className="inquire-detail-combine-content">
    //         <th className="inquire-detail-title-content">내용</th>
    //         <td className="inquire-detail-content-content">
    //           {article.content}
    //         </td>
    //       </tr>
    //     </tbody>
    //   </table>
    //   <div
    //     className="inquire-detail-cancel"
    //     onClick={() => navigator("/")}
    //   >
    //     취소
    //   </div>
    //   {(
    //     <>
    //       <div
    //         className="inquire-detail-update"
    //         onClick={() => updatePostClickHandler(articleId)}
    //       >
    //         수정
    //       </div>
    //       <div
    //         className="inquire-detail-delete"
    //         onClick={() => deletePostClickHandler(articleId)}
    //       >
    //         삭제
    //       </div>
    //     </>
    //   )}
    // </div>
  );
};

export default ArticleDetail;
