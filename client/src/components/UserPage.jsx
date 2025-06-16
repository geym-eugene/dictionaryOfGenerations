import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axiosInstance from "../axiosInstance";
import WordCard from "./WordCard";
// import "./UserPage.css";

export default function UserPage() {
  const { wordId, userId } = useParams();
  const [words, setWords] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWords = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/likes");
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
  }, [categoryId]);

  const handleApproveWord = async (wordId) => {
    try {
      await axiosInstance.patch(`/words/${wordId}`, { isModer: true });
      setWords(words.filter((word) => word.id !== wordId));
    } catch (err) {
      setError("Не удалось подтвердить слово");
      console.error("Ошибка подтверждения слова:", err);
    }
  };

  const handleDeleteWord = async (wordId) => {
    try {
      await axiosInstance.delete(`/words/${wordId}`);
      setWords(words.filter((word) => word.id !== wordId));
    } catch (err) {
      setError("Не удалось удалить слово");
      console.error("Ошибка удаления слова:", err);
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (loading) {
    return <div className="loading-message">Загрузка...</div>;
  }

  return (
    <div className="admin-page">
      <div className="words-header">
        <h2>Слова на модерации</h2>
      </div>

      <div className="words-grid">
        {words.length === 0 ? (
          <p className="no-words">Нет слов на модерации</p>
        ) : (
          words.map((word) => (
            <div key={word.id} className="moderation-card">
              <WordCard word={word} categoryId={categoryId} />
              <div className="card-actions">
                <button
                  className="action-button approve"
                  onClick={() => handleApproveWord(word.id)}
                >
                  Одобрить
                </button>
                <button
                  className="action-button reject"
                  onClick={() => handleDeleteWord(word.id)}
                >
                  Удалить
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}