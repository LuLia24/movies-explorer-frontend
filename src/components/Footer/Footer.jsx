import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <div className="footer__wraper">
        <div className="footer__links">
          <a href="https://practicum.yandex.ru/" className="footer__link" target="_blanck">
            Яндекс.Практикум
          </a>
          <a href="https://github.com/" className="footer__link" target="_blanck">
            Github
          </a>
          <a
            href="https://facebook.com/"
            className="footer__link  footer__link_hidden"
            target="_blanck"
          >
            Facebook
          </a>
        </div>
        <p className="footer__link-year">©2022</p>
      </div>
    </footer>
  );
};

export default Footer;
