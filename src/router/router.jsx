import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Index from '../Pages/Index'
<<<<<<< HEAD
=======
import AuthorForm from '../Pages/AuthorForm'
>>>>>>> parent of fe7360e (Merge pull request #17 from Guadalupe-Daiana-Alvarado/revert-14-m-05-sprint-3)
import SignIn from '../Pages/SignIn'
import Layout from '../Layouts/Layout'
import Mangas from '../Pages/Mangas'
import Author from '../Pages/Author'
import MangaDetail from '../Pages/MangaDetail'
import ChapterListTab from '../components/ChapterListTab'
import NotAllowed from '../Pages/NotAllowed'
import Page from '../Pages/Page'
<<<<<<< HEAD
import Register from '../Pages/Register'
import NotAllow from '../Pages/NotAllow'
=======
import NewRole from '../Pages/NewRole'
import Login from '../components/login'

>>>>>>> parent of fe7360e (Merge pull request #17 from Guadalupe-Daiana-Alvarado/revert-14-m-05-sprint-3)

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
<<<<<<< HEAD
                path: '/Register',
                element: <Register />
=======

                path: '/author-form',
                element: <AuthorForm />

>>>>>>> parent of fe7360e (Merge pull request #17 from Guadalupe-Daiana-Alvarado/revert-14-m-05-sprint-3)
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
            {
<<<<<<< HEAD
                path: '/NotAllow',
                element: <NotAllow />
            }
=======
                path: '/login',
                element: <Login/>
            }        
>>>>>>> parent of fe7360e (Merge pull request #17 from Guadalupe-Daiana-Alvarado/revert-14-m-05-sprint-3)
        ]
    }

])

export default Router


