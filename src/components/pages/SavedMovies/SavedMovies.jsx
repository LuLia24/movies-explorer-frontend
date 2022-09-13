import React from 'react';
import './SavedMovies.css';
import Header from '../../Header/Header';
import SearchForm from '../../SearchForm/SearchForm';
// import Preloader from '../../Preloader/Preloader';
import MoviesCardList from '../../MoviesCardList/MoviesCardList';
import Footer from '../../Footer/Footer';

const SavedMovies = () => {
  return (
    <>
      <Header />
      <main className="main">
        <SearchForm />
        <MoviesCardList />
      </main>
      {/* <Preloader /> */}

      <Footer />
    </>
  );
};

export default SavedMovies;
