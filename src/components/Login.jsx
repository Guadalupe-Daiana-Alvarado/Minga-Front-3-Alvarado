import React from 'react';
import { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import loginImg from '../../public/image/login-img.svg'; // Asegúrate de tener la ruta correcta
import { login } from '../../redux/actions/login';


function Login() {
  const email = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const signin = async (e) => {
    e.preventDefault();
    let data = { email: email.current.value, password: password.current.value };
    dispatch(login(data))
      .then((res) => console.log(res.payload))
      .catch((err) => {
        console.log(err)
      })
    /* Despachar la accion de login */
  };

  return (
    <div className="container max-w-full mx-auto md:py-24 px-6">
      <div className="max-w-screen-xl mx-auto flex items-center justify-center">
        <div className="w-1/2 pr-4">
          <img src={loginImg} alt="Login" className="w-full h-auto" />
        </div>
        <div className="w-1/2 pl-4">
          <div className="text-center font-semibold text-black">
            Welcome Back!
          </div>
          <div className="text-center font-base text-black">
            Discover mangas and comics, track your progress, have fun, read manga
          </div>
          <form
            className="mt-8"
            x-data="{password: '',password_confirm: ''}"
            onSubmit={signin}
          >
            <div className="mx-auto max-w-lg">
              <div className="py-1">
                <span className="px-1 text-sm text-gray-600">Email</span>
                <input
                  ref={email}
                  placeholder=""
                  type="email"
                  className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                />
              </div>
              <div className="py-1">
                <span className="px-1 text-sm text-gray-600">Password</span>
                <input
                  ref={password}
                  placeholder=""
                  type="password"
                  x-model="password"
                  className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                />
              </div>

              <button
                className="mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black"
              >
                Signin
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
