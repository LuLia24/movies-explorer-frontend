import React from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';
import cross from '../../images/cross.svg';

const Navigation = (props) => {
  return (
    <section className="navigation">
      <div className="navigation__wrapper">
        <img
          onClick={props.handelModalClose}
          className="navigation__close-button"
          src={cross}
          alt="лого-закрыть"
        />
        <ul className="navigation__menu">
          <li className="navigation__menu-items">
            <Link onClick={props.handelModalClose} to="/" className="navigation__menu-item">
              Главная
            </Link>
          </li>
          <li className="navigation__menu-items">
            <Link onClick={props.handelModalClose} to="/movies" className="navigation__menu-item">
              Фильмы
            </Link>
          </li>
          <li className="navigation__menu-items">
            <Link
              onClick={props.handelModalClose}
              to="/saved-movies"
              className="navigation__menu-item"
            >
              Сохранённые фильмы
            </Link>
          </li>
        </ul>
        <Link
          onClick={props.handelModalClose}
          to="/profile"
          className=" navigation__account-button"
        >
          Аккаунт
        </Link>
      </div>
    </section>
  );
};

export default Navigation;
