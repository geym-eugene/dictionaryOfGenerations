import { Link } from "react-router";
import "./Header.css";

const Header = ({ user, onLogout }) => {
  return (
    <header className="main-header">
      <div className="header-container">
        <Link to="/" className="logo">
          Словарь Сленга
        </Link>

        <nav className="nav-buttons">
          <Link to="/" className="nav-button">
            Главная
          </Link>

          {user ? (
            <>
              <span className="user-greeting">Привет, {user.username}!</span>
              <button onClick={onLogout} className="nav-button logout">
                Выход
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-button">
                Вход
              </Link>
              <Link to="/signup" className="nav-button signup">
                Регистрация
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
