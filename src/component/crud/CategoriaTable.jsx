import React from 'react';
import './estilo_crud/categoriaTable.css'

export const CategoriaTable = ({ categories, deleteCategory, setEditCategory }) => {
    return (
        <table className="table w-50">
            <thead>
                <tr>
                    <td>ID</td>
                    <td>Nombre Categoría</td>
                    <td>Acciones</td>
                </tr>
            </thead>
            <tbody>
                {
                    categories.length === 0 ? <tr><td colSpan="3">No hay categorías</td></tr>
                    : categories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>
                                <button className="btn btn-outline-danger" onClick={() => deleteCategory(category.id)}>Eliminar</button>
                                <button className="btn btn-outline-warning mx-1" onClick={() => setEditCategory(category)}>Editar</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
};

