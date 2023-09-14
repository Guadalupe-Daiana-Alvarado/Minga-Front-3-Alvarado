import React from 'react'
import Facebook from '../../public/image/facebook-black.png'
import Twitter from '../../public/image/twitter-black.png'
import Vimeo from '../../public/image/Vimeo.png'
import Youtube from '../../public/image/Youtube.png'

const ButtonsSocial = () => {
    return (

        <div className='flex justify-around gap-15 pb-5 '>
            <img className='cursor-pointer' src={Facebook} alt="Facebook" />
            <img className='cursor-pointer' src={Twitter} alt="Twitter" />
            <img className='cursor-pointer' src={Vimeo} alt="Vimeo" />
            <img className='cursor-pointer' src={Youtube} alt="Youtube" />

        </div>
    )
}

export default ButtonsSocial