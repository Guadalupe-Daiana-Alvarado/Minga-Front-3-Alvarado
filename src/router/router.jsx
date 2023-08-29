import React from 'react'
import {createBrowserRouter} from 'react-router-dom'
import Index from '../Pages/Index'
import Registre from '../Pages/Registre'
import SignIn from '../Pages/SignIn'
import Layout from '../Layouts/Layout'
import Mangas from '../Pages/Mangas'

    const Router = createBrowserRouter([
       
       {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: '/Index',
                element: <Index/>
            },
            {
                path: '/Registre',
                element: <Registre/>
            },
            {
                path: '/SignIn',
                element: <SignIn/>
            },
            {
                path: '/Mangas',
                element: <Mangas/>
            },
        ]
       }
       
    ])

    export default Router

