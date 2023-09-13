import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Index from '../Pages/Index'
import SignIn from '../Pages/SignIn'
import Layout from '../Layouts/Layout'
import Mangas from '../Pages/Mangas'
import Page from '../Pages/Page'
import Register from '../Pages/Register'
import NotAllow from '../Pages/NotAllow'

const Router = createBrowserRouter([

    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Index />
            },
            {
                path: '/Register',
                element: <Register />
            },
            {
                path: '/SignIn',
                element: <SignIn />
            },
            {
                path: '/Mangas',
                element: <Mangas />
            },
            {
                path: '/chapter/:id/:page',
                element: <Page />
            },
            {
                path: '/NotAllow',
                element: <NotAllow />
            }
        ]
    }

])

export default Router

