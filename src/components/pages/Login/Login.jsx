import React, { useContext } from 'react';
import './Login.css';
import logo from '../../../images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useFormWithValidation } from '../../../utils/hooks';
import Preloader from '../../Preloader/Preloader';
import { login, veryficationToken } from '../../../utils/MainApi';
import CurrentUserContext from '../../../contexts/CurrentUserContext';

const Login = () => {
  const navigate = useNavigate();
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const context = useContext(CurrentUserContext);
  const { setCurrentUser, setIsLoggined, setIsPreloaderActive, setIsInfoTooltipPopupOpen } = context;

  const handleSubmit = () => {
    setIsPreloaderActive(true);

    login(values.email, values.password)
      .then((res) => {
        localStorage.setItem('token', res.token);
        return veryficationToken(res.token);
      })
      .then((res) => {
        setCurrentUser(res);
        setIsLoggined(true);
        resetForm();
      })
      .then((res) => {
        navigate('/movies');
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipPopupOpen(true);
      })
      .finally(() => {
        setIsPreloaderActive(false);
      });
  };
  return (
    <>
      {context.isPreloaderActive ? (
        <Preloader />
      ) : (
        <section className="login">
          <div className="login__header ">
            <Link to="/">
              <img className="login__header-logo logo" src={logo} alt="лого" />
            </Link>
            <h1 className="login__header-title">Рады видеть!</h1>
          </div>
          <form className="login__forms">
            <label className="login__forms-label ">E-mail</label>

            <input
              className="login__forms-input input-email  "
              type="email"
              name="email"
              required
              onChange={handleChange}
              defaultValue={values.email}
            />
            <span className={`login__forms-input-error ${errors.email ? 'login__forms-input-error_active' : ''}`}>
              {errors.email}
            </span>

            <label className="login__forms-label login__forms-label-password">Пароль</label>

            <input
              className="login__forms-input input-password"
              type="password"
              required
              name="password"
              onChange={handleChange}
              defaultValue={values.password}
            />
            <span className={`login__forms-input-error ${errors.password ? 'login__forms-input-error_active' : ''}`}>
              {errors.password}
            </span>
          </form>
          <div className="login__button-items">
            <button
              type="button"
              className={`login__button-enter ${isValid ? '' : 'login__button-enter_disabled'}`}
              disabled={!isValid}
              onClick={handleSubmit}
            >
              Войти
            </button>
            <div className="login__button-wrapper">
              <label className="login__button-text">Ещё не зарегистрированы?</label>
              <button className=" login__button-reg">
                <Link to="/signup" className="register__button-link">
                  Регистрация
                </Link>
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
