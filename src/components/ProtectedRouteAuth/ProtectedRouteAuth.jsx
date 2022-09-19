import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';

const ProtectedRouteAuth = (props) => {
  return props.isPreloaderActive && !props.isLoggined ? (
    <Preloader />
  ) : !props.isLoggined ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRouteAuth;
