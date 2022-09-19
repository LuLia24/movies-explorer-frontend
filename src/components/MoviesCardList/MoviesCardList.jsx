import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Preloader from '../Preloader/Preloader';

const resize = () => {
  const windowWidth = window.innerWidth;

  let result;
  if (windowWidth >= 1280) {
    result = { count: 12, add: 3 };
  } else if (windowWidth >= 768) {
    result = { count: 8, add: 2 };
  } else if (windowWidth >= 320) {
    result = { count: 5, add: 2 };
  }
  return result;
};

const MoviesCardList = () => {
  const [numberOfCard, setNumberOfCard] = useState(resize());
  const [counterCards, setCounterCards] = useState();
  const context = useContext(CurrentUserContext);
  const { filtredCards, randeredCards, setRanderedCards, allCards } = context;

  const route = useLocation().pathname;
  const isPageSaved = route === '/saved-movies' ? true : false;

  // first render
  useEffect(() => {
    if (isPageSaved) {
      setRanderedCards(filtredCards.filter((el) => el._id));
    } else {
      const cardsForRender = filtredCards.slice(0, numberOfCard.count);
      setCounterCards(numberOfCard.count);
      setRanderedCards(cardsForRender);
    }
  }, [filtredCards, numberOfCard.count, setRanderedCards, isPageSaved, allCards]);

  const getAdditionalCardsForRender = () => {
    let endCardsList = counterCards + numberOfCard.add;
    if (endCardsList > filtredCards.length) {
      endCardsList = filtredCards.length;
    }

    const additionalCards = filtredCards.slice(counterCards, endCardsList);
    setCounterCards(endCardsList);
    setRanderedCards((prev) => {
      return [...prev, ...additionalCards];
    });
  };

  // handel window resize
  const handelResize = () => {
    setNumberOfCard(resize());
  };

  useEffect(() => {
    window.addEventListener('resize', handelResize);
    return () => {
      window.removeEventListener('resize', handelResize);
    };
  });

  const addButton = (
    <div className="card-list__button-wrapper">
      {counterCards < filtredCards.length && (
        <button className="card-list__button" onClick={getAdditionalCardsForRender}>
          Еще
        </button>
      )}
    </div>
  );

  return (
    <section className="card-list">
      {context.isPreloaderActive ? (
        <Preloader />
      ) : (
        <div className="card-list__wrap">
          {randeredCards.length
            ? randeredCards.map((card) => {
                return <MoviesCard key={card.movieId} card={card} isPageSaved={isPageSaved} />;
              })
            : context.searchInputText && allCards.length
            ? 'Ничего не найдено'
            : context.isLoadError
            ? 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
            : ''}
        </div>
      )}

      {!isPageSaved ? addButton : null}
    </section>
  );
};

export default MoviesCardList;
