import React from 'react';
import './SearchForm.css';
import find from '../../images/find.svg';
import lens from '../../images/lens.svg';

const SearchForm = () => {
  return (
    <section className="search">
      <div className="search__wrapper">
        <form className="search__form">
          <img className="search__form-logo" src={lens} alt="увелиительное стекло" />
          <input className="search__input" required type="search" placeholder="Фильм" />
          <button className="search__button" type="submit">
            <img className="search__button-img" src={find} alt="кнопка поиска" />
          </button>
        </form>
        <div className="search__checkbox-items">
          <div className="search_checkbox-item">
            <input type="checkbox" id="highload1" name="highload1" />
            <label htmlFor="highload1" className="search__checkbox-lable"></label>
          </div>
          <span className="search__checkbox-lable-text">Короткометражки</span>
        </div>
      </div>
      <hr className="search__wrapper-line" />
    </section>
  );
};

export default SearchForm;
