import React from 'react';
import './AboutMe.css';
import myphoto from '../../images/myphoto.png';

const AboutMe = () => {
  return (
    <section className="aboutme" id="aboutme">
      <div className="aboutme__main">
        <h2 className="aboutme__main-title">Студент</h2>
        <hr className="aboutme__main-line" />
      </div>
      <div className="aboutme__container">
        <img className="aboutme__container-photo" src={myphoto} alt="фото" />

        <div className="aboutme__container-items">
          <div className="aboutme__text-wraper">
            <p className="aboutme__text-name">Виталий</p>
            <p className="aboutme__text-occupation">Фронтенд-разработчик, 30 лет</p>
            <p className="aboutme__text-description">
              Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет экономики СГУ.
              У&nbsp;меня есть жена и дочь. Я&nbsp;люблю слушать музыку, а&nbsp;ещё увлекаюсь бегом.
              Недавно начал кодить. С&nbsp;2015 года работал в&nbsp;компании &laquo;СКБ
              Контур&raquo;. После того, как прошёл курс по&nbsp;веб-разработке, начал заниматься
              фриланс-заказами и&nbsp;ушёл с&nbsp;постоянной работы.
            </p>
          </div>
          <div className="aboutme__links">
            <a
              href="https://facebook.com"
              className="aboutme__links-facebook link"
              target="_blanck"
            >
              Facebook
            </a>
            <a href="https://github.com/" className="aboutme__links-githab link" target="_blanck">
              Github
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
