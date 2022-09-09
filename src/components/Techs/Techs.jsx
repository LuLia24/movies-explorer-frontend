import React from 'react';
import './Techs.css';

const Techs = () => {
  return (
    <section className="techs" id="techs">
      <div className="techs__main">
        <h2 className="techs__main-title">Технологии</h2>
        <hr className="techs__main-line" />
      </div>
      <div className="techs__container">
        <h3 className="techs__container-title">7 технологий</h3>
        <p className="techs__container-text">
          На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
        </p>
      </div>
      <div className="techs__grid">
        <ul className="techs__grid-items">
          <li className="techs__grid-item">HTML</li>
          <li className="techs__grid-item">CSS</li>
          <li className="techs__grid-item">JS</li>
          <li className="techs__grid-item">React</li>
          <li className="techs__grid-item">Git</li>
          <li className="techs__grid-item">Express.js</li>
          <li className="techs__grid-item">mongoDB</li>
        </ul>
      </div>
    </section>
  );
};

export default Techs;
