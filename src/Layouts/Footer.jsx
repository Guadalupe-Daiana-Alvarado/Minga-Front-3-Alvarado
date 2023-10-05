import React from 'react';
import ImagenFooter from '../../public/image/footer.png';
import Logo from '../../public/image/Logo (1).png';
import Donate from '../../public/image/Donate.png';
import ButtonsSocial from '../components/ButtonsSocial';
import NavFooter from '../components/NavFooter';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    // Función para manejar la navegación cuando el usuario hace clic en un botón o enlace
    const handleNavigation = () => {
        navigate("/payments/create-order"); // Navegar a la ruta deseada, por ejemplo, "/"
    };

    return (
        <footer className="mt-20">
            <div className="w-full h-3 mt-5 flex-col">
                <div>
                    <img className='w-full' src={ImagenFooter} alt="imagen-footer" />
                </div>

                <div className="w-full flex justify-around items-center">
                    <NavFooter />
                    <div>
                        <img className='hidden lg:block' src={Logo} alt="Logo" />
                    </div>
                    <div className='flex-col m-10'>
                        <ButtonsSocial />
                        <div>
                            {/* Utiliza la función handleNavigation para navegar */}
                            <img
                                className='w-32 lg:w-56 cursor-pointer'
                                src={Donate}
                                alt="Button Donate"
                                onClick={handleNavigation}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
