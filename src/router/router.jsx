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
import NotAllow from '../Pages/NotAllow'
import Page from '../Pages/Page'
import Register from '../Pages/Register'
import NewRole from '../Pages/NewRole'
import Login from '../components/login'
import MangaForm from '../Pages/MangaForm'

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
                path: '/author-form',
                element: <AuthorForm />
            },
            {
                path: '/authors/me',
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
                path: '/manga-form',
                element: <MangaForm/>

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
            {
                path: '/NotAllow',
                element: <NotAllow />
            },
            {
                path: '/login',
                element: <Login />
            }
        ]
    }

])

export default Router


