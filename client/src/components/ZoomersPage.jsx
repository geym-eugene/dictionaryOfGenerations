import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axiosInstance from "../axiosInstance";
import WordCard from "./WordCard";
import "./ZoomersPage.css";

export default function ZoomersPage({ user }) {
  const { categoryId } = useParams();
  const [words, setWords] = useState([]);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [newWord, setNewWord] = useState({
    name: "",
    description: "",
    categoryId,
  });
  const fetchWords = async () => {
    try {
      const response = await axiosInstance(`/categories/${categoryId}/words`);
      setWords(response.data);
    } catch (err) {
      setError("Не удалось загрузить слова");
      console.error("Ошибка загрузки слов:", err);
    }
  };

  useEffect(() => {
    fetchWords();
  }, [categoryId]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWord((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(`/words`, newWord);
      await fetchWords();
      setShow(false);
      setNewWord({ name: "", description: "" });
    } catch (err) {
      setError("Не удалось добавить слово");
      console.error("Ошибка добавления слова:", err);
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="words-page">
      <div className="words-header">
        <h2>Слова категории</h2>
        <button className="add-word-button" onClick={() => setShow(true)}>
          Добавить новое слово
        </button>
      </div>

      <div className="words-container">
        {words.length === 0 ? (
          <p>Нет слов в этой категории</p>
        ) : (
          words.map((word) => (
            <WordCard key={word.id} word={word} categoryId={categoryId} user={user}/>   // это относится к лайкам ЮЗЕР ПРОПСОМ ПРОКИДЫВАЕМ
          ))
        )}
      </div>

      {show && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Добавить новое слово</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Слово:</label>
                <input
                  type="text"
                  name="name"
                  value={newWord.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Описание:</label>
                <textarea
                  name="description"
                  value={newWord.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="submit">Сохранить</button>
                <button type="button" onClick={() => setShow(false)}>
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
