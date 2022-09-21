import React, { useContext } from 'react';
import './MoviesCard.css';
import unsaved from '../../images/unsaved.svg';
import saved from '../../images/saved.svg';
import deleteIcon from '../../images/delete.svg';
import { removeFavoritesCards, addFavoritesCards } from '../../utils/MainApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';

const formatDuration = (duration) => {
  const date = new Date(duration * 60 * 1000);
  return `${date.getUTCHours()}ч ${date.getUTCMinutes()}м`;
};

const MoviesCard = (props) => {
  const context = useContext(CurrentUserContext);
  const { allCards, setAllCards } = context;

  const handleFavorites = () => {
    if (props.card._id) {
      removeFavoritesCards(props.card._id)
        .then((res) => {
          const newAllCards = allCards.map((el) => {
            if (el.movieId === props.card.movieId) {
              return { ...el, _id: false };
            }
            return el;
          });
          setAllCards(newAllCards);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      addFavoritesCards(props.card)
        .then((res) => {
          const newAllCards = allCards.map((el) => {
            if (el.movieId === props.card.movieId) {
              return { ...el, _id: res._id };
            }
            return el;
          });
          setAllCards(newAllCards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <section className="moviescard">
      <div className="moviescard__items">
        <div className="moviescard__info">
          <p className="moviescard__info-title">{props.card.nameRU}</p>
          <p className="moviescard__info-duration">{formatDuration(props.card.duration)}</p>
        </div>
        <button className="moviescard__status-button">
          <img
            onClick={handleFavorites}
            className="moviescard__status-logo"
            src={props.isPageSaved ? deleteIcon : props.card._id ? saved : unsaved}
            alt="лого"
          />
        </button>
      </div>

      <a href={props.card.trailerLink} target="_blanck">
        <img className="moviescard__img" src={props.card.thumbnail} alt={props.card.nameRU} />
      </a>
    </section>
  );
};

export default MoviesCard;
