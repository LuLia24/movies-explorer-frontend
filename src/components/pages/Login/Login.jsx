import React from 'react';
import './Login.css';
import logo from '../../../images/logo.svg';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <section className="login">
      <div className="login__header ">
        <Link to="/">
          <img className="login__header-logo logo" src={logo} alt="лого" />
        </Link>
        <h1 className="login__header-title">Рады видеть!</h1>
      </div>
      <fieldset className="login__forms">
        <label className="login__forms-label ">E-mail</label>
        <input className="login__forms-input input-email " type="email" required />
        <span class="login__forms-input-error  ">Что-то пошло не так...</span>
        <label className="login__forms-label login__forms-label-password">Пароль</label>
        <input className="login__forms-input " type="password" required />
        <span class="login__forms-input-error  ">Что-то пошло не так...</span>
      </fieldset>
      <div className="login__button-items">
        <button className=" login__button-enter ">Войти</button>
        <div className="login__button-wrapper">
          <label className="login__button-text">Ещё не зарегистрированы?</label>
          <button className=" login__button-reg">
            <Link to="/signup" className="register__button-link">
              Регистрация
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;
