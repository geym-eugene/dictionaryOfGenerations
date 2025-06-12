import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axiosInstance from "../axiosInstance";
import "./CategoryPage.css";

const CategoryPage = () => {
  const { categoryId } = useParams();
  console.log(categoryId)
  const [words, setWords] = useState([]);
  const [sortBy, setSortBy] = useState("alphabet");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentInputs, setCommentInputs] = useState({}); // Для хранения текстов комментариев

  const fetchWords = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/categories/${categoryId}/words`);
      setWords(response.data);
      setError(null);
    } catch (err) {
      setError("Ошибка при загрузке слов");
      console.error("Error fetching words:", err);
    } finally {
      setLoading(false);
    }
  };

  console.log({words})

  useEffect(() => {
    fetchWords();
  }, [categoryId]);

  const handleLike = async (wordId) => {
    try {
      // Оптимистичное обновление
      setWords(words.map(word => 
        word.id === wordId ? { ...word, likes: (word.likes || 0) + 1 } : word
      ));
      
      await axiosInstance.post(`/api/words/${wordId}/like`);
    } catch (err) {
      console.error("Ошибка при добавлении лайка:", err);
      // Откатываем изменения при ошибке
      fetchWords();
    }
  };

  // Улучшенная версия handleComment
  const handleComment = async (wordId) => {
    const comment = commentInputs[wordId];
    if (!comment?.trim()) return;

    try {
      // Оптимистичное обновление
      setWords(words.map(word => 
        word.id === wordId 
          ? { 
              ...word, 
              comments: [...(word.comments || []), comment] 
            } 
          : word
      ));
      
      await axiosInstance.post(`/api/words/${wordId}/comment`, { comment });
      
      // Очищаем поле ввода
      setCommentInputs(prev => ({ ...prev, [wordId]: "" }));
    } catch (err) {
      console.error("Ошибка при добавлении комментария:", err);
      fetchWords();
    }
  };

  // Сортировка слов
  const sortedWords = [...words].sort((a, b) => {
    switch (sortBy) {
      case "alphabet":
        return a.word.localeCompare(b.word);
      case "likes":
        return (b.likes || 0) - (a.likes || 0);
      case "date":
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      default:
        return 0;
    }
  });

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="category-page">
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
                    ❤️ {word.likes || 0}
                  </button>
                  <div className="comments-section">
                    <input
                      type="text"
                      placeholder="Добавить комментарий..."
                      value={commentInputs[word.id] || ""}
                      onChange={(e) => 
                        setCommentInputs(prev => ({ 
                          ...prev, 
                          [word.id]: e.target.value 
                        }))
                      }
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleComment(word.id);
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
