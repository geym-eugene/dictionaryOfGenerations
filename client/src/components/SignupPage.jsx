// import React from 'react';

// export default function SignupPage({ signupHandler }) {
//   return (
//     <form onSubmit={signupHandler}>
//       <input name="email" type="email" placeholder="Введи email" />
//       <input name="password" type="password" placeholder="Введи пароль" />
//       <input name="name" type="text" placeholer="Введи имя пользователя" />
//       <button type="submit">Sign up</button>
//     </form>
//   );
// }

import { useNavigate } from "react-router";
import "./AuthPages.css";

const SignupPage = ({ signupHandler }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    signupHandler(e);
    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Регистрация</h1>
        <p className="auth-subtitle">Создайте свой аккаунт</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Имя пользователя</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              placeholder="Придумайте имя пользователя"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Введите ваш email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Придумайте пароль"
            />
          </div>

          <button type="submit" className="auth-button">
            Зарегистрироваться
          </button>
        </form>

        <p className="auth-switch">
          Уже есть аккаунт?{" "}
          <a href="/login" className="auth-link">
            Войти
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
