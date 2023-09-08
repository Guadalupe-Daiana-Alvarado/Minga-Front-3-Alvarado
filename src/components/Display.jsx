import React from 'react'
import {Link} from 'react-router-dom'
const Display = () => {
    return (
        <>
        
            <div className=' bg-gradient-to-r from-pink-300 to-pink-500  h-1/2 flex flex-col justify-around items-center text-center mt-5 '>
                <Link to="/" className='text-pink-400  bg-white p-1 w-48  rounded-md font-semibold text-2xl'>Home</Link>
                <Link to="/Mangas/:page" className='text-pink-400  bg-white p-1 w-48  rounded-md font-semibold text-2xl'>Mangas</Link>
                <Link to="/authors/me" className='text-2xl w-1/2 rounded-xl font-bold hover:bg-white cursor-pointer'>Profile</Link>
                <Link to="/Registre" className='text-pink-400  bg-white p-1 w-48  rounded-md font-semibold text-2xl'>Register</Link>
                <Link to="/SignIn" className='text-pink-400  bg-white p-1 w-48  rounded-md font-semibold text-2xl'>Sign In</Link>

            </div>


        </>
    )
}

export default Display