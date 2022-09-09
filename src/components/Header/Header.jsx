import React from 'react';
import './Header.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

const Header = () => {
  const isLogined = false;

  const burger = (
    <>
      <div className="header__burger">
        <span className="header__burger-bar"></span>
        <span className="header__burger-bar"></span>
        <span className="header__burger-bar"></span>
      </div>

      <nav className="header__nav">
        <ul className="header__nav-items">
          <li className="header__nav-item">
            <Link to="/movies" className="header__nav-item-movie">
              Фильмы
            </Link>
          </li>
          <li className="header__nav-item">
            <Link to="/saved-movies" className="header__nav-item-movie">
              Сохраненные фильмы
            </Link>
          </li>
        </ul>
        <Link to="/profile" className="header__header__nav-profile">
          Аккаунт
        </Link>
      </nav>
    </>
  );

  const authorization = (
    <div className="header__auth">
      <ul className="header__auth-links">
        <li className="header__auth-item">
          <Link to="/signup" className="header__auth-link-signup">
            Регистрация
          </Link>
        </li>
        <li className="header__auth-item">
          <Link to="/signin" className="header__auth-link-signin">
            Войти
          </Link>
        </li>
      </ul>
    </div>
  );

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />

      {isLogined ? burger : authorization}
    </header>
  );
};

export default Header;
