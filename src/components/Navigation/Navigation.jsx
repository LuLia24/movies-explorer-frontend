import React from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <section className="navigation">
      <button className="navigation__close-button"></button>
      <ul className="navigation__menu">
        <li className="navigation__menu-items">
          <Link to="/" className="navigation__menu-item">
            Главная
          </Link>
        </li>
        <li className="navigation__menu-items">
          <Link to="/movies" className="navigation__menu-item">
            Фильмы
          </Link>
        </li>
        <li className="navigation__menu-items">
          <Link to="/saved-movies" className="navigation__menu-item">
            Сохранённые фильмы
          </Link>
        </li>
      </ul>
      <button className="navigation__button">Аккаунт</button>
    </section>
  );
};

export default Navigation;
