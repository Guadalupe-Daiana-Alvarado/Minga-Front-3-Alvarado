import React from 'react'
import Carrousel from '../components/Carrousel'

function Registre() {
  return (
    <>
    <div className='hidden md:block'>
    <Carrousel />
    </div>

    <main className='w-full h-96 bg-no-repeat bg-cover flex justify-around' style={{ backgroundImage: "url('./image/backgroundMain.png')" }}>
        <div>
          <h2 className='p-5 m-20 bg-white text-bold'>REGISTRE</h2>
        </div>
      </main>
   
    </>
  )
}

export default Registre