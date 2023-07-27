import { useState } from 'react'
import PropTypes from 'prop-types'
import './App.css'

const partidos_inicial = [
  { nombre: 'PP', color: 'bg-blue-600', escaños: 136 },
  { nombre: 'PSOE', color: 'bg-red-600', escaños: 122 },
  { nombre: 'VOX', color: 'bg-green-600', escaños: 33 },
  { nombre: 'SUMAR', color: 'bg-pink-600', escaños: 31 },
  { nombre: 'ERC', color: 'bg-yellow-600', escaños: 7 },
  { nombre: 'JxCat', color: 'bg-pink-600', escaños: 7 },
  { nombre: 'Bildu', color: 'bg-green-600', escaños: 6 },
  { nombre: 'PNV', color: 'bg-orange-600', escaños: 5 },
  { nombre: 'BNG', color: 'bg-blue-600', escaños: 1 },
  { nombre: 'CC', color: 'bg-yellow-600', escaños: 1 },
  { nombre: 'UPN', color: 'bg-blue-600', escaños: 1 },
]

const Bloque = ({ partidos, titulo, handleClickBloque, handleClickPartido }) => {
  return <>
    <div className="afavor block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" onClick={handleClickBloque}>
      <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
        {titulo}
      </h5>
      <div className="flex flex-row space-x-2">
        {partidos.sort((a, b) => b.escaños-a.escaños).map(partido => {
          return <Partido key={partido.nombre} partido={partido} handleClickPartido={(e) => handleClickPartido(e, partido)} />
        })}
      </div>
      <div className="border-t-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
        {partidos.reduce((acc, p) => acc + p.escaños, 0)} escaños
      </div>          
    </div>
  </>
}

Bloque.propTypes = {
  partidos: PropTypes.array,
  titulo: PropTypes.text,
  handleClickBloque: PropTypes.func,
  handleClickPartido: PropTypes.func
};

const Partido = ({ partido, handleClickPartido, seleccionado }) => {
  return <>
    <div className={`partido inline-block p-2 m-2 rounded-lg text-white font-bold ${partido.color} cursor-pointer ${seleccionado ? 'brightness-150 text-black' : 'brightness-60' }`} onClick={handleClickPartido}>
      <div className="nombre">{partido.nombre}</div>
      <div className="escaños">{partido.escaños}</div>
    </div>
  </>
}

Partido.propTypes = {
  partido: PropTypes.obj,
  handleClickPartido: PropTypes.func,
  seleccionado: PropTypes.bool
};

function App() {
  const [partidos, setPartidos] = useState(partidos_inicial)
  const [seleccionados, setSeleccionados] = useState([])
  const [afavor, setAfavor] = useState([])
  const [abstencion, setAbstencion] = useState([])
  const [encontra, setEncontra] = useState([])

  const handleClickPartido = (e, partido) => {
    e.stopPropagation()
    if (seleccionados.includes(partido)) {
      setSeleccionados(seleccionados.filter(p => p !== partido))
    } else {
      setSeleccionados([...seleccionados, partido])
    }
  }

  const handleClickBloque = (e, bloque) => {
    e.stopPropagation()
    console.log('handleClickBloque', bloque)
    // console.log('bloque', bloque)
    if (bloque === 'afavor') {
      setAfavor([...afavor, ...seleccionados])
    } else {
      setAfavor(afavor.filter(p => !seleccionados.includes(p)))
    }
    if (bloque === 'abstencion') {
      setAbstencion([...abstencion, ...seleccionados])
    } else {
      setAbstencion(abstencion.filter(p => !seleccionados.includes(p)))
    }
    if (bloque === 'encontra') {
      setEncontra([...encontra, ...seleccionados])
    } else {
      setEncontra(encontra.filter(p => !seleccionados.includes(p)))
    }
    if (bloque === 'partidos') {
      setPartidos([...partidos, ...seleccionados])
    } else {
      setPartidos(partidos.filter(p => !seleccionados.includes(p)))
    }
    setSeleccionados([])
  }

  return (
    <>
      <h1>Pactómetro</h1>
      <div className="flex flex-row space-x-2">
        <Bloque partidos={afavor} titulo="A favor" handleClickBloque={(e) => handleClickBloque(e, 'afavor')} handleClickPartido={handleClickPartido} />
        <Bloque partidos={abstencion} titulo="Abstención" handleClickBloque={(e) => handleClickBloque(e, 'abstencion')} handleClickPartido={handleClickPartido} />
        <Bloque partidos={encontra} titulo="En contra" handleClickBloque={(e) => handleClickBloque(e, 'encontra')} handleClickPartido={handleClickPartido} />
      </div>
      <div className="partidos mt-2 p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" onClick={(e) => handleClickBloque(e, 'partidos')}>
        {partidos.sort((a, b) => b.escaños-a.escaños).map(partido => {
          return <Partido key={partido.nombre} partido={partido} seleccionado={seleccionados.includes(partido)} handleClickPartido={(e) => handleClickPartido(e, partido)} />
        })}
      </div>
    </>
  )
}

export default App
