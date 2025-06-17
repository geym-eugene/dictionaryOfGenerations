import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axiosInstance from "../axiosInstance";
import WordCard from "./WordCard";
// import "./UserPage.css";

export default function UserPage() {
  const { categoryId } = useParams();
  const [words, setWords] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWords = async () => {
    setLoading(true);
    try {
      // НЕПОНЯТНО!!!!!
      const response = await axiosInstance.get(`/users/likes`); 
      setWords(response.data);
    } catch (err) {
      setError("Не удалось загрузить слова");
      console.error("Ошибка загрузки слов:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (loading) {
    return <div className="loading-message">Загрузка...</div>;
  }

  return (
    <div className="admin-page">
      <div className="words-header">
        <h2>Избранные слова</h2>
      </div>

      <div className="words-grid">
        {words.length === 0 ? (
          <p className="no-words">Нет избранных слов</p>
        ) : (
          words.map((word) => (
            <div key={word.id} className="moderation-card">
              <WordCard word={word} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
