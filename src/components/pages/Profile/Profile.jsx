import React, { useContext } from 'react';
import './Profile.css';
import Header from '../../Header/Header';
import CurrentUserContext from '../../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../../utils/hooks';
import { useEffect } from 'react';
import { updateUser } from '../../../utils/MainApi';
import { useState } from 'react';

const Profile = () => {
  const context = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, setValues } = useFormWithValidation();
  const { currentUser, setCurrentUser, setIsSuccess, setIsInfoTooltipPopupOpen, handelLogout } = context;

  const [isSubmit, setIsSubmit] = useState(true);
  const isEdited = currentUser.name !== values.username || currentUser.email !== values.email;

  useEffect(() => {
    if (context.isLoggined) {
      setValues({ username: currentUser.name, email: currentUser.email });
    }
  }, [currentUser.name, currentUser.email, context.isLoggined, setValues]);

  const handleSubmit = () => {
    setIsSuccess(false);
    setIsSubmit(false);
    updateUser(values.email, values.username)
      .then((res) => {
        setCurrentUser(res);
        setIsSuccess(true);
        setIsInfoTooltipPopupOpen(true);
      })
      .catch((err) => {
        setIsInfoTooltipPopupOpen(true);
      })
      .finally(() => {
        setIsSubmit(true);
      });
  };

  return (
    <section className="profile">
      <Header />
      <>
        <div className="profile__wrapper">
          <div className="profile__header ">
            <h1 className="profile__header-title">{`Привет, ${currentUser.name}!`} </h1>
          </div>
          <form className="profile__forms">
            <div className="profile__forms-input-wrapper">
              <label className="profile__forms-label ">Имя</label>

              <input
                className="profile__forms-input "
                type="text"
                name="username"
                required
                onChange={handleChange}
                defaultValue={values.username}
                minLength="2"
                maxLength="30"
              />
            </div>
            <span
              className={`profile__forms-input-error ${errors.username ? 'profile__forms-input-error_active' : ''}`}
            >
              {errors.username}
            </span>
            <div className="profile__forms-input-wrapper">
              <label className="profile__forms-label profile__forms-label-email">E-mail</label>

              <input
                className="profile__forms-input input-email "
                type="email"
                name="email"
                required
                onChange={handleChange}
                defaultValue={values.email}
              />
            </div>
            <span className={`profile__forms-input-error ${errors.email ? 'profile__forms-input-error_active' : ''}`}>
              {errors.email}
            </span>
          </form>
          <div className="profile__button-items">
            <button
              type="button"
              className={`profile__button-edit ${
                isEdited && isValid && isSubmit ? '' : 'profile__button-enter_disabled'
              }`}
              disabled={!isEdited || !isValid || !isSubmit}
              onClick={handleSubmit}
            >
              Редактировать
            </button>
            <button className=" profile__button-quit" onClick={handelLogout}>
              Выйти из аккаунта
            </button>
          </div>
        </div>
      </>
    </section>
  );
};

export default Profile;
