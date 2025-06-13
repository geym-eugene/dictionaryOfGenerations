import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axiosInstance from "../axiosInstance";
import WordCard from "./WordCard";
import "./ZoomersPage.css";

export default function ZoomersPage() {
  const { categoryId } = useParams();
  const [words, setWords] = useState([]);
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

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="words-container">
      {words.length === 0 ? (
        <p>Нет слов в этой категории</p>
      ) : (
        words.map((word) => (
          <WordCard 
          key={word.id} 
          word={word} 
          categoryId={categoryId}
          />
        ))
      )}
    </div>
  );
}
