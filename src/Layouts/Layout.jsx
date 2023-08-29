import React from 'react'
import Nav from './Nav'
import Footer from '../Layouts/Footer'
import { Outlet } from 'react-router-dom'


const Layout = () => { 

  return (
    <>
    <Nav/>
    
    <Outlet/>
   
    <Footer/>
    </>    
    
  )
}

export default Layout