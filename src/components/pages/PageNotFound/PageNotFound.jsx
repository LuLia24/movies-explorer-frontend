import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PageNotFound.css';

const PageNotFound = () => {
  const navigation = useNavigate();

  const handelBackClick = () => {
    navigation(-1);
  };

  return (
    <section className="pagenotfound">
      <div className="pagenotfound__items">
        <h1 className="pagenotfound__title">404</h1>
        <p className="pagenotfound__text">Страница не найдена</p>
      </div>

      <button onClick={handelBackClick} className="pagenotfound__button">
        Назад
      </button>
    </section>
  );
};

export default PageNotFound;
