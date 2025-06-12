// import React from "react";
// import { useNavigate } from "react-router";

// export default function LoginPage({ loginHandler }) {
//   const navigate = useNavigate();
//   return (
//     <form onSubmit={(e) => loginHandler(e, navigate("/bebra"))}>
//       <input name="email" type="email" placeholder="Введи email" />
//       <input name="password" type="password" placeholder="Введи пароль" />
//       <button type="submit">Log in</button>
//     </form>
//   );
// }

import { useNavigate } from "react-router";
import "./AuthPages.css";

const LoginPage = ({ signupHandler }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    signupHandler(e, () => navigate("/"));
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Вход</h1>
        <p className="auth-subtitle">Добро пожаловать обратно!</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Имя пользователя</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              placeholder="Введите имя пользователя"
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
