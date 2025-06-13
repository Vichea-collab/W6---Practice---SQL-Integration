import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticleWithJournalist } from "../services/api";

export default function ArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchArticle();
  }, []);


  const fetchArticle = async () => {
    try {
      setLoading(true);
      const found = await getArticleWithJournalist(id);
      if (found) {
        setArticle(found);
        setError("");
      } else {
        setArticle(null);
        setError("Article not found.");
      }
    } catch (err) {
      setError("Failed to fetch article.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading article...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!article) return <div>No article found.</div>;

  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.content}</p>
      <div>
        <strong>Journalist:</strong>{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate(`/journalists/${article.journalist_id}/articles`)}
        >
          {article.journalist_name}
        </span>
        <div>Email: {article.journalist_email}</div>
        <div>Bio: {article.journalist_bio}</div>
      </div>
      <div>
        <strong>Category:</strong> {article.category}
      </div>
    </div>
  );
}
