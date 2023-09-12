import React from 'react'
import Carrousel from '../components/Carrousel'
import img from '../../public/image/Frame 50.png'
import ButtonForm from '../components/ButtonSubmit'

function Registre() {
  return (
    <>
      <div className='hidden md:block'>
        <Carrousel />
      </div>

      <main className='w-full h-96 bg-no-repeat bg-cover flex flex-col justify-around' style={{ backgroundImage: "url('./image/backgroundMain.png')" }}>
        <div className='bg-neutral-100 w-full h-1/2 p-5 flex flex-col items-center'>
          <h2 className='p-5  bg-white text-bold'>New Author</h2>
          <img src={img} alt="" />
        </div>

        <div className='bg-neutral-100 w-full min-h-full flex flex-col items-center'>
          <form className='w-11/12 min-h-3/4 flex flex-col items-center' action="signup.html" method="post" id="signup">
              <ul>
                <li>
                  <label for="name">
                  <input className='p-3 m-1 w-60 bg-neutral-100 border-b-indigo-500 ' type="text" id="name" name="Firstname" placeholder="First Name"/>
                  </label>
                </li>
                <li>
                  <label for="image">
                  <input  className='p-3 m-1 w-60 bg-neutral-100  ' type="text" id="name" name="Lastname" placeholder="url profile image" />
                  </label>
                </li>
                <li>
                  <label for="birth"> 
                  <input  className='p-3 m-1 w-60 bg-neutral-100  '  type="text" id="birth" name="birth" placeholder="date of birth ej:22/12/1194" />
                  </label>
                </li>
                <li>
                  <label for="image">
                  <input  className='p-3 m-1 w-60 bg-neutral-100  ' type="text" id="name" name="image" placeholder="url profile image" />
                  </label>
                </li>
                <li>
             <ButtonForm/>
                </li>
              </ul>

          </form>

        </div>

      </main>

    </>
  )
}

export default Registre