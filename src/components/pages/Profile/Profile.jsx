import React from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import Header from '../../Header/Header';

const Profile = () => {
  return (
    <section className="profile">
      <Header />
      <>
        <div className="profile__wrapper">
          <div className="profile__header ">
            <h1 className="profile__header-title">Привет, Виталий! </h1>
          </div>
          <fieldset className="profile__forms">
            <div className="profile__forms-input-wrapper">
              <label className="profile__forms-label ">Имя</label>
              <input className="profile__forms-input " type="text" required />
            </div>
            <div className="profile__forms-input-wrapper">
              <label className="profile__forms-label profile__forms-label-email">E-mail</label>
              <input className="profile__forms-input " type="email" required />{' '}
            </div>
          </fieldset>
          <div className="profile__button-items">
            <button className=" profile__button-edit ">Редактировать</button>
            <button className=" profile__button-quit">
              <Link to="/signin" className="profile__button-link">
                Выйти из аккаунта
              </Link>
            </button>
          </div>
        </div>
      </>
    </section>
  );
};

export default Profile;
