import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import find from '../../images/find.svg';
import lens from '../../images/lens.svg';
import moviesApi from '../../utils/MoviesApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { getAllMovies } from '../../utils/MainApi';

const SearchForm = () => {
  const context = useContext(CurrentUserContext);
  const {
    currentUser,
    setAllCards,
    setFiltredCards,
    allCards,
    setSearchInputText,
    setIsPreloaderActive,
    setIsChecked,
    setIsLoadError,
    savedCards,
    setSavedCards,
  } = context;
  const route = useLocation().pathname;
  const isPageSaved = route === '/saved-movies' ? true : false;

  const handleChangeSearchInputText = (e) => {
    setSearchInputText(e.target.value);
  };

  // search input
  const [isSearchEmpty, setIsSearchEmpty] = useState(true);
  useEffect(() => {
    if (context.searchInputText) {
      setIsSearchEmpty(false);
    } else {
      setIsSearchEmpty(true);
    }
  }, [context.searchInputText]);

  // checkbox
  const handleChangeCheckbox = () => {
    setIsChecked((prev) => !prev);
  };

  // cards
  const formatCards = useCallback(
    (card, _id) => {
      return {
        country: card.country ? card.country : 'default',
        director: card.director ? card.director : 'default',
        duration: card.duration ? card.duration : 0,
        year: card.year ? card.year : 'default',
        description: card.description ? card.description : 'default',
        image: card.image ? `https://api.nomoreparties.co${card.image.url}` : 'default',
        trailerLink: card.trailerLink ? card.trailerLink : 'default',
        thumbnail: card.image ? `https://api.nomoreparties.co${card.image.formats.thumbnail.url}` : 'default',
        owner: currentUser._id ? currentUser._id : 'default',
        movieId: card.id ? card.id : 0,
        nameRU: card.nameRU ? card.nameRU : 'default',
        nameEN: card.nameEN ? card.nameEN : 'default',
        _id: _id,
      };
    },
    [currentUser._id],
  );

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
    (cardArr, searchText, isShortsChecked) => {
      if (cardArr.length) {
        let result = cardArr;

        if (searchText) {
          result = cardArr.filter((el) => {
            return filterText(el, searchText);
          });
        }

        if (isShortsChecked) {
          result = result.filter(filterByDuration);
        }

        if (!isPageSaved) {
          localStorage.setItem('searchText', JSON.stringify(searchText));
          localStorage.setItem('isChecked', JSON.stringify(context.isChecked));
          localStorage.setItem('filteredCards', JSON.stringify(result));
        }

        return result;
      }
    },
    [context.isChecked, filterText, isPageSaved],
  );

  // handel movies page

  // get all cards
  const handleSearchClick = (e) => {
    e.preventDefault();

    if (!isPageSaved) {
      if (allCards.length) {
        const filteredCards = filterAll(allCards, context.searchInputText, context.isChecked);
        setFiltredCards(filteredCards);
      } else {
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

            const filteredCards = filterAll(formatedCards, context.searchInputText, context.isChecked);
            setFiltredCards(filteredCards);
          })
          .catch((err) => {
            setIsLoadError(true);
            setFiltredCards([]);
            console.log('err', err);
          })
          .finally(() => {
            setIsPreloaderActive(false);
          });
      }
    } else {
      if (allCards.length) {
        const filteredCards = filterAll(allCards, context.searchInputText, context.isChecked);
        setFiltredCards(filteredCards);
      }
    }
  };

  const [skipRender, setSkipRender] = useState(true);

  // handel inputText change and shortsCheckbox change on movies page
  useEffect(() => {
    if (!isPageSaved && allCards.length && (context.searchInputText || context.isChecked)) {
      if (skipRender) {
        setSkipRender(false);
      } else {
        const filteredCards = filterAll(allCards, context.searchInputText, context.isChecked);
        setFiltredCards(filteredCards);
      }
    }
  }, [context.searchInputText, context.isChecked, allCards, filterAll, setFiltredCards, isPageSaved, skipRender]);

  // get data from localstorege
  useEffect(() => {
    if (!isPageSaved) {
      if (localStorage.getItem('searchText')) {
        setSearchInputText(JSON.parse(localStorage.getItem('searchText')));
      }

      if (localStorage.getItem('isChecked')) {
        setIsChecked(JSON.parse(localStorage.getItem('isChecked')));
      }

      if (localStorage.getItem('filteredCards')) {
        setFiltredCards(JSON.parse(localStorage.getItem('filteredCards')));
      }
    }
  }, [setFiltredCards, setIsChecked, setSearchInputText, isPageSaved]);

  // handel saved-movies

  // get saved movies
  const handelLoadingSavedMovies = useCallback(() => {
    if (isPageSaved) {
      if (allCards.length) {
        setFiltredCards(allCards);
        setSavedCards(allCards);
      } else {
        setIsPreloaderActive(true);
        getAllMovies()
          .then((savedCards) => {
            setFiltredCards(savedCards);
            setSavedCards(savedCards);
          })
          .catch((err) => {
            setIsLoadError(true);
            setFiltredCards([]);
            console.log('err', err);
          })
          .finally(() => {
            setIsPreloaderActive(false);
          });
      }
    }
  }, [allCards, isPageSaved, setFiltredCards, setIsPreloaderActive, setIsLoadError, setSavedCards]);

  // first loading
  useEffect(() => {
    if (isPageSaved) {
      setSearchInputText('');
      setIsChecked(false);

      handelLoadingSavedMovies();
    }
  }, [isPageSaved, setSearchInputText, setIsChecked, allCards, handelLoadingSavedMovies, setFiltredCards]);

  //  handel inputText change and checkbox change on saved movies page
  useEffect(() => {
    if (isPageSaved && savedCards.length) {
      const newFilteredCards = filterAll(savedCards, context.searchInputText, context.isChecked);
      setFiltredCards(newFilteredCards);
    }
  }, [context.searchInputText, context.isChecked, allCards, filterAll, setFiltredCards, isPageSaved, savedCards]);

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
            value={context.searchInputText}
            onChange={handleChangeSearchInputText}
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
              checked={context.isChecked}
              onChange={handleChangeCheckbox}
            />
            <label htmlFor="highload1" className="search__checkbox-lable"></label>
          </div>
          <span className="search__checkbox-lable-text">Короткометражки</span>
        </div>
      </div>
      <span className={`search__forms-input-error ${isSearchEmpty ? 'search__forms-input-error_active' : ''}`}>
        Нужно ввести ключевое слово
      </span>
      <hr className="search__wrapper-line" />
    </section>
  );
};

export default SearchForm;
