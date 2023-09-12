import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Index from '../Pages/Index'
import AuthorForm from '../Pages/AuthorForm'
import SignIn from '../Pages/SignIn'
import Layout from '../Layouts/Layout'
import Mangas from '../Pages/Mangas'
import Author from '../Pages/Author'
import MangaDetail from '../Pages/MangaDetail'
import ChapterListTab from '../components/ChapterListTab'
import NotAllowed from '../Pages/NotAllowed'
import Page from '../Pages/Page'
import NewRole from '../Pages/NewRole'

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

                path: '/author-form',
                element: <AuthorForm />

            },
            {

                path: '/author',
                element: <AuthorForm />

            },
            {
                path: 'authors/me',
                element: <Author />
            }, 
            {
                path: '/newRole',
                element: <NewRole />
            },
            {
                path: '/signIn',
                element: <SignIn />
            },

            {
                path: '/mangas',
                element: <Mangas />
            },
            {
                path: '/mangas/:page',
                element: <Mangas />

            },

            {
                path: '/notAllowed',
                element: <NotAllowed />

            },

            {
                path: '/manga/:id',
                element: <MangaDetail />
            },
            {
                path: '/chapter',
                element: <ChapterListTab />
            },

            {
                path: '/chapter/:id/:page',
                element: <Page />
            },
           
        ]
    }

])

export default Router


