import { useState, useEffect } from 'react'
import { datosFalsos } from './productosMock'
import { ShoppingBag, Footprints, Headphones, Watch, Search, PlusCircle } from 'lucide-react'

// ESTILOS CENTRALIZADOS
const ESTILOS = {
  contenedor: {
    padding: '20px',
    fontFamily: 'sans-serif',
    backgroundColor: '#f4f4f9',
    minHeight: '100vh'
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    boxSizing: 'border-box'
  },
  tarjeta: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
  },
  etiqueta: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#555'
  },
  boton: {
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
  }
}

// MAPEO DE ICONOS
const ICONOS_POR_ID = {
  1: Footprints,
  2: ShoppingBag,
  3: Headphones,
  4: Watch
}

const CATEGORIAS = ['General', 'Calzado', 'Accesorios', 'Electrónica']

// COMPONENTES INTERNOS
const FormularioProducto = ({ onAgregar, nombre, setNombre, precio, setPrecio, categoria, setCategoria }) => (
  <div style={{ ...ESTILOS.tarjeta, flex: '1', minWidth: '300px', height: 'fit-content' }}>
    <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#2c3e50', display: 'flex', alignItems: 'center', gap: '10px' }}>
      <PlusCircle style={{ color: '#3498db' }} /> Nuevo Producto
    </h2>
    
    <form onSubmit={onAgregar}>
      <CampoFormulario 
        label="Nombre del Producto *" 
        type="text" 
        placeholder="Ej. Silla Ergonómicasssssssssssss"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      
      <CampoFormulario 
        label="Precio ($) *" 
        type="number" 
        placeholder="Ej. 149.99"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
      />
      
      <div style={{ marginBottom: '20px' }}>
        <label style={ESTILOS.etiqueta}>Categoría</label>
        <select 
          value={categoria} 
          onChange={(e) => setCategoria(e.target.value)}
          style={{ ...ESTILOS.input, backgroundColor: '#fff' }}
        >
          {CATEGORIAS.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      <button type="submit" style={ESTILOS.boton}>
        Guardar en Inventario
      </button>
    </form>
  </div>
)

const CampoFormulario = ({ label, type, placeholder, value, onChange }) => (
  <div style={{ marginBottom: '15px' }}>
    <label style={ESTILOS.etiqueta}>{label}</label>
    <input 
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={ESTILOS.input}
    />
  </div>
)

const TarjetaProducto = ({ producto }) => {
  const IconoComponent = ICONOS_POR_ID[producto.id] || ShoppingBag
  
  return (
    <div style={{ ...ESTILOS.tarjeta, border: '1px solid #e1e8ed', display: 'flex', flexDirection: 'column' }}>
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
        <IconoComponent style={{ width: '50px', height: '50px', color: '#555' }} />
      </div>

      <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#2c3e50', fontWeight: '600' }}>
        {producto.title}
      </h3>
      <p style={{ color: '#7f8c8d', fontSize: '13px', margin: '0 0 15px 0' }}>
        {producto.category?.name}
      </p>
      
      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 'bold', color: '#27ae60', fontSize: '20px' }}>
          ${producto.price}
        </span>
        <span style={{ fontSize: '11px', color: '#95a5a6', backgroundColor: '#eaeded', padding: '3px 8px', borderRadius: '4px' }}>
          ID: {producto.id}
        </span>
      </div>
    </div>
  )
}

// COMPONENTE PRINCIPAL
function App() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [busqueda, setBusqueda] = useState('')
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

  const manejarAgregarProducto = (e) => {
    e.preventDefault()
    
    if (!nombre.trim() || !precio) {
      alert('Por favor, completa todos los campos obligatorios.')
      return
    }

    const nuevoProducto = {
      id: productos.length + 1,
      title: nombre,
      price: parseFloat(precio),
      category: { name: categoria },
      images: ''
    }

    setProductos([nuevoProducto, ...productos])
    setNombre('')
    setPrecio('')
    setCategoria('General')
  }

  const productosFiltrados = productos.filter((producto) =>
    producto.title.toLowerCase().includes(busqueda.toLowerCase())
  )

  if (cargando) return <h2 style={{ fontFamily: 'sans-serif', padding: '20px' }}>Cargando inventario local seguro...</h2>

  return (
    <div style={ESTILOS.contenedor}>
      <h1 style={{ color: '#333' }}>📦 Panel de Inventario Profesional</h1>
      <p style={{ color: '#666' }}>Módulo de simulación de lecturas (GET) y escrituras (POST).</p>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', marginTop: '30px' }}>
        
        <FormularioProducto
          onAgregar={manejarAgregarProducto}
          nombre={nombre}
          setNombre={setNombre}
          precio={precio}
          setPrecio={setPrecio}
          categoria={categoria}
          setCategoria={setCategoria}
        />

        <div style={{ flex: '2', minWidth: '400px' }}>
          {/* Barra de búsqueda */}
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Buscar producto por nombre..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              style={{ ...ESTILOS.input, paddingLeft: '40px', fontSize: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
            />
            <Search style={{ position: 'absolute', left: '12px', top: '12px', width: '18px', height: '18px', color: '#aaa' }} />
          </div>

          {/* Grid de Tarjetas */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
            {productosFiltrados.map((producto) => (
              <TarjetaProducto key={producto.id} producto={producto} />
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
