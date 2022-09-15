import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import poster from '../../images/poster.png';
import MoviesCard from '../MoviesCard/MoviesCard';

const cardList = [
  {
    id: '1',
    title: '33 слова о дизайне',
    duration: '1ч 47м',
    poster: poster,
    isSaved: true,
  },
  {
    id: '2',
    title: '33 слова о дизайне',
    duration: '1ч 47м',
    poster: poster,
    isSaved: false,
  },
  {
    id: '3',
    title: '33 слова о дизайне',
    duration: '1ч 47м',
    poster: poster,
    isSaved: false,
  },
  {
    id: '4',
    title: '33 слова о дизайне',
    duration: '1ч 47м',
    poster: poster,
    isSaved: true,
  },
  {
    id: '5',
    title: '33 слова о дизайне',
    duration: '1ч 47м',
    poster: poster,
    isSaved: true,
  },
  {
    id: '6',
    title: '33 слова о дизайне',
    duration: '1ч 47м',
    poster: poster,
    isSaved: true,
  },
  {
    id: '7',
    title: '33 слова о дизайне',
    duration: '1ч 47м',
    poster: poster,
    isSaved: true,
  },
  {
    id: '8',
    title: '33 слова о дизайне',
    duration: '1ч 47м',
    poster: poster,
    isSaved: true,
  },
  {
    id: '9',
    title: '33 слова о дизайне',
    duration: '1ч 47м',
    poster: poster,
    isSaved: true,
  },
  {
    id: '10',
    title: '33 слова о дизайне',
    duration: '1ч 47м',
    poster: poster,
    isSaved: true,
  },
  {
    id: '11',
    title: '33 слова о дизайне',
    duration: '1ч 47м',
    poster: poster,
    isSaved: true,
  },
  {
    id: '12',
    title: '33 слова о дизайне',
    duration: '1ч 47м',
    poster: poster,
    isSaved: true,
  },
];
const addButton = (
  <div className="card-list__button-wrapper">
    <button className="card-list__button">Еще</button>
  </div>
);

const MoviesCardList = () => {
  const route = useLocation().pathname;

  const isPageSaved = route === '/saved-movies' ? true : false;

  return (
    <section className="card-list">
      <div className="card-list__wrap">
        {cardList.map((card) => {
          return <MoviesCard key={card.id} card={card} isPageSaved={isPageSaved} />;
        })}
      </div>

      {!isPageSaved ? addButton : null}
    </section>
  );
};

export default MoviesCardList;
