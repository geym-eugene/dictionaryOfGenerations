import React from 'react';

export default function SignupPage({ signupHandler }) {
  return (
    <form onSubmit={signupHandler}>
      <input name="email" type="email" placeholder="Введи email" />
      <input name="password" type="password" placeholder="Введи пароль" />
      <input name="name" type="text" placeholer="Введи имя пользователя" />
      <button type="submit">Sign up</button>
    </form>
  );
}