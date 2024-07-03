import { getAllArticleRequest } from '../../../apis';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Article from '../../../types/interface/article.interface';
import './style.css';

const ArticleList: React.FC = () => {
  const { articleId } = useParams();
  const navigator = useNavigate();
  const [article, setArticle] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await getAllArticleRequest();
        if (!result) return;
        const { code, articles } = result;
        if (code === 'DBE') {
          alert('데이터베이스 오류입니다.');
          return;
        }
        if (code !== 'SU') return;
        setArticle(articles || []);
        setLoading(false);
      } catch (error) {
        console.error('목록을 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchPosts();
  }, []);

  const writePathClickHandler = () => {
    navigator("/article/write ");
  }
  


  return (
    <div className="article-wrap">
    <div className="article-list">
      <h2>게시글 목록</h2>
      {article.length === 0 ? (
        <div>게시글이 없습니다.</div>
      ) : (
        <ul>
          {article.map((article, index) => (
            <li key={article.articleId}>
              <div onClick={() => navigator(`/article/detail/${article.articleId}`)}>
                {index + 1}. {article.title}
              </div>
            </li>
          ))}
        </ul>
      )}
      <button onClick={writePathClickHandler}>게시글 작성하기</button>
    </div>
    </div>
  );
}

export default ArticleList;
