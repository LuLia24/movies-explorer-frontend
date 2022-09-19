import React from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../images/logo.svg';
import { useFormWithValidation } from '../../../utils/hooks';
import { register, login, veryficationToken } from '../../../utils/MainApi';
import CurrentUserContext from '../../../contexts/CurrentUserContext';
import Preloader from '../../Preloader/Preloader';

const Register = () => {
  const navigate = useNavigate();
  // const [isPreloaderActive, setIsPreloaderActive] = useState(false);
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const context = React.useContext(CurrentUserContext);
  const { setCurrentUser, setIsLoggined, setIsPreloaderActive, setIsInfoTooltipPopupOpen } = context;

  const handleSubmit = () => {
    setIsPreloaderActive(true);

    register(values.email, values.password, values.username)
      .then((res) => {
        return login(values.email, values.password);
      })
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
        <section className="register">
          <div className="register__header ">
            <Link to="/">
              <img className="register__header-logo logo" src={logo} alt="лого" />
            </Link>
            <h1 className="register__header-title">Добро пожаловать!</h1>
          </div>
          <form className="register__forms">
            <label className="register__forms-label ">Имя</label>
            <input
              className="register__forms-input "
              type="text"
              name="username"
              required
              onChange={handleChange}
              defaultValue={values.username}
              minLength="2"
              maxLength="30"
              pattern="[A-Za-zА-Яа-яЁё\s-]*"
            />
            <span
              className={`register__forms-input-error ${errors.username ? 'register__forms-input-error_active' : ''}`}
            >
              {errors.username}
            </span>

            <label className="register__forms-label register__forms-label-email">E-mail</label>
            <input
              className="register__forms-input input-email "
              type="email"
              name="email"
              required
              onChange={handleChange}
              defaultValue={values.email}
            />
            <span className={`register__forms-input-error ${errors.email ? 'register__forms-input-error_active' : ''}`}>
              {errors.email}
            </span>

            <label className="register__forms-label register__forms-label-password">Пароль</label>
            <input
              className="register__forms-input input-password"
              type="password"
              required
              name="password"
              onChange={handleChange}
              defaultValue={values.password}
            />
            <span
              className={`register__forms-input-error ${errors.password ? 'register__forms-input-error_active' : ''}`}
            >
              {errors.password}
            </span>
          </form>
          <div className="register__button-items">
            <button
              type="button"
              className={`register__button-enter ${isValid ? '' : 'register__button-enter_disabled'}`}
              disabled={!isValid}
              onClick={handleSubmit}
            >
              Зарегистрироваться
            </button>
            <div className="register__button-wrapper">
              <label className="register__button-text">Уже зарегистрированы?</label>
              <button className=" register__button-reg" type="button">
                <Link to="/signin" className="register__button-link">
                  Войти
                </Link>
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Register;
