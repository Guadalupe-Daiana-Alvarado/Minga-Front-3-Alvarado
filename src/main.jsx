import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Router from './router/router.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
   <RouterProvider router={Router}/>
  </React.StrictMode>,
)

/*   a  Todos
Los paquetes tienen exportaciones por defecto y exportaciones nombradas, esa es una exportacion nombrada
Las importaciones nombradas son entre llaves y se importan con el nombre que se exportó */
