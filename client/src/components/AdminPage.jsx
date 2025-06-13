import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axiosInstance from "../axiosInstance";
import WordCard from "./WordCard";
import "./AdminPage.css";

export default function AdminPage() {
  const { categoryId } = useParams();
  const [words, setWords] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWords = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/words?isModer=false");
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
    <div className="words-page">
      <div className="words-header">
        <h2>Слова на модерации</h2>
      </div>

      <div className="words-container">
        {words.length === 0 ? (
          <p>Нет слов на модерации</p>
        ) : (
          words.map((word) => (
            <div key={word.id} className="word-card-container">
              <WordCard word={word} categoryId={categoryId} />
              <div className="moderation-buttons">
                <button
                  className="approve-button"
                  onClick={() => handleApproveWord(word.id)}
                >
                  Одобрить
                </button>
                <button
                  className="delete-button"
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
