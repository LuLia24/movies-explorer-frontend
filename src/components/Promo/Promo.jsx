import React from 'react';
import './Promo.css';
import NavTab from '../NavTab/NavTab';

const Promo = () => {
  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__container-text">
          Учебный проект студента факультета Веб-разработки.
        </h1>
      </div>
      <NavTab />
    </section>
  );
};

export default Promo;
