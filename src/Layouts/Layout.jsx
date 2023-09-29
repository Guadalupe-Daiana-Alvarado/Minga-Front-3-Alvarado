import React from 'react';
import Nav from './Nav';
import Footer from '../Layouts/Footer';
import { Outlet } from 'react-router-dom';

const isWebVersion = window.innerWidth >= 768; // Define aquí tu lógica para detectar la versión web

const Layout = () => {
  return (
    <>
      <Nav />

      <Outlet />

      <Footer />
    </>
  );
};

export default Layout;
