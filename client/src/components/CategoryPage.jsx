import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axiosInstance from "../axiosInstance";
import "./CategoryPage.css";

const CategoryPage = () => {
  const { category } = useParams();
  const [words, setWords] = useState([]);
  const [sortBy, setSortBy] = useState("alphabet");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWords();
  }, [category]);

  const fetchWords = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/api/words/category/${category}`
      );
      setWords(response.data);
      setError(null);
    } catch (err) {
      setError("Ошибка при загрузке слов");
      console.error("Error fetching words:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (wordId) => {
    try {
      await axiosInstance.post(`/api/words/${wordId}/like`);
      fetchWords(); // Обновляем список после лайка
    } catch (err) {
      console.error("Ошибка при добавлении лайка:", err);
    }
  };

  const handleComment = async (wordId, comment) => {
    try {
      await axiosInstance.post(`/api/words/${wordId}/comment`, { comment });
      fetchWords(); // Обновляем список после добавления комментария
    } catch (err) {
      console.error("Ошибка при добавлении комментария:", err);
    }
  };

  const sortedWords = [...words].sort((a, b) => {
    switch (sortBy) {
      case "alphabet":
        return a.word.localeCompare(b.word);
      case "likes":
        return b.likes - a.likes;
      case "date":
        return new Date(b.createdAt) - new Date(a.createdAt);
      default:
        return 0;
    }
  });

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="category-page">
      <h1 className="category-title">
        {category === "boomers" && "Сленг Бумеров"}
        {category === "zoomers" && "Сленг Зумеров"}
        {category === "millennials" && "Сленг Миллениалов"}
      </h1>

      <div className="sort-controls">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="alphabet">По алфавиту</option>
          <option value="likes">По лайкам</option>
          <option value="date">По дате добавления</option>
        </select>
      </div>

      <div className="words-grid">
        {sortedWords.map((word) => (
          <div key={word.id} className="word-card">
            <div className="card-inner">
              <div className="card-front">
                <h3>{word.word}</h3>
              </div>
              <div className="card-back">
                <p className="definition">{word.definition}</p>
                <div className="card-actions">
                  <button
                    className="like-button"
                    onClick={() => handleLike(word.id)}
                  >
                    ❤️ {word.likes}
                  </button>
                  <div className="comments-section">
                    <input
                      type="text"
                      placeholder="Добавить комментарий..."
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleComment(word.id, e.target.value);
                          e.target.value = "";
                        }
                      }}
                    />
                    <div className="comments-list">
                      {word.comments?.map((comment, index) => (
                        <p key={index} className="comment">
                          {comment}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
