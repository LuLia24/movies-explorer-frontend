import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import find from '../../images/find.svg';
import lens from '../../images/lens.svg';
import moviesApi from '../../utils/MoviesApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { getAllMovies } from '../../utils/MainApi';

const SearchForm = () => {
  const [searchInputText, setSearchInputText] = useState('');
  const handleChange = (e) => {
    setSearchInputText(e.target.value.trim());
  };

  const context = useContext(CurrentUserContext);
  const {
    currentUser,
    setAllCards,
    setFiltredCards,
    allCards,

    setIsPreloaderActive,
  } = context;
  const route = useLocation().pathname;
  const isPageSaved = route === '/saved-movies' ? true : false;

  // search input
  const [isSearchEmpty, setIsSearchEmpty] = useState(true);
  useEffect(() => {
    if (searchInputText) {
      setIsSearchEmpty(false);
    } else {
      setIsSearchEmpty(true);
    }
  }, [searchInputText]);

  // checkbox
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckbox = () => {
    setIsChecked((prev) => !prev);
  };

  // cards
  const formatCards = (card, _id) => {
    return {
      country: card.country ? card.country : 'default',
      director: card.director ? card.director : 'default',
      duration: card.duration ? card.duration : 0,
      year: card.year ? card.year : 'default',
      description: card.description ? card.description : 'default',
      image: card.image ? `https://api.nomoreparties.co${card.image.url}` : 'default',
      trailerLink: card.trailerLink ? card.trailerLink : 'default',
      thumbnail: card.image
        ? `https://api.nomoreparties.co${card.image.formats.thumbnail.url}`
        : 'default',
      owner: currentUser._id ? currentUser._id : 'default',
      movieId: card.id ? card.id : 0,
      nameRU: card.nameRU ? card.nameRU : 'default',
      nameEN: card.nameEN ? card.nameEN : 'default',
      _id: _id,
    };
  };

  const filterText = useCallback((card, searchText) => {
    let result = false;
    if (card.nameRU.toUpperCase().includes(searchText.toUpperCase())) {
      result = true;
    } else if (card.nameEN.toUpperCase().includes(searchText.toUpperCase())) {
      result = true;
    } else if (card.description.toUpperCase().includes(searchText.toUpperCase())) {
      result = true;
    } else if (card.director.toUpperCase().includes(searchText.toUpperCase())) {
      result = true;
    }
    return result;
  }, []);

  const filterByDuration = (card) => {
    let shorts = false;
    if (card.duration <= 40) {
      shorts = true;
    }
    return shorts;
  };

  const filterAll = useCallback(
    (cardArr, searchText) => {
      if (cardArr.length && searchText !== ' ') {
        let result = [];
        let filteredByText = cardArr.filter((el) => {
          return filterText(el, searchText);
        });

        if (isChecked) {
          const filteredByDuration = filteredByText.filter(filterByDuration);
          result = filteredByDuration;
        } else {
          result = filteredByText;
        }

        localStorage.setItem('searchText', JSON.stringify(searchText));
        localStorage.setItem('isChecked', JSON.stringify(isChecked));
        localStorage.setItem('filteredCards', JSON.stringify(result));

        return result;
      }
    },
    [isChecked, filterText]
  );

  // get all cards
  const handleSearchClick = (e) => {
    e.preventDefault();
    if (!isPageSaved) {
      setIsPreloaderActive(true);

      Promise.all([moviesApi.getInitialCards(), getAllMovies()])
        .then(([initialCard, savedCards]) => {
          const formatedCards = initialCard.map((el) => {
            const arrSaved = savedCards.filter((savedItem) => {
              return savedItem.movieId === el.id;
            });

            const _id = arrSaved.length ? arrSaved[0]._id : false;

            return formatCards(el, _id);
          });

          setAllCards(formatedCards);

          const filteredCards = filterAll(formatedCards, searchInputText);
          setFiltredCards(filteredCards);
        })
        .catch((err) => {
          console.log('err', err);
        })
        .finally(() => {
          setIsPreloaderActive(false);
        });
    }
  };

  useEffect(() => {
    if (searchInputText && allCards.length) {
      const filteredCards = filterAll(allCards, searchInputText);
      setFiltredCards(filteredCards);
    } else if (localStorage.getItem('searchText') || localStorage.getItem('isChecked')) {
      const searchTextFromStorage = JSON.parse(localStorage.getItem('searchText'));
      if (searchTextFromStorage) {
        setSearchInputText(searchTextFromStorage);
      }

      const checkboxFromStorage = JSON.parse(localStorage.getItem('isChecked'));
      if (checkboxFromStorage) {
        setIsChecked(checkboxFromStorage);
      }

      const cardsFromStorage = JSON.parse(localStorage.getItem('filteredCards'));
      if (cardsFromStorage) {
        setFiltredCards(cardsFromStorage);
      }
    }
  }, [searchInputText, isChecked, allCards, filterAll, setFiltredCards]);

  return (
    <section className="search">
      <div className="search__wrapper">
        <form className="search__form">
          <img className="search__form-logo" src={lens} alt="увелиительное стекло" />
          <input
            className="search__input"
            required
            type="search"
            placeholder="Фильм"
            name="search"
            defaultValue={searchInputText}
            onChange={handleChange}
          />

          <button
            className={`search__button  ${isSearchEmpty ? 'search__button_disable' : ''}`}
            type="submit"
            disabled={isSearchEmpty}
            onClick={handleSearchClick}
          >
            <img className="search__button-img" src={find} alt="кнопка поиска" />
          </button>
        </form>
        <div className="search__checkbox-items">
          <div className="search_checkbox-item">
            <input
              type="checkbox"
              id="highload1"
              name="checkbox"
              checked={isChecked}
              onChange={handleCheckbox}
            />
            <label htmlFor="highload1" className="search__checkbox-lable"></label>
          </div>
          <span className="search__checkbox-lable-text">Короткометражки</span>
        </div>
      </div>
      <span
        className={`search__forms-input-error ${
          isSearchEmpty ? 'search__forms-input-error_active' : ''
        }`}
      >
        Нужно ввести ключевое слово
      </span>
      <hr className="search__wrapper-line" />
    </section>
  );
};

export default SearchForm;
