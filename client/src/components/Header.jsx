import { Link, Navigate } from "react-router";
import "./Header.css";
import { useNavigate } from "react-router";

const Header = ({ user, logoutHandler }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    logoutHandler(e, () => navigate("/login"));
  };

  return (
    <header className="main-header">
      <div className="header-container">
        <Link to="/" className="logo">
          Словарь Сленга
        </Link>

        <nav className="nav-buttons">
          {user && (
            <>
              <span className="user-greeting">Привет, {user.username}!</span>
              <Link to="/" className="nav-button">
                Главная
              </Link>
              <Link to="/personal" className="nav-button">
                Личный кабинет
              </Link>
              {user?.isAdmin && <Link to="/admin" className="nav-button">
                ADMIN
              </Link>}
              <button onClick={handleClick} className="nav-button logout">
                Выход
              </button>
              
            </>
          )}
          {!user && (
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
