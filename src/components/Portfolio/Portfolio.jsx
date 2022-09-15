import React from 'react';
import './Portfolio.css';
import arrow from '../../images/arrow.svg';

const Portfolio = () => {
  return (
    <section className="portfolio">
      <h3 className="portfolio__header">Портфолио</h3>
      <ul className="portfolio__container">
        <li className="portfolio__container-item">
          <a
            href="https://github.com/LuLia24/how-to-learn"
            className="portfolio__container-link "
            target="_blanck"
          >
            <span className="portfolio__container-text">Статичный сайт</span>
            <img className="portfolio__container-logo" src={arrow} alt="стрелка" />
          </a>
        </li>
        <li className="portfolio__container-item">
          <a
            href="https://github.com/LuLia24/russian-travel"
            className="portfolio__container-link"
            target="_blanck"
          >
            <span className="portfolio__container-text">Адаптивный сайт</span>
            <img className="portfolio__container-logo" src={arrow} alt="стрелка" />
          </a>
        </li>
        <li className="portfolio__container-item">
          <a
            href="https://github.com/LuLia24/react-mesto-api-full"
            className="portfolio__container-link "
            target="_blanck"
          >
            <span className="portfolio__container-text">Одностраничное приложение</span>
            <img className="portfolio__container-logo" src={arrow} alt="стрелка" />
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;
