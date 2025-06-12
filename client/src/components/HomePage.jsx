import { useState } from "react";
import { useNavigate } from "react-router";
import "./HomePage.css";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLetter, setSelectedLetter] = useState("all");
  const navigate = useNavigate();

  const categories = [
    { id: "zoomers", name: "Зумеры" },
    { id: "boomers", name: "Бумеры" },
    { id: "millennials", name: "Миллениалы" },
  ];

  // const alphabet = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split("");

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="home-container">
      <header className="header">
        <h1>Словарь Современного Сленга</h1>
        <p className="subtitle">Исследуйте современный язык разных поколений</p>
      </header>

      <div className="search-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Поиск слов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filters">
          <div className="category-filter">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">Все категории</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
{/* 
          <div className="alphabet-filter">
            <select
              value={selectedLetter}
              onChange={(e) => setSelectedLetter(e.target.value)}
            >
              <option value="all">Все буквы</option>
              {alphabet.map((letter) => (
                <option key={letter} value={letter}>
                  {letter}
                </option>
              ))}
            </select>
          </div> */}
        </div>
      </div>

      <div className="categories-grid">
        {categories.map((category) => (
          <div
            key={category.id}
            className="category-card"
            onClick={() => handleCategoryClick(category.id)}
          >
            <h2>{category.name}</h2>
            <p>Исследуйте сленг поколения {category.name.toLowerCase()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
