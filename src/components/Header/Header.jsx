import React, { useState } from 'react';
import './Header.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

const Header = () => {
  const isLogined = true;
  const [isModalOpened, setIsModalOpened] = useState(false);

  const handelModalOpen = () => {
    setIsModalOpened(true);
    document.body.style.overflow = 'hidden';
  };
  const handelModalClose = () => {
    setIsModalOpened(false);
    document.body.style.overflow = 'visible';
  };

  const burger = (
    <>
      <div className="header__burger" onClick={handelModalOpen}>
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
        <Link to="/profile" className="header__nav-profile ">
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
    <header className={`header`}>
      <Link to="/">
        <img className="header__logo" src={logo} alt="логотип" />
      </Link>
      {isLogined ? burger : authorization}
      {isModalOpened && <Navigation handelModalClose={handelModalClose} />}
    </header>
  );
};

export default Header;
