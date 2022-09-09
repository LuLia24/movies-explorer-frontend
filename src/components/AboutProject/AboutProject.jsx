import React from 'react';
import './AboutProject.css';

const AboutProject = () => {
  return (
    <div className="about" id="aboutproject">
      <div className="about__main">
        <h2 className="about__main-title">О проекте</h2>
        <hr className="about__main-line" />
      </div>
      <div className="about__container">
        <div className="about__container-stage">
          <h2 className="about__container-stage-title ">Дипломный проект включал 5 этапов</h2>
          <p className="about__container-stage-text ">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные
            доработки.
          </p>
        </div>
        <div className="about__container-time">
          <h2 className="about__container-time-title ">На выполнение диплома ушло 5 недель</h2>
          <p className="about__container-time-text ">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы
            успешно защититься.
          </p>
        </div>
      </div>
      <div className="about__scale">
        <div className="about__scale-sheme-items">
          <p className=" about__scale-sheme-item about__scale-sheme-item_black">1 неделя</p>
          <p className="about__scale-sheme-item">4 недели</p>
        </div>
        <div className="about__scale-text-items">
          <p className="about__scale-text-item about__scale-text-item_short">Back-end</p>
          <p className="about__scale-text-item">Front-end</p>
        </div>
      </div>
    </div>
  );
};

export default AboutProject;
