//componente de pagina principal//
// e02-notAllow//
import React from 'react';
import ButtonSign from '../components/ButtonSign'

const NotAllow = () => {
    return (
        <div>
            <h2>Error de Acces </h2>
            <p>NOt Allw</p>
            {/* Reutiliza el componente Button Sign  para el enlace a /login */}
            <ButtonSign to="/login" label="Ir a Iniciar Sesión" />
        </div>
    );
}

export default NotAllow;

