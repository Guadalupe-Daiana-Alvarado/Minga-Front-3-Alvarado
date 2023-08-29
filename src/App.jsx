import { useState } from 'react'

import './App.css'

import Index from '../src/Pages/Index'
import Layout from './Layouts/Layout'

function App() {

    return (
    
    <div className='m-5'>
      <Layout props="props">
      <Index/>
      </Layout>
    </div>
  )
}

export default App

