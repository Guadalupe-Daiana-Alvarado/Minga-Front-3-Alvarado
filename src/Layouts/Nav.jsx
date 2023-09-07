import React, { useState } from 'react'
import menu from '../../public/image/Menu.png'
import Display from '../components/Display'


const Nav = () => {
  let [open, setOpen] = useState(false)
  let Drawer = () => (
    
    <div className=' bg-gradient-to-r from-pink-300 to-pink-500  w-full h-full md:w-1/2 absolute top-0 left-0 z-40'>
      <button onClick={()=>setOpen(false)} className='bg-white p-2 text-pink-400 rounded-full font-bold text-2xl absolute right-5 m-3'>X</button>
      <Display/>
    </div>

  )
  return (
    <>
    <nav className='w-full h-24 bg-pink-400 flejustify-between p-5'>
    <div className='flex w-full  justify-between '>
      <img onClick={()=>setOpen(true)} className='cursor-pointer w-10 object-contain ' src={menu} alt="menu"  />
      <img src="../../image/Logo (1).png" className="w-10 object-contain" alt="logo" />
    </div>
    </nav>
    {open && <Drawer/>}
    </>
  )
}

export default Nav