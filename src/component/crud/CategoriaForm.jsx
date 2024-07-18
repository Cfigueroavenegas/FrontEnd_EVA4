import React, { useState, useEffect } from 'react';
import './estilo_crud/categoriaForm.css'

export const CategoriaForm = ({ addCategory, editData, editCategory }) => {
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        if (editData) {
            setCategoryName(editData.name);
        } else {
            setCategoryName('');
        }
    }, [editData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (categoryName) {
            const category = { name: categoryName, id: editData ? editData.id : Date.now() };

            if (editData) {
                editCategory(category);
                // Actualiza el localStorage
                const existingCategories = JSON.parse(localStorage.getItem("categoriesData")) || [];
                const updatedCategories = existingCategories.map(cat => cat.id === category.id ? category : cat);
                localStorage.setItem("categoriesData", JSON.stringify(updatedCategories));
            } else {
                addCategory(category);
                // Guardar la nueva categoría en localStorage
                const existingCategories = JSON.parse(localStorage.getItem("categoriesData")) || [];
                existingCategories.push(category);
                localStorage.setItem("categoriesData", JSON.stringify(existingCategories));
            }

            setCategoryName('');
        } else {
            alert("Por favor, ingresa un nombre de categoría");
        }
    };

    return (
        <form onSubmit={handleSubmit} className='m-4'>
            <label htmlFor="categoryName">Nombre de la Categoría</label>
            <input
                type="text"
                name="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
            />
            <button type="submit">{editData ? 'Editar Categoría' : 'Agregar Categoría'}</button>
        </form>
    );
};

