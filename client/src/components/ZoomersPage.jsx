import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axiosInstance from "../axiosInstance";

export default function ZoomersPage() {
  const { categoryId } = useParams();
  const [words, setWords] = useState([]);
  const [hint, setHint] = useState(null);
  const [selectedWordId, setSelectedWordId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await axiosInstance(`/categories/${categoryId}/words`);
        setWords(response.data);
      } catch (err) {
        setError("Не удалось загрузить слова");
        console.error("Ошибка загрузки слов:", err);
      }
    };

    fetchWords();
  }, [categoryId]);

  const fetchHint = async (wordId) => {
    try {
      setLoading(true);
      setSelectedWordId(wordId);
      setHint(null);
      setError(null);

      const response = await axiosInstance.get(
        `/categories/${categoryId}/hint`,
        { params: { wordId } }
      );

      if (response.data.success) {
        setHint(response.data.hint);
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

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="words-container">
      {words.length === 0 ? (
        <p>Нет слов в этой категории</p>
      ) : (
        words.map((word) => (
          <div key={word.id} className="word-card">
            <h3>{word.name}</h3>
            <p>{word.description}</p>
            <button
              onClick={() => fetchHint(word.id)}
              disabled={loading && selectedWordId === word.id}
            >
              {loading && selectedWordId === word.id
                ? "Загрузка..."
                : "Получить подсказку"}
            </button>
            {selectedWordId === word.id && hint && (
              <div className="hint">
                <p>
                  <strong>Подсказка:</strong> {hint}
                </p>
              </div>
            )}
            {selectedWordId === word.id && error && (
              <div className="error-text">{error}</div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
