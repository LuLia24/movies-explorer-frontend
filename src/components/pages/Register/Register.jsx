import React from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import logo from '../../../images/logo.svg';

const Register = () => {
  return (
    <section className="register">
      <div className="register__header ">
        <Link to="/">
          <img className="register__header-logo logo" src={logo} alt="лого" />
        </Link>
        <h1 className="register__header-title">Добро пожаловать!</h1>
      </div>
      <fieldset className="register__forms">
        <label className="register__forms-label ">Имя</label>
        <input className="register__forms-input " type="text" required />
        <span class="register__forms-input-error  ">Что-то пошло не так...</span>
        <label className="register__forms-label register__forms-label-email">E-mail</label>
        <input className="register__forms-input input-email " type="email" required />
        <span class="register__forms-input-error  ">Что-то пошло не так...</span>
        <label className="register__forms-label register__forms-label-password">Пароль</label>
        <input
          className="register__forms-input input-password"
          type="password"
          required
          minlength="5"
          novalidate
        />
        <span class="register__forms-input-error register__forms-input-error_active password-error">
          Что-то пошло не так...
        </span>
      </fieldset>
      <div className="register__button-items">
        <button className=" register__button-enter ">
          <Link to="/signup" className="register__button-enter-link">
            Зарегистрироваться
          </Link>
        </button>
        <div className="register__button-wrapper">
          <label className="register__button-text">Уже зарегистрированы?</label>
          <button className=" register__button-reg">
            <Link to="/signin" className="register__button-link">
              Войти
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Register;
