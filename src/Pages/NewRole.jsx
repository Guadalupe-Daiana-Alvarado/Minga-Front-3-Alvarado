import React from 'react';
import img from '../../public/image/Logo (1).png';
import imagen1 from '../../public/image/imgpequenias1.png';
import imagen2 from '../../public/image/imgpequenias2.png';
import { Link } from 'react-router-dom';


const NewRole = () => {
  return (
    <main className='flex flex-col w-full md:flex-row'>
      <div className='w-1/2 m-10 flex flex-col justify-center'>

        <div className=' h-3/4 flex flex-col justify-around items-center'>

          <div className='flex flex-col'>
            <h3 className='text-center text-pink-300 font-bold'>Change role to</h3>
            <img className='w-24' src={img} alt="" />
          </div>

        <Link to={"/register"}>
          <div className=' w-96 md:w-3/4 flex border-solid border-2 rounded-md p-1 m-5'>
            <img src={imagen1} alt="" />
            <div>
              <h4 className='  text-centerr text-pink-400 font-bold ml-5'>Join as an Author!</h4>
              <p className='text-centerr text-pink-300 font-semibold ml-5 mr-20'>I'm a reader writting a manga</p>
            </div>
          </div>
          </Link>


          <Link>
            <div className=' w-96 md:w-3/4  flex border-solid border-2 rounded-md p-1 cursor-pointer hover:active:true '>
              <img src={imagen2} alt="" />
              <div>
                <h4 className='text-centerr text-pink-400 font-bold ml-5'>Join as a Company!</h4>
                <p className='text-centerr text-pink-300 font-semibold ml-5'> I’m a company and I want to publish my comics</p>
              </div>
            </div>
          </Link>

        </div>
      </div>

      <div className='w-full  md:w-1/2 md:m-5 min-h-screen bg-no-repeat bg-cover flex flex-col justify-start' style={{ backgroundImage: "url('./image/Rectangle.png')" }}>
        <div>
          <p className=' p-5 m-10 text-center text-white font-bold'>Minga.com is the best place to find manga reviews. We’ve been super impress by the quality of applicants.</p>
          <p className=' p-5 text-center text-white font-bold'>---- Ignacio Borraz</p>
        </div>


      </div>
    </main>
  );
}

export default NewRole;
