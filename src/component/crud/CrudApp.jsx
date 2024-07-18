import React, { useEffect, useState } from 'react';
import { CrudForm } from './CrudForm';
import { CrudTable } from './CrudTable';
import { CategoriaForm } from './CategoriaForm';
import { CategoriaTable } from './CategoriaTable';
import './estilo_crud/crudApp.css';

export const CrudApp = () => {
    const [secciones, setSecciones] = useState(() => {
        const savedSecciones = window.localStorage.getItem("seccionesData");
        return savedSecciones ? JSON.parse(savedSecciones) : [];
    });
    
    const [categories, setCategories] = useState(() => {
        const savedCategories = window.localStorage.getItem("categoriesData");
        return savedCategories ? JSON.parse(savedCategories) : [];
    });

    const [editData, setEditData] = useState(null);
    const [editCategoryData, setEditCategoryData] = useState(null); // Cambiar a editCategoryData

    useEffect(() => {
        window.localStorage.setItem("seccionesData", JSON.stringify(secciones));
    }, [secciones]);

    useEffect(() => {
        window.localStorage.setItem("categoriesData", JSON.stringify(categories));
    }, [categories]);

    const addSeccion = (seccion) => {
        setSecciones([...secciones, seccion]);
    };

    const editSeccion = (seccion) => {
        const newSecciones = secciones.map(sec => sec.id === seccion.id ? seccion : sec);
        setSecciones(newSecciones);
        setEditData(null);
    };

    const deleteSeccion = (id) => {
        const isDelete = window.confirm(`Deseas eliminar el registro con id: ${id}`);
        if (isDelete) {
            const newSecciones = secciones.filter(sec => sec.id !== id);
            setSecciones(newSecciones);
        }
    };

    const addCategory = (category) => {
        setCategories([...categories, category]);
    };

    const editCategory = (category) => {
        const newCategories = categories.map(cat => cat.id === category.id ? category : cat);
        setCategories(newCategories);
        setEditCategoryData(null);
    };

    const deleteCategory = (id) => {
        const isDelete = window.confirm(`Deseas eliminar la categoría con id: ${id}`);
        if (isDelete) {
            const newCategories = categories.filter(cat => cat.id !== id);
            setCategories(newCategories);
        }
    };

    return (
        
        <div className='container2'>
            <header className="menu">
                <a href="html/principal.html">
                    <img src="../../html/imagenes_html/logo_resinoxy.png" alt="" className="logo" />
                </a>
                <p>Administración</p>
                <a href="/html/catalogo.html" class="link_cata">Catálogo</a>
            </header>

            <div className="wave" id="wave1">
                <div style={{ height: '100px', overflow: 'hidden' }}>
                    <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: '100%', width: '100%' }}>
                        <path d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" style={{ stroke: 'none', fill: '#ffff80' }}></path>
                    </svg>
                </div>
            </div>

            <div className="wave">
                <div style={{ height: '100px', overflow: 'hidden' }}>
                    <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: '100%', width: '100%' }}>
                        <path d="M0.00,49.98 C149.99,150.00 271.49,-49.98 500.00,49.98 L500.00,0.00 L0.00,0.00 Z" style={{ stroke: 'none', fill: '#ffff80' }}></path>
                    </svg>
                </div>
            </div>
            <div className='cajitas_felices'>
                <div className='cajita'>
                    <CrudForm addSeccion={addSeccion} editSeccion={editSeccion} editData={editData} />
                    <CrudTable secciones={secciones} setEditData={setEditData} deleteSeccion={deleteSeccion} />
                </div>
                <div className='cajita2'>
                    <CategoriaForm addCategory={addCategory} editCategory={editCategory} editData={editCategoryData} />
                    <CategoriaTable categories={categories} deleteCategory={deleteCategory} setEditCategory={setEditCategoryData} />
                </div>
            </div>
            <div className="wave" id="wave1">
                <div style={{ height: '100px', overflow: 'hidden' }}>
                    <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: '100%', width: '100%' }}>
                        <path d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" style={{ stroke: 'none', fill: '#ffff80' }}></path>
                    </svg>
                </div>
            </div>

            <div className="wave">
                <div style={{ height: '100px', overflow: 'hidden' }}>
                    <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: '100%', width: '100%' }}>
                        <path d="M0.00,49.98 C149.99,150.00 271.49,-49.98 500.00,49.98 L500.00,0.00 L0.00,0.00 Z" style={{ stroke: 'none', fill: '#ffff80' }}></path>
                    </svg>
                </div>
            </div>
        </div>
    );
};

