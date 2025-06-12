import React from "react";
import { useNavigate } from "react-router";

export default function LoginPage({ loginHandler }) {
  const navigate = useNavigate();
  return (
    <form onSubmit={(e) => loginHandler(e, navigate("/bebra"))}>
      <input name="email" type="email" placeholder="Введи email" />
      <input name="password" type="password" placeholder="Введи пароль" />
      <button type="submit">Log in</button>
    </form>
  );
}
