import React from 'react'
import ReactDOM from 'react-dom/client'
/* import App from './App.jsx' */
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Router from './router/router.jsx'
import { Provider } from 'react-redux'
import {store} from '../redux/store'
import Chatbot from './components/ChatBot'

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={Router}/>
      <Chatbot/>
    </Provider>

  </React.StrictMode>
)
