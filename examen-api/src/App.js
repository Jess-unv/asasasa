import React, { useState, useEffect } from 'react';
import axios from 'axios';
import firebase from './firebase'; 

function App() {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', precio: 0 });

  useEffect(() => {
    cargarProductosDesdeAPI();
  }, []);

  const cargarProductosDesdeAPI = async () => {
    try {
      const response = await axios.get('http://localhost:80'); 
      setProductos(response.data);
    } catch (error) {
      console.error('Error al cargar productos desde la API:', error);
    }
  };

  const agregarProductoAFirebase = async () => {
    try {
      await firebase.database().ref('productos').push(nuevoProducto);
      setNuevoProducto({ nombre: '', precio: 0 });
    } catch (error) {
      console.error('Error al agregar producto a Firebase:', error);
    }
  };

  const eliminarProductoDeFirebase = async (id) => {
    try {
      await firebase.database().ref(`productos/${id}`).remove();
    } catch (error) {
      console.error('Error al eliminar producto de Firebase:', error);
    }
  };

  return (
    <div>
      <h1>Lista de Productos</h1>
      <ul>
        {productos.map((producto, index) => (
          <li key={index}>
            {producto.nombre} - ${producto.precio}
            <button onClick={() => eliminarProductoDeFirebase(producto.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <div>
        <h2>Agregar Nuevo Producto</h2>
        <input
          type="text"
          placeholder="Nombre del producto"
          value={nuevoProducto.nombre}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
        />
        <input
          type="number"
          placeholder="Precio del producto"
          value={nuevoProducto.precio}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
        />
        <button onClick={agregarProductoAFirebase}>Agregar</button>
      </div>
    </div>
  );
}

export default App;
