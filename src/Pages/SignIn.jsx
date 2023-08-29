import React from 'react'
import Carrousel from '../components/Carrousel'


function SignIn() {
  return (
    <>
      <div className='hidden md:block'>
        <Carrousel />
      </div>
      <main className='w-full h-96 bg-no-repeat bg-cover flex justify-around' style={{ backgroundImage: "url('./image/backgroundMain.png')" }}>
        <div>
          <h2 className='p-5 m-20 bg-white text-bold'>SIGN IN</h2>
        </div>
      </main>
    </>
  )
}

export default SignIn

/*     <>
    <div className='hidden md:block'>
    <Carrousel />
    </div>

      <main className='w-full h-3/4  bg-no-repeat bg-cover flex justify-around' style={{ backgroundImage: "url('./image/backgroundMain.png')" }}>
      <div className='bg-red-200 w-full h-1/2'>
        <h2 className='p-5 m-20 bg-white text-bold'>REGISTRATE</h2>
      </div>
      </main>
   
    </>
  ) */