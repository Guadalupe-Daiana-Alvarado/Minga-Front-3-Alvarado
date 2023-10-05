import React from 'react'
import Carrousel from '../components/Carrousel'
import Hero from '../components/Hero'
import Chatbot from '../components/ChatBot'



const Index = () => { 
  return (
    <> 

    <div className='hidden md:block'>
      <Carrousel />
    </div>
    
      <main className='w-full h-3/4  lg:h-96 bg-no-repeat bg-cover flex justify-around' style={{ backgroundImage: "url('./image/backgroundMain.png')" }}>
        <Hero/>
        <Chatbot/>
        
      </main>
    </>
  )
}

export default Index

