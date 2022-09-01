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



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/movies" element={<Movies/>}/>
      <Route path="/saved-movies" element={<SavedMovies/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/signin" element={<Login/>}/>
      <Route path="/signup" element={<Register/>}/>
        
       
       
    </Routes>
  </BrowserRouter>
   
  );
}

export default App;
