
import React, { useState } from 'react'
import menu from '../../public/image/Menu.png'
import Display from '../components/Display'


const Nav = () => {
  const [open, setOpen] = useState(false);
  return (
<<<<<<< HEAD
    <>
      <nav className='w-full h-24 flex justify-between p-5'>
        <div className='flex w-full justify-between'>
          <img onClick={() => setOpen(true)} className='cursor-pointer' src={menu} alt="menu" />
          <img src="./image/Logo (1).png" alt="logo" />
        </div>
      </nav>
      {open && (
        <div className='bg-gradient-to-r from-pink-300 to-pink-500 w-full h-full md:w-1/2 absolute top-0 left-0 z-40'>
          <button onClick={() => setOpen(false)} className='bg-white p-2 text-pink-400 rounded-full font-bold text-2xl absolute right-5 m-3'>X</button>
          <Display />
        </div>
      )}
=======
    <>    
    <nav className=' h-24 bg-trabsparent flex w-full justify-between p-5'>
    <div className='flex w-full justify-between '>
      <img onClick={()=>setOpen(true)} className='cursor-pointer' src={menu} alt="menu" />
      <img src="/image/Logo (1).png" alt="logo" />
    </div>
    </nav>

    {open && <Drawer/>}
>>>>>>> parent of fe7360e (Merge pull request #17 from Guadalupe-Daiana-Alvarado/revert-14-m-05-sprint-3)
    </>
  );
};

export default Nav;



