import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { showSuccessAlertAction, showErrorAlertAction } from '../../redux/actions/DocuApiActions'; // Asegúrate de que la ruta sea correcta


function DocumentacionApi() {
    const showSuccessAlert = useSelector(state => state.alert.showSuccessAlert); // Accede al estado de alerta en Redux
    const showErrorAlert = useSelector(state => state.alert.showErrorAlert); // Accede al estado de alerta en Redux
    const dispatch = useDispatch();

    const closeSuccessAlert = () => dispatch(showSuccessAlertAction());
    const closeErrorAlert = () => dispatch(showErrorAlertAction());

    useEffect(() => {
        // Función para redireccionar después de 2 segundos
        const redirectToDocumentation = () => {
            window.location.href = "http://localhost:8000/api-doc/";
        };

        // Mostrar la alerta de éxito y redirigir después de 2 segundos
        if (showSuccessAlert) {
            setTimeout(() => {
                closeSuccessAlert(); // Cierra la alerta de éxito después de redirigir
                redirectToDocumentation();
            }, 2000); // 2000 milisegundos = 2 segundos (puedes ajustar este valor)
        }
    }, [showSuccessAlert, closeSuccessAlert]);


    return (
        <div className="flex flex-col items-center justify-center h-full bg-pink-500 text-white">
            <h1 className="text-4xl font-bold mb-4">Documentación de la API</h1>
            <p>
                Bienvenido a la documentación de nuestra API. Aquí encontrarás información sobre cómo utilizar nuestros servicios.
            </p>
            <p className=" my-10 p-3 mt-28 bg-pink-400">¿Qué es una API?
                Una API (Interfaz de programación de aplicaciones) es un contrato que permite a los desarrolladores interactuar con una aplicación a través de un conjunto de interfaces.
                En este caso, la aplicación es una base de datos de miles de objetos relacionados con Pokémon y las interfaces son enlaces URL.

                Una API RESTful es una API que se ajusta a un conjunto de convenciones flexibles basadas en verbos, errores e hipervínculos HTTP.</p>
            <p>
                Puedes acceder a la documentación de la API ( swagger){' '}
                <a
                    href="http://localhost:8000/api-doc/"
                    className="text-blue-500 hover:underline"
                    onClick={(e) => {
                        e.preventDefault(); // Prevenir la navegación estándar
                        dispatch(showSuccessAlertAction()); // Mostrar la alerta de éxito y redirigir
                    }}
                >
                    aquí
                </a>
            </p>

            <h2 className="text-2xl mt-6"> Ejemplo de documentacion Swagger: 👇</h2>

            <div className="flex flex-col m-4 ">
                <img src="../../public/image/captura1.png" alt="Imagen 1" className="h-auto w-auto max-h-64 max-w-64 m-4" />
                <img src="../../public/image/captura2.png" alt="Imagen 2" className="h-auto w-auto max-h-64 max-w-64 m-4" />
            </div>




            <h2 className="text-2xl mt-6">Ejecución de Pruebas</h2>

            <p>
                Antes de ejecutar las pruebas, asegúrate de que el entorno esté configurado correctamente. Sigue estos pasos:
            </p>

            <ol className="list-decimal ml-8">
                <li>Clona este repositorio en tu máquina local.</li>
                <li> Link de FRONT :  https://github.com/Guadalupe-Daiana-Alvarado/Minga-Front-3-Alvarado</li>
                <li>Link de BACK </li>
                <li>Abre una terminal en la carpeta del proyecto.</li>
            </ol>

            <h3 className="text-xl mt-4">Instalar Dependencias</h3>

            <p>Ejecuta el siguiente comando para instalar todas las dependencias necesarias:</p>

            <pre className="bg-gray-900 p-2 rounded-lg">
                <code className="text-white">npm install</code>
            </pre>

            <h3 className="text-xl mt-4">Ejecutar Pruebas</h3>

            <p>Para ejecutar las pruebas, utiliza el siguiente comando:</p>

            <pre className="bg-gray-900 p-2 rounded-lg">
                <code className="text-white">npx mocha ./test</code>
            </pre>

            <h3 className="text-xl mt-4">Resultados de las Pruebas</h3>

            <p>Los resultados de las pruebas se mostrarán en la terminal.</p>

            {/* Alerta de éxito */}
            {showSuccessAlert && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Éxito!</strong>
                    <span className="block sm:inline"> La consulta fue exitosa. ¡Disfruta de la documentación!</span>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={closeSuccessAlert}>
                        <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <title>Cerrar</title>
                            <path d="M6.293 6.293a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 111.414 1.414L11.414 12l2.293 2.293a1 1 0 11-1.414 1.414L10 13.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 12 6.293 9.707a1 1 0 010-1.414z" />
                        </svg>
                    </span>
                </div>
            )}

            {/* Alerta de error */}
            {showErrorAlert && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline"> Hubo un error al consultar la documentación. Inténtalo de nuevo más tarde.</span>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={closeErrorAlert}>
                        <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <title>Cerrar</title>
                            <path d="M6.293 6.293a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 111.414 1.414L11.414 12l2.293 2.293a1 1 0 11-1.414 1.414L10 13.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 12 6.293 9.707a1 1 0 010-1.414z" />
                        </svg>
                    </span>
                </div>
            )}
        </div>
    );
}

export default DocumentacionApi;
