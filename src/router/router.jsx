import React from 'react'
import {createBrowserRouter} from 'react-router-dom'
import Index from '../Pages/Index'
import Registre from '../Pages/Registre'
import SignIn from '../Pages/SignIn'
import Layout from '../Layouts/Layout'
import Mangas from '../Pages/Mangas'
import MangaDetail from '../Pages/MangaDetail'
import ChapterListTab from '../components/ChapterListTab'

    const Router = createBrowserRouter([
       
       {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: '/',
                element: <Index/>
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
                path: '/manga/:id',
                element: <MangaDetail/>
            },
            {
                path: '/chapters',
                element: <ChapterListTab/>
            },
        ]
       }
       
    ])

    export default Router

