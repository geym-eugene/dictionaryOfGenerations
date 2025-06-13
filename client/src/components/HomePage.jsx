import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./HomePage.css";
import axiosInstance from "../axiosInstance";

const HomePage = () => {
  // const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  // const [selectedLetter, setSelectedLetter] = useState("all");
  const [category, setCategory] = useState([])

  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance('/categories').then((res) => setCategory(res.data))
  }, [])
  // console.log({category})

  // const alphabet = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split("");

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

const filteredCategories = selectedCategory === "all" 
  ? category 
  : category.filter(cat => cat.id.toString() === selectedCategory);

  return (
        <div>
    <div className="home-container">
      <header className="header">
        <h1>Словарь Современного Сленга</h1>
        <p className="subtitle">Исследуйте современный язык разных поколений</p>
      </header>

      {/* <div className="search-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Поиск слов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div> */}

        <div className="filters">
          <div className="category-filter">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">Все категории</option>
              {category.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.categoryName}
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
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className="category-card"
            onClick={() => handleCategoryClick(category.id)}
          >
            <h2>{category.categoryName}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
