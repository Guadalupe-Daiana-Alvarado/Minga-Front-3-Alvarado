import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Router from './router/router.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={Router}/>
    </Provider>
  </React.StrictMode>,
)

/*   a  Todos
Los paquetes tienen exportaciones por defecto y exportaciones nombradas, esa es una exportacion nombrada
Las importaciones nombradas son entre llaves y se importan con el nombre que se exportó */
