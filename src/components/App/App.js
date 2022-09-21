import React, { useEffect, useState, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Home from '../pages/Home/Home';
import Movies from '../pages/Movies/Movies';
import SavedMovies from '../pages/SavedMovies/SavedMovies';
import Profile from '../pages/Profile/Profile';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import PageNotFound from '../pages/PageNotFound/PageNotFound';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import ProtectedRouteAuth from '../ProtectedRouteAuth/ProtectedRouteAuth';
import { veryficationToken } from '../../utils/MainApi';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [allCards, setAllCards] = useState([]);
  const [filtredCards, setFiltredCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [randeredCards, setRanderedCards] = useState([]);
  const [isLoggined, setIsLoggined] = useState(false);
  const [isPreloaderActive, setIsPreloaderActive] = useState(true);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [searchInputText, setSearchInputText] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isLoadError, setIsLoadError] = useState(false);

  const handelLogout = useCallback(() => {
    setCurrentUser({});
    setIsLoggined(false);
    setAllCards([]);
    setFiltredCards([]);
    setRanderedCards([]);
    setSavedCards([]);
    setSearchInputText('');
    setIsChecked(false);
    localStorage.removeItem('token');
    localStorage.removeItem('searchText');
    localStorage.removeItem('isChecked');
    localStorage.removeItem('filteredCards');
    navigate('/');
  }, [navigate]);

  const checkToken = useCallback(() => {
    setIsPreloaderActive(true);
    if (localStorage.getItem('token')) {
      const jwt = localStorage.getItem('token');
      veryficationToken(jwt)
        .then((res) => {
          setCurrentUser(res);
          setIsLoggined(true);
        })
        .catch((err) => {
          console.log(err);
          handelLogout();
        })
        .finally(() => {
          setIsPreloaderActive(false);
        });
    } else {
      setIsPreloaderActive(false);
    }
  }, [handelLogout]);

  useEffect(() => {
    if (!isLoggined) {
      checkToken();
    }
  }, [isLoggined, checkToken]);

  function closeAllPopups() {
    setIsInfoTooltipPopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isLoggined,
        setIsLoggined,
        isPreloaderActive,
        setIsPreloaderActive,
        setIsInfoTooltipPopupOpen,
        setIsSuccess,
        allCards,
        setAllCards,
        filtredCards,
        setFiltredCards,
        randeredCards,
        setRanderedCards,
        searchInputText,
        setSearchInputText,
        isChecked,
        setIsChecked,
        isLoadError,
        setIsLoadError,
        handelLogout,
        savedCards,
        setSavedCards,
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRouteAuth isLoggined={isLoggined} isPreloaderActive={isPreloaderActive} />}>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Route>
        <Route element={<ProtectedRoute isLoggined={isLoggined} isPreloaderActive={isPreloaderActive} />}>
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <InfoTooltip isSuccess={isSuccess} isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
