import React from 'react'
import { Link } from 'react-router-dom'
import { Link, useHistory } from 'react-router-dom';

const Display = () => {
    const isAuthenticated = true
    const history = useHistory();
    return (
        <>

            <div className=' bg-gradient-to-r from-pink-300 to-pink-500  h-1/2 flex flex-col justify-around items-center text-center mt-5 '>
                <Link to="/" className='text-pink-400  bg-white p-1 w-48  rounded-md font-semibold text-2xl'>Home</Link>
                {/* Si el usuario NO está autenticado, muestra el botón "Register" que dirige a /register */}
                {!isAuthenticated && (
                    <Link to="/register" className='text-pink-400  bg-white p-1 w-48  rounded-md font-semibold text-2xl'>Register</Link>
                )}
                {/* Si el usuario está autenticado, redirige a la página NotAllow */}
                {isAuthenticated && (
                    <button onClick={() => history.push('/NotAllow')} className='text-pink-400 bg-white p-1 w-48 rounded-md font-semibold text-2xl'>Not Allow</button>
                )}

                <Link to="/SignIn" className='text-pink-400  bg-white p-1 w-48  rounded-md font-semibold text-2xl'>Sign In</Link>
                <Link to="/Page" className='text-pink-400  bg-white p-1 w-48  rounded-md font-semibold text-2xl'>Pages</Link>
            </div>


        </>
    )
}

export default Display