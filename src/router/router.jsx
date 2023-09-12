import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Index from '../Pages/Index'
import Registre from '../Pages/Registre'
import SignIn from '../Pages/SignIn'
import Layout from '../Layouts/Layout'
import Mangas from '../Pages/Mangas'
import Page from '../Pages/Page'

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
                path: '/Registre',
                element: <Registre />
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
            }
        ]
    }

])

export default Router

