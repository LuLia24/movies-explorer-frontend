import React from 'react';
import './Main.css';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
// import Navigation from '../Navigation/Navigation';

const Main = () => {
  return (
    <main className="main">
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      {/* <Navigation /> */}
    </main>
  );
};

export default Main;
