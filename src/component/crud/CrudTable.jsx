import React from "react";
import './estilo_crud/crudTable.css'

export const CrudTable = ({secciones, setEditData, deleteSeccion}) => {
    return <>
        <table className="table w-50">
            <thead>
                <tr>
                    <td>ID</td>
                    <td>Nombre Producto</td>
                    <td>Precio</td>
                    <td>Stock</td>
                    <td>Categoria</td>
                    <td>Oferta</td>
                    <td>CRUD</td>
                </tr>
            </thead>
            <tbody>
                {
                    secciones.length === 0 ? <td>No hay secciones</td>
                    :secciones.map((seccion, index) => {
                        return <tr key={index}>
                            <td>{seccion.id}</td>
                            <td>{seccion.nombreProducto}</td>
                            <td>{seccion.precio}</td>
                            <td>{seccion.stock}</td>
                            <td>{seccion.categoria}</td>
                            <td>{seccion.oferta}</td>
                            <td>
                                <button className="btn btn-outline-warning mx-1" onClick={() => setEditData(seccion)} >Editar</button>
                                <button className="btn btn-outline-danger mx-1" onClick={() => deleteSeccion(seccion.id)} >Eliminar</button>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </>
}