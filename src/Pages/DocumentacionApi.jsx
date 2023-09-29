import React from 'react';

function DocumentacionApi() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-pink-500 text-white">
            <h1 className="text-4xl font-bold mb-4">Documentación de la API</h1>
            <p>
                Bienvenido a la documentación de nuestra API. Aquí encontrarás información sobre cómo utilizar nuestros servicios.
            </p>
            <p>¿Qué es una API?
                Una API (Interfaz de programación de aplicaciones) es un contrato que permite a los desarrolladores interactuar con una aplicación a través de un conjunto de interfaces. En este caso, la aplicación es una base de datos de miles de objetos relacionados con Pokémon y las interfaces son enlaces URL.

                Una API RESTful es una API que se ajusta a un conjunto de convenciones flexibles basadas en verbos, errores e hipervínculos HTTP.</p>
            <p>
                Puedes acceder a la documentación de la API{' '}
                <a href="http://localhost:8000/api-doc/" className="text-blue-500 hover:underline">
                    aquí
                </a>
                .
            </p>

            <h2 className="text-2xl mt-6">Ejecución de Pruebas</h2>

            <p>
                Antes de ejecutar las pruebas, asegúrate de que el entorno esté configurado correctamente. Sigue estos pasos:
            </p>

            <ol className="list-decimal ml-8">
                <li>Clona este repositorio en tu máquina local.</li>
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
                <code className="text-white">npm test</code>
            </pre>

            <h3 className="text-xl mt-4">Resultados de las Pruebas</h3>

            <p>Los resultados de las pruebas se mostrarán en la terminal.</p>
        </div>
    );
}

export default DocumentacionApi;
