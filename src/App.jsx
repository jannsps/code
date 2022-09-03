import React from "react"
import {nanoid} from 'nanoid'

//crud nuevo

function App() {
  const [nombre,setNombre]=React.useState('')
  const [apellido,setApellido]=React.useState('')
  const [lista,setLista]=React.useState([])
  const [modoEdicion,setModoEdicion]=React.useState(false)
  const [id,setId]=React.useState('')
  const [error,setError]=React.useState(null)

  //guardar datos
  const guardarDatos=(e)=>{
    e.preventDefault()
    if (!nombre.trim()){
        setError('Falta el Nombre')
        return 
    }
    if (!apellido.trim()){
        setError('Falta el Apellido')
        return 
    }
    console.log('Agregando a: '+ nombre+' '+apellido);
    //guardar lista
    setLista([
        ...lista,
        {id:nanoid(4),nombre,apellido}
    ])
    //limpiar inputs
    e.target.reset()
    //limpiar estados
    setNombre('')
    setApellido('')
    //limpiar msj error
    setError(null)
    
}
//eliminar dato
const eliminar=(id)=>{
  if (modoEdicion){
    setError('Esta editando...no se puede eliminar.')
    return
  }
  const listaFiltrada=lista.filter((elemento)=>elemento.id!==id)
    setLista(listaFiltrada)
}
const editar=(elemento)=>{
  setModoEdicion(true)//cambiamos modo edicion a verdadero
  setNombre(elemento.nombre)
  setApellido(elemento.apellido)
  setId(elemento.id)

}
const editarDatos=(e)=>{
  e.preventDefault()
    if (!nombre.trim()){
        setError('Falta el Nombre')
        return 
    }
    if (!apellido.trim()){
        setError('Falta el Apellido')
        return 
    }
    //recorre toda la lista, cuando encuentre el id agrega id, nuevonombre y nuevapellido, 
      //sino devuelve cada elemento
    const listaEditada= lista.map(
    (elemento)=>elemento.id===id ?
    {
      id:id,nombre:nombre,apellido:apellido
    }:
    elemento)
    //nueva lista
    setLista(listaEditada)
    //dejar de editar y limpiar nombre apeelido e id
    setModoEdicion(false)
    setNombre('')
    setApellido('')
    setId('')
     //quitar mensaje de error
     setError(null)
}

  return (
    <div className="container">
      <div className="row">
      <div className="col-12">
        <h4 className="text-center">
          {modoEdicion ? 'Editar Usuario':'Agregar Usuario'}
        </h4>
        <form onSubmit={modoEdicion ? editarDatos: guardarDatos}>
          {
            error ? (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            ):null
          }
        <input type="text" 
            placeholder='Ingrese Nombre'
            className='form-control mb-3'
            onChange={(e)=>{setNombre(e.target.value)
              setError(null)}}
            value={nombre}
            />
            <input type="text" 
            placeholder='Ingrese Apellido'
            className='form-control mb-3'
            onChange={(e)=>{setApellido(e.target.value)
            setError(null)}}
            value={apellido}
            />
            <div className='d-grid gap-2'>
              {
                modoEdicion ? (<button className='btn btn-outline-warning' type='submit'>Editar</button>)
                :(<button className='btn btn-outline-info' type='submit'>Registrar</button>)
              }
              

            </div>
          </form>
      </div>
      </div>
      <hr />
      <div className="col-12">
        <h4 className='text-center'>Lista de usuarios</h4>
        <ul className='list-group'>
          {
            lista.length===0 ? <li className='list-group-item'>No existen usuarios</li>:
            (
              lista.map((elemento)=>(
                <li className='list-group-item' key={elemento.id}>
                  {elemento.nombre} {elemento.apellido}
                  <button className='btn btn-outline-success btn-sm float-end mx-2'
                  onClick={()=>editar(elemento)}>Editar</button> 
                  <button className='btn btn-outline-danger btn-sm float-end mx-2'
                  onClick={()=>eliminar(elemento.id)}>Eliminar</button>
                </li>
              ))
            )
          }
        </ul>
      </div>

        
    </div>
  );
}

export default App;
