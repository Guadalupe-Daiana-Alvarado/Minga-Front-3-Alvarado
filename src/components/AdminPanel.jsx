//SPRINT4(M03-VISTAS)//
// componente responzable de mostrar  la tabla y  gestionar las acciones de activar/desactivar autores.//

import React, { useEffect } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { fetchAuthors } from '../../redux/actions/me_authors';
import { toggleAuthorStatus } from '../../redux/actions/me_authors';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const dispatch = useDispatch();
    const activeAuthors = useSelector((state) => state.author_reduce.authors.activeAuthors);
    const inactiveAuthors = useSelector((state) => state.author_reduce.authors.inactiveAuthors)
    const userRole = useSelector((state) => state.author_reduce.authors.activeAuthors);

    console.log(activeAuthors)
    console.log(inactiveAuthors)
    console.log(userRole)
    const { token } = useSelector((state) => state.user_reduce);
    const navigate = useNavigate()
    useEffect(() => {
        // Cargar la lista de autores al cargar el componente
        dispatch(fetchAuthors(token));

        /*if (userRole !== 3) {
            // Redirigir al usuario a la página de inicio si no es un admin
            navigate("/");
        }*/
    }, [dispatch, navigate, token, userRole]);

    const handleToggleStatus = (author) => {
        // Cambiar el estado del autor y actualizar en el frontend y la DB
        dispatch(toggleAuthorStatus(author));
    };


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
                        {inactiveAuthors?.map((author) => (
                            <tr key={author._id}>
                                <td>{author.name}</td>
                                <td>
                                    <button onClick={() => handleToggleStatus(author)}>
                                        Activar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {activeAuthors?.map((author) => (
                            <tr key={author._id}>
                                <td>{author.name}</td>
                                <td>
                                    <button onClick={() => handleToggleStatus(author)}>
                                        Desactivar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}


export default AdminPanel;

