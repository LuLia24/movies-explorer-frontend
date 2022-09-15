import React from 'react';
import './NavTab.css';

import { Link } from 'react-router-dom';

const NavTab = () => {
  return (
    <nav className="promo__nav">
      <ul className="promo__nav-items">
        <li className="promo__nav-item">
          <a href="#aboutproject" className="promo__nav-item-link">
            О проекте
          </a>
        </li>
        <li className="promo__nav-item">
          <a href="#techs" className="promo__nav-item-link">
            Технологии
          </a>
        </li>
        <li className="promo__nav-item">
          <a href="#aboutme" className="promo__nav-item-link">
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavTab;
