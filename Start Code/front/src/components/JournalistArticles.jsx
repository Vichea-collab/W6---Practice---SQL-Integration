import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticlesByJournalist } from "../services/api";

export default function JournalistArticles() {
  const { id } = useParams();
  const [articles, setArticles] = useState([]);
  const [journalist, setJournalist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, [id]);

  const fetchArticles = async () => {
    setLoading(true);
    const data = await getArticlesByJournalist(id);
    setArticles(data);
    if (data.length > 0) {
      setJournalist({
        name: data[0].journalist_name,
        email: data[0].journalist_email,
        bio: data[0].journalist_bio,
      });
    }
    setLoading(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {journalist && (
        <div>
          <h2>{journalist.name}</h2>
          <div>Email: {journalist.email}</div>
          <div>Bio: {journalist.bio}</div>
        </div>
      )}
      <h3>Articles by {journalist?.name}</h3>
      <ul>
        {articles.map((a) => (
          <li key={a.id}>{a.title}</li>
        ))}
      </ul>
    </div>
  );
}