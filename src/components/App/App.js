import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  
  
} from "react-router-dom";
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
import { veryficationToken } from '../../utils/MainApi';
import InfoTooltip from '../InfoTooltip/InfoTooltip';


function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [allCards, setAllCards] = useState([]);
  const [filtredCards, setFiltredCards] = useState([]);
  const [randeredCards, setRanderedCards] = useState([]);
  const [isLoggined, setIsLoggined] = useState(false);
  const [isPreloaderActive, setIsPreloaderActive] = useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);



  const checkToken = () => {
    if (localStorage.getItem('token')){
      setIsPreloaderActive(true)
      const jwt = localStorage.getItem('token')
      veryficationToken(jwt).then((res)=>{
        setCurrentUser(res)
        setIsLoggined(true)
      }).catch((err)=>{
        console.log(err)
      }).finally(()=> {
        setIsPreloaderActive(false)
      })
    }
  }

  useEffect(()=> {
    if (!isLoggined) {
      checkToken()
    }
  }, [isLoggined])

  function closeAllPopups() {
    setIsInfoTooltipPopupOpen(false);
   
  }

  

  return (
    <CurrentUserContext.Provider value={{currentUser, setCurrentUser, isLoggined, setIsLoggined, isPreloaderActive, setIsPreloaderActive, setIsInfoTooltipPopupOpen, setIsSuccess, allCards, setAllCards, filtredCards, setFiltredCards,randeredCards, setRanderedCards }}>
    <BrowserRouter>
   
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signin" element={<Login/>}/>
      <Route path="/signup" element={<Register/>}/>
      <Route
            element={
              <ProtectedRoute isLoggined={isLoggined} isPreloaderActive={isPreloaderActive} />
            }>
        <Route path="/movies" element={<Movies/>}/>
        <Route path="/saved-movies" element={<SavedMovies/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Route>
      <Route path="*" element={<PageNotFound/>}/> 
    </Routes>

  </BrowserRouter>

  <InfoTooltip isSuccess={isSuccess} isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} />
  </CurrentUserContext.Provider> 
  );



}

export default App;
