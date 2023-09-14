import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Index from '../Pages/Index'
import Register from '../Pages/Registre'
import SignIn from '../Pages/SignIn'
import Layout from '../Layouts/Layout'
import Mangas from '../Pages/Mangas'
import Author from '../Pages/Author'
import MangaDetail from '../Pages/MangaDetail'
import ChapterListTab from '../components/ChapterListTab'
import NotAllowed from '../Pages/NotAllowed'
import Page from '../Pages/Page'
import ChapterForm from '../Pages/ChapterForm'


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

                path: '/register',
                element: <Register/>

            },
            {
                path: '/signIn',
                element: <SignIn/>
            },
            

            {
                path: 'authors/me',
                element: <Author/>
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
                path: '/manga/:id/chapter-form',
                element: <ChapterForm/>
            },

            {
                path: '/chapter',
                element: <ChapterListTab/>
            },


             {
                path: '/chapter/:id/:page',
                element: <Page/>
            }         
        ]
    }

])

export default Router

