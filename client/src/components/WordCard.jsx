import { useState } from "react";
import axiosInstance from "../axiosInstance";

export default function WordCard({ word, categoryId }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hint, setHint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHint = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axiosInstance.get(
        `/categories/${categoryId}/hint`,
        { params: { wordId: word.id } }
      );

      if (response.data.success) {
        setHint(response.data.hint);
        setIsFlipped(true);
      } else {
        setError(response.data.error || "Не удалось получить подсказку");
      }
    } catch (error) {
      setError(
        error.response?.data?.error || error.message || "Ошибка запроса"
      );
      console.error("Ошибка получения подсказки:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    if (isFlipped) {
      setIsFlipped(false);
    } else {
      if (!hint) {
        fetchHint();
      } else {
        setIsFlipped(true);
      }
    }
  };

  return (
    <div 
      className={`card ${isFlipped ? 'flipped' : ''}`}
      onClick={handleClick}
    >
      <div className="card-inner">
        <div className="card-front">
          <h3>{word.name}</h3>
          <p>{word.description}</p>
          {loading && !isFlipped && (
            <div className="loading-indicator">Загрузка...</div>
          )}
        </div>
        <div className="card-back">
          {hint ? (
            <>
              <h3>{word.name}</h3>
              <p className="hint-text">{hint}</p>
            </>
          ) : (
            <p>Подсказка не найдена</p>
          )}
          {error && <div className="error-text">{error}</div>}
        </div>
      </div>
    </div>
  );
}