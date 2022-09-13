import React from 'react';
import './MoviesCard.css';
import unsaved from '../../images/unsaved.svg';
import saved from '../../images/saved.svg';
import deleteIcon from '../../images/delete.svg';

const MoviesCard = (props) => {
  return (
    <section className="moviescard">
      <div className="moviescard__items">
        <div className="moviescard__info">
          <p className="moviescard__info-title">{props.card.title}</p>
          <p className="moviescard__info-duration">{props.card.duration}</p>
        </div>
        <img
          className="moviescard__status-logo"
          src={props.isPageSaved ? deleteIcon : props.card.isSaved ? saved : unsaved}
          alt="лого"
        />
      </div>
      <img className="moviescard__card" src={props.card.poster} alt={props.card.title} />
    </section>
  );
};

export default MoviesCard;
