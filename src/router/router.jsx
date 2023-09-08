import React from 'react'
import {createBrowserRouter} from 'react-router-dom'
import Index from '../Pages/Index'
import Register from '../Pages/Registre'
import SignIn from '../Pages/SignIn'
import Layout from '../Layouts/Layout'
import Mangas from '../Pages/Mangas'
import NotAllowed from '../Pages/NotAllowed'
import Author from '../Pages/Author'

const isAuthenticated = true; //

    const Router = createBrowserRouter([
       
       {
        path: "/",
        element: <Layout isAuthenticated={isAuthenticated}/>,
        children: [
            {
                path: '/',
                element: <Index/>
            },
            {
                path: '/Register',
                element: <Register/>
            },
            {
                path: '/SignIn',
                element: <SignIn/>
            },
            {
                path: '/Mangas/:page',
                element: isAuthenticated ? <Mangas /> : <NotAllowed />
            },
            {
                path: 'authors/me',
                element: <Author/>
            }
        ]
       }
       
    ])

    export default Router

