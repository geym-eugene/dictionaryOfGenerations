import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";

export default function WordCard({ word: initialWord, user, categoryId }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hint, setHint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [word, setWord] = useState(initialWord);
  const [likeLoading, setLikeLoading] = useState(false);

    // это относится к лайкам
useEffect(() => {
    setWord(initialWord);
  }, [initialWord]);

  const handleCreateLike = async () => {
    if (!user?.id) {
      alert("Войдите в систему, чтобы добавлять в избранное");
      return;
    }

    setLikeLoading(true);
    try {
      console.log(word, 'word');
      const response = await axiosInstance.post("/users/likes", {
        userId: user.id,
        wordId: word.id
      });
      
      if(response.status === 200) {
        setWord(prev => ({
          ...prev,
          likesCount: prev.likesCount + 1,
          isLiked: true
        }));
      }
      
    } catch (error) {
      console.error("Ошибка при добавлении лайка:", error);
    } finally {
      setLikeLoading(false);
    }
  };

 const handleDeleteLike = async () => {
    setLikeLoading(true);
    try {
      const response = await axiosInstance.delete(`users/likes/${word.id}`)
      
      if(response.status === 200) {
        setWord(prev => ({
          ...prev,
          likesCount: prev.likesCount - 1,
          isLiked: false
        }));
      }
    } catch (error) {
      console.error("Ошибка при удалении лайка:", error);
    } finally {
      setLikeLoading(false);
    }
  };

  const toggleLike = async (e) => {
    e.stopPropagation();
    if (likeLoading) return;

    if (word.isLiked) {
      await handleDeleteLike();
    } else {
      await handleCreateLike();
    }
  };
  // это относится к лайкам
  
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
    <div className="card-wrapper">
      <div
        className={`card ${isFlipped ? "flipped" : ""}`}
        onClick={handleClick}
      >
        <div className="card-inner">
          <div className="card-front">
            <h3>{word.name}</h3>
            <p>{word.description}</p>
            <span className="likes-count">♥ {word.likesCount}</span>
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
      <button
        className={`favorite-button ${word.isLiked ? 'liked' : ''}`}
        onClick={toggleLike}
        disabled={likeLoading}
      >
        {likeLoading
          ? "..."
          : word.isLiked
          ? "Удалить из избранного"
          : "Добавить в избранное"}
      </button>
    </div>
  );
}
