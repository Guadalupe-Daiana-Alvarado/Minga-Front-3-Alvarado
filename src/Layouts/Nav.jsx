
import React, { useState } from 'react'
import menu from '../../public/image/Menu.png'
import Display from '../components/Display'


const Nav = () => {
  let [open, setOpen] = useState(false)
  
  const email = JSON.parse(localStorage.getItem("user"))?.email
  const photo = JSON.parse(localStorage.getItem("user"))?.photo
  console.log(email)
  console.log(photo)

  let Drawer = () => (
    
    <div className=' bg-gradient-to-r from-pink-300 to-pink-500  w-full h-full md:w-1/2 absolute top-0 left-0 z-40'>
      <div className='flex items-center pl-4'>
        {photo && <img src={photo} alt="profile-img" className='w-20 rounded-full mr-4'/> }
        {email && <p className='ml-2 text-white'>{email} </p>}
      </div>
      <button onClick={()=>setOpen(false)} className='bg-white p-2 text-pink-400 rounded-full font-bold text-2xl absolute right-5 m-3'>X</button>
      <Display/>
    </div>

  )
  return (
    <>
      <nav className='w-full h-24 flex justify-between p-5'>
        <div className='flex w-full justify-between'>
          <img onClick={() => setOpen(true)} className='cursor-pointer' src={menu} alt="menu" />
          <img src="/image/Logo (1).png" alt="logo" />
        </div>
      </nav>
      {open && (
        <div className='bg-gradient-to-r from-pink-300 to-pink-500 w-full h-full md:w-1/2 absolute top-0 left-0 z-40'>
          <button onClick={() => setOpen(false)} className='bg-white p-2 text-pink-400 rounded-full font-bold text-2xl absolute right-5 m-3'>X</button>
          <Display />
        </div>
      )}
    </>
  );
};

export default Nav;



