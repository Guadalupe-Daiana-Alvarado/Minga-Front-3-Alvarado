import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Index from '../Pages/Index'
import Registre from '../Pages/Registre'
import SignIn from '../Pages/SignIn'
import Layout from '../Layouts/Layout'
import Mangas from '../Pages/Mangas'
import MangaDetail from '../Pages/MangaDetail'
import ChapterListTab from '../components/ChapterListTab'
import NotAllowed from '../Pages/NotAllowed'
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
                path: '/registre',
                element: <Registre/>
            },
            {
                path: '/signIn',
                element: <SignIn/>
            },
            {
                path: '/mangas',
                element: <Mangas/>
            },
            {
                path: '/mangas/:page',
                element: <Mangas/>

            },

            {
                path: '/notAllowed',
                element: <NotAllowed/>

            },

            {
                path: '/manga/:id',
                element: <MangaDetail/>
            },
            {
                path: '/chapters',
                element: <ChapterListTab/>
            },


             {
                path: '/chapter/:id/:page',
                element: <Page />
            }         
        ]
    }

])

export default Router

