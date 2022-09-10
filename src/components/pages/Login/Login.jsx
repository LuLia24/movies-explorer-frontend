import React from 'react';
import './Login.css';
import logo from '../../../images/logo.svg';

const Login = () => {
  return (
    <section className="login">
      <div className="login__header ">
        <img className="login__header-logo logo" src={logo} alt="лого" />
        <h1 className="login__header-title">Рады видеть!</h1>
      </div>
      <fieldset className="login__forms">
        <label className="login__forms-label ">E-mail</label>
        <input className="login__forms-input" type="email" required />
        <label className="login__forms-label login__forms-label-password">Пароль</label>
        <input className="login__forms-input" type="password" required />
      </fieldset>
      <div className="login__button-items">
        <button className=" login__button-enter ">Войти</button>
        <div className="login__button-wrapper">
          <label className="login__button-text">Ещё не зарегистрированы?</label>
          <button className=" login__button-reg">Регистрация</button>
        </div>
      </div>
    </section>
  );
};

export default Login;
