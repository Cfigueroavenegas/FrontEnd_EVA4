import React, { useEffect, useState } from "react";
import './estilo_crud/crudForm.css';

export const CrudForm = ({ addSeccion, editSeccion, editData }) => {
    const [formData, setFormData] = useState({
        nombreProducto: "",
        precio: "",
        stock: "",
        categoria: "",
        oferta: "",
        id: null
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (editData !== null) {
            setFormData(editData);
        } else {
            setFormData({
                nombreProducto: "",
                precio: "",
                stock: "",
                categoria: "",
                oferta: "",
                id: null
            });
        }
    }, [editData]);

    useEffect(() => {
        // Recuperar las categorías desde localStorage
        const storedCategories = JSON.parse(localStorage.getItem("categoriesData")) || [];
        setCategories(storedCategories);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            formData.nombreProducto !== "" &&
            formData.precio !== "" &&
            formData.stock !== "" &&
            formData.categoria !== "" &&
            formData.oferta !== ""
        ) {
            if (editData !== null) {
                editSeccion(formData);
                localStorage.setItem('seccionEditada', JSON.stringify(formData));
            } else {
                formData.id = Date.now();
                addSeccion(formData);
                localStorage.setItem('nuevaSeccion', JSON.stringify(formData));
                setFormData({
                    nombreProducto: "",
                    precio: "",
                    stock: "",
                    categoria: "",
                    oferta: "",
                    id: null
                });
            }
        } else {
            alert("Por favor, complete todos los campos");
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            <form className="m-3" onSubmit={handleSubmit}>
                <label htmlFor="nombreProducto">Nombre Producto</label>
                <input type="text" name="nombreProducto" onChange={handleChange} value={formData.nombreProducto} />
                <label htmlFor="precio">Precio</label>
                <input type="number" name="precio" onChange={handleChange} value={formData.precio} />
                <label htmlFor="stock">Stock</label>
                <input type="number" name="stock" onChange={handleChange} value={formData.stock} />
                <label htmlFor="categoria">Categoría</label>
                <select name="categoria" onChange={handleChange} value={formData.categoria}>
                    <option value="">Elegir</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <label htmlFor="oferta">Oferta</label>
                <select id="oferta" name="oferta" onChange={handleChange} value={formData.oferta}>
                    <option value="">Elegir</option>
                    <option value="true">Sí</option>
                    <option value="false">No</option>
                </select>
                <div className="cajita-botones">
                    <input type="submit" value="Ingresar" className="btn btn-success mx-1" />
                    <input type="reset" value="Cancelar" className="btn btn-danger mx-1" />
                </div>
            </form>
        </>
    );
};



