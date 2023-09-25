//SPRINT4(M03-VISTAS)//
// componente responzable de mostrar  la tabla y  gestionar las acciones de activar/desactivar autores.//

import React, { useEffect } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { fetchAuthors, toggleAuthorStatus } from '../../redux/actions/me_authors';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const dispatch = useDispatch();
    const authors = useSelector((state) => state.author_reduce.authors);
    const userRole = useSelector((state) => state.user?.role); // Suponiendo que tengas el rol del usuario en el estado
    const navigate = useNavigate()
    useEffect(() => {
        // Cargar la lista de autores al cargar el componente
        dispatch(fetchAuthors());
    }, [dispatch]);

    const handleToggleStatus = (author) => {
        // Cambiar el estado del autor y actualizar en el frontend y la DB
        dispatch(toggleAuthorStatus(author));
    };

    if (userRole !== 3) {
        // Redirigir al usuario a la página de inicio si no es un admin
        navigate("/");
        return null; // Puedes retornar null o algún otro contenido en lugar de redirigir
    }


    return (
        <>
            <div>
                <h2>Admin Panel</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/*authors.inactive.map((author) => (
                            <tr key={author.id}>
                                <td>{author.name}</td>
                                <td>
                                    <button onClick={() => handleToggleStatus(author)}>
                                        Activar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {authors.active.map((author) => (
                            <tr key={author.id}>
                                <td>{author.name}</td>
                                <td>
                                    <button onClick={() => handleToggleStatus(author)}>
                                        Desactivar
                                    </button>
                                </td>
                            </tr>
                        ))*/}
                    </tbody>
                </table>
            </div>
        </>
    );
}


export default AdminPanel;

