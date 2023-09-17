//componente de pagina principal//
// e02-notAllow//
import React from 'react';
import ButtonSign from '../components/ButtonSign'
import Carrousel from '../components/Carrousel'

const NotAllow = () => {
    return (
        <>
            <Carrousel />
            <main className='w-full h-96 bg-no-repeat bg-cover flex justify-around' style={{ backgroundImage: "url('./image/backgroundMain.png')" }}>
                <div>
                    <h2 className='p-5 m-20 bg-white text-bold'>Not Allow</h2>
                </div>
            </main>

            <div className="flex justify-center mt-5">
                <ButtonSign to="/login" label="Ir a Iniciar Sesión" />
            </div>

        </>


    );
}

export default NotAllow;