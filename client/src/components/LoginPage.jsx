
import { useNavigate } from "react-router";
import "./AuthPages.css";

const LoginPage = ({ loginHandler }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    loginHandler(e, () => navigate("/"));
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Вход</h1>
        <p className="auth-subtitle">Добро пожаловать обратно!</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Введите email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Введите пароль"
            />
          </div>

          <button type="submit" className="auth-button">
            Войти
          </button>
        </form>

        <p className="auth-switch">
          Нет аккаунта?{" "}
          <a href="/signup" className="auth-link">
            Зарегистрироваться
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
