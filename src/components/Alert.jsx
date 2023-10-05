// import ButtonForm from '../components/ButtonForm';
// /* eslint-disable react/prop-types */
// const Alert = ({ show, setShow, message, data,handleRegisterSubmit }) => {
//   return (
//     <div className='flex h-screen justify-center items-center absolute'>
//       <div className='min-h-32 w-64 bg-white flex flex-col items-center justify-center rounded-lg'>
//         {(message && message.length > 0) ? (
//           message.map((errorMessage, index) => (
//             <>
//             <div key={errorMessage}>
//                 <h1
//                   className='min-h-2/3 w-full text-center border-b-2 rounded-t-lg'
//                 >
//                   {errorMessage}
//                 </h1>
//                 </div>
              
//             </>
//           ))
//         ) : (
//           data && data.message ? (
          
//             <h1 className='min-h-2/3 w-full text-center border-b-2 rounded-t-lg'>
//               {data.message}
//             </h1>
           
//           ) : null
//         )}
//     <ButtonForm
//               funcion={handleRegisterSubmit}
//               title="Sign up!"
//               url="http://localhost:8000/register"
//               show={show}
//               setShow={setShow}
//             />
//       </div>
//     </div>
//   );
// };

// export default Alert; 

import React from 'react';

const Alert = ({ show, setShow, message, data }) => {
  return (
    <div className='flex p-3 justify-center items-center absolute'>
      <div className='min-h-32 w-64 bg-white flex flex-col items-center justify-center rounded-lg'>
        {Array.isArray(message) ? (
          
          message.map((errorMessage, index) => (
            <h1
              key={index}
              className='min-h-2/3 w-full text-center border-b-2 rounded-t-lg'
            >
              {errorMessage}
            </h1>
          ))
        ) : (
          <h1 className='min-h-2/3 w-full text-center border-b-2 rounded-t-lg text-black'>
            {message}
          </h1>
        )}
        <button onClick={() => setShow(!show)} className='h-1/3 w-full rounded-b-lg text-blue-500'>
          Accept
        </button>
      </div>
    </div>
  );
};

export default Alert;
// import React from 'react';

// const Alert = ({ show, setShow, message, data }) => {
//   return (
//     <div className='flex h-screen justify-center items-center absolute'>
//       <div className='min-h-32 w-64 bg-white flex flex-col items-center justify-center rounded-lg'>
//         {message ? (
//           message.map((errorMessage, index) => (
//             <h1
//               key={index}
//               className='min-h-2/3 w-full text-center border-b-2 rounded-t-lg'
//             >
//               {errorMessage}
//             </h1>
//           ))
//         ) : data && data.message ? ( // Mostrar mensajes de éxito si hay un mensaje en la respuesta
//           <h1 className='min-h-2/3 w-full text-center border-b-2 rounded-t-lg'>
//             {data.message}
//           </h1>
//         ) : null}
//         <button onClick={() => setShow(!show)} className='h-1/3 w-full rounded-b-lg text-blue-500'>
//           Accept
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Alert;


// import React from 'react';

// const Alert = ({ show, setShow, message, positiveMessage}) => {
//   return (
//     <div className='flex h-screen justify-center items-center absolute'>
//       <div className='min-h-32 w-64 bg-white flex flex-col items-center justify-center rounded-lg'>
        
        
//         {message?message.map((errorMessage, index) => (
          
//           <h1
//             key={index}
//             className='min-h-2/3 w-full text-center border-b-2 rounded-t-lg'
        
//           >
//             {errorMessage}
//           </h1>
//         )) : <h1 className='min-h-2/3 w-full text-center border-b-2 rounded-t-lg'>
        
//         {positiveMessage.message}
//       </h1>}
//         <button onClick={() => setShow(!show)} className='h-1/3 w-full rounded-b-lg text-blue-500'>
//           Accept
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Alert;

// import React from 'react'

// const Alert = ({show, setShow, message}) => {
//   return (
//     <div className='flex h-screen justify-center items-center absolute'>
//       <div className='h-32 w-64 bg-white flex flex-col items-center justify-center rounded-lg'>
//         {message.map((messages) => {`<h1 className='h-2/3 w-full text-center pt-5 border-b-2 rounded-t-lg'>${messages}</h1>`})}
//         <button onClick={()=>setShow(!show)} className='h-1/3 w-full rounded-b-lg text-blue-500'>Accept</button>
//       </div>
//     </div>
//   )
// }

// export default Alert
