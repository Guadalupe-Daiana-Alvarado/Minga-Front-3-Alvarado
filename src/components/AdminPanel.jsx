import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthors } from '../../redux/actions/me_authors';
import { toggleAuthorStatus } from '../../redux/actions/me_authors';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminPanel = () => {
    const dispatch = useDispatch();
    const activeAuthors = useSelector((state) => state.author_reduce.authors.activeAuthors);
    const inactiveAuthors = useSelector((state) => state.author_reduce.authors.inactiveAuthors);
    const user = useSelector((state) => state.user_reduce);
    console.log(user);
    const { token } = useSelector((state) => state.user_reduce);

    const navigate = useNavigate();
    const [selectedAuthor, setSelectedAuthor] = useState(null);

    useEffect(() => {
        dispatch(fetchAuthors(token));
    }, [dispatch, navigate, token, user]);

    const handleToggleStatus = (author) => {
        setSelectedAuthor(author);

        Swal.fire({
            title: 'Confirmación',
            text: `¿Estás seguro de que deseas realizar esta acción en ${author.name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(toggleAuthorStatus(author));
            }
        });
    };

    return (
        <>
            (
            <div className="flex justify-center items-center h-screen">
                <div className="bg-white p-8 shadow-md rounded-md">
                    <h2 className="text-2xl font-semibold mb-4">Admin Panel</h2>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 p-2">Nombre</th>
                                <th className="border border-gray-300 p-2">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inactiveAuthors?.map((author) => (
                                <tr key={author._id} className="border border-gray-300">
                                    <td className="border border-gray-300 p-2">{author.name}</td>
                                    <td className="border border-gray-300 p-2">
                                        <button
                                            onClick={() => handleToggleStatus(author)}
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            Activar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {activeAuthors?.map((author) => (
                                <tr key={author._id} className="border border-gray-300">
                                    <td className="border border-gray-300 p-2">{author.name}</td>
                                    <td className="border border-gray-300 p-2">
                                        <button
                                            onClick={() => handleToggleStatus(author)}
                                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Desactivar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            )


        </>
    );
}

export default AdminPanel;


/*return (
    <>
        {user && user.role === 3 ? (
            <div className="flex justify-center items-center h-screen">
                <div className="bg-white p-8 shadow-md rounded-md">
                    <h2 className="text-2xl font-semibold mb-4">Admin Panel</h2>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 p-2">Nombre</th>
                                <th className="border border-gray-300 p-2">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inactiveAuthors?.map((author) => (
                                <tr key={author._id} className="border border-gray-300">
                                    <td className="border border-gray-300 p-2">{author.name}</td>
                                    <td className="border border-gray-300 p-2">
                                        <button
                                            onClick={() => handleToggleStatus(author)}
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            Activar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {activeAuthors?.map((author) => (
                                <tr key={author._id} className="border border-gray-300">
                                    <td className="border border-gray-300 p-2">{author.name}</td>
                                    <td className="border border-gray-300 p-2">
                                        <button
                                            onClick={() => handleToggleStatus(author)}
                                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Desactivar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        ) : (
            navigate('/')
        )}
    </>
);
}*/