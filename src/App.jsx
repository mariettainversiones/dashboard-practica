import { useState, useEffect } from 'react'
import { datosFalsos } from './productosMock'
import { ShoppingBag, Footprints, Headphones, Watch, Search, PlusCircle } from 'lucide-react'

function App() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [busqueda, setBusqueda] = useState('')

  // 1. NUEVOS ESTADOS: Para capturar los datos del formulario
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [categoria, setCategoria] = useState('General')

  useEffect(() => {
    const timer = setTimeout(() => {
      setProductos(datosFalsos)
      setCargando(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  // 2. NUEVA FUNCIÓN: Manejar el envío del formulario (Simular POST)
  const manejarAgregarProducto = (e) => {
    e.preventDefault() // Evita que la página se recargue

    // Validación simple
    if (!nombre.trim() || !precio) {
      alert('Por favor, completa todos los campos obligatorios.')
      return
    }

    // Creamos el nuevo objeto de producto simulando la respuesta del backend
    const nuevoProducto = {
      id: productos.length + 1, // ID autoincremental básico
      title: nombre,
      price: parseFloat(precio),
      category: { name: categoria },
      images: '' // No requiere URL gracias a los iconos
    }

    // Actualizamos el estado agregando el nuevo producto al inicio de la lista
    setProductos([nuevoProducto, ...productos])

    // Limpiamos los campos del formulario para el siguiente registro
    setNombre('')
    setPrecio('')
    setCategoria('General')
  }

  const renderIconoProducto = (id) => {
    const estiloIcono = { width: '50px', height: '50px', color: '#555' }
    switch(id) {
      case 1: return <Footprints style={estiloIcono} />
      case 2: return <ShoppingBag style={estiloIcono} />
      case 3: return <Headphones style={estiloIcono} />
      case 4: return <Watch style={estiloIcono} />
      default: return <ShoppingBag style={estiloIcono} /> // Icono por defecto para los nuevos
    }
  }

  const productosFiltrados = productos.filter((producto) =>
    producto.title.toLowerCase().includes(busqueda.toLowerCase())
  )

  if (cargando) return <h2 style={{ fontFamily: 'sans-serif', padding: '20px' }}>Cargando inventario local seguro...</h2>

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f4f4f9', minHeight: '100vh' }}>
      <h1 style={{ color: '#333' }}>📦 Panel de Inventario Profesional</h1>
      <p style={{ color: '#666' }}>Módulo de simulación de lecturas (GET) y escrituras (POST).</p>

      {/* DISEÑO EN DOS COLUMNAS: Formulario a la izquierda, Inventario a la derecha */}
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', marginTop: '30px' }}>
        
        {/* COLUMNA 1: El Formulario */}
        <div style={{ 
          flex: '1', 
          minWidth: '300px', 
          backgroundColor: '#fff', 
          padding: '25px', 
          borderRadius: '12px', 
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
          height: 'fit-content'
        }}>
          <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#2c3e50', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <PlusCircle style={{ color: '#3498db' }} /> Nuevo Producto
          </h2>
          
          <form onSubmit={manejarAgregarProducto}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold', color: '#555' }}>Nombre del Producto *</label>
              <input 
                type="text" 
                placeholder="Ej. Silla Ergonómica" 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold', color: '#555' }}>Precio ($) *</label>
              <input 
                type="number" 
                placeholder="Ej. 149.99" 
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold', color: '#555' }}>Categoría</label>
              <select 
                value={categoria} 
                onChange={(e) => setCategoria(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', backgroundColor: '#fff', boxSizing: 'border-box' }}
              >
                <option value="General">General</option>
                <option value="Calzado">Calzado</option>
                <option value="Accesorios">Accesorios</option>
                <option value="Electrónica">Electrónica</option>
              </select>
            </div>

            <button 
              type="submit" 
              style={{ 
                width: '100%', 
                padding: '12px', 
                backgroundColor: '#3498db', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '6px', 
                fontSize: '16px', 
                fontWeight: 'bold', 
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
            >
              Guardar en Inventario
            </button>
          </form>
        </div>

        {/* COLUMNA 2: Listado y Buscador */}
        <div style={{ flex: '2', minWidth: '400px' }}>
          
          {/* Barra de búsqueda */}
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Buscar producto por nombre..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 20px 12px 40px',
                fontSize: '16px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            <Search style={{ position: 'absolute', left: '12px', top: '14px', width: '18px', height: '18px', color: '#aaa' }} />
          </div>

          {/* Grid de Tarjetas */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
            gap: '20px' 
          }}>
            {productosFiltrados.map((producto) => (
              <div key={producto.id} style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                border: '1px solid #e1e8ed',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ 
                  width: '100%', 
                  height: '120px', 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '8px', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  marginBottom: '15px'
                }}>
                  {renderIconoProducto(producto.id)}
                </div>

                <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#2c3e50', fontWeight: '600' }}>{producto.title}</h3>
                <p style={{ color: '#7f8c8d', fontSize: '13px', margin: '0 0 15px 0' }}>{producto.category?.name}</p>
                
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bold', color: '#27ae60', fontSize: '20px' }}>${producto.price}</span>
                  <span style={{ fontSize: '11px', color: '#95a5a6', backgroundColor: '#eaeded', padding: '3px 8px', borderRadius: '4px' }}>
                    ID: {producto.id}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {productosFiltrados.length === 0 && (
            <p style={{ color: '#777', marginTop: '20px' }}>No se encontraron productos.</p>
          )}
        </div>

      </div>
    </div>
  )
}

export default App
