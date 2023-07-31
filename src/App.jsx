import { useState } from 'react'
import PropTypes from 'prop-types'
import './App.css'
import confetti from 'canvas-confetti'

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

const Bloque = ({ partidos, titulo, seleccionados, handleClickBloque, handleClickPartido }) => {
  return <>
    <div className="block p-6 mb-2 sm:mb-0 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" onClick={handleClickBloque}>
      <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
        {titulo}
      </h5>
      <div className="flex flex-wrap flex-row space-x-2">
        {partidos.sort((a, b) => b.escaños-a.escaños).map(partido => {
          return <Partido key={partido.nombre} partido={partido} seleccionado={seleccionados.includes(partido)} handleClickPartido={(e) => handleClickPartido(e, partido)} />
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
  seleccionados: PropTypes.array,
  handleClickBloque: PropTypes.func,
  handleClickPartido: PropTypes.func
}

const Partido = ({ partido, handleClickPartido, seleccionado }) => {
  return <>
    <div className={`partido inline-block p-2 m-2 rounded-lg text-white font-bold ${partido.color} cursor-pointer ${seleccionado ? 'brightness-50 border border-gray-900' : 'border border-transparent' }`} onClick={handleClickPartido}>
      <div className="nombre">{partido.nombre}</div>
      <div className="escaños">{partido.escaños}</div>
    </div>
  </>
}

Partido.propTypes = {
  partido: PropTypes.obj,
  handleClickPartido: PropTypes.func,
  seleccionado: PropTypes.bool
}

const Modal = ({ showModal, handleClose, messageModal }) => {
  return (
    <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Resultado
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => handleClose()}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    {messageModal}
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button type="button" onClick={() => handleClose()}>
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

Modal.propTypes = {
  showModal: PropTypes.bool,
  handleClose: PropTypes.func,
  messageModal: PropTypes.string
}

function App() {
  const [partidos, setPartidos] = useState(partidos_inicial)
  const [seleccionados, setSeleccionados] = useState([])
  const [afavor, setAfavor] = useState([])
  const [abstencion, setAbstencion] = useState([])
  const [encontra, setEncontra] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [messageModal, setMessageModal] = useState()

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
    if (bloque === 'afavor') {
      setAfavor([...afavor, ...seleccionados.filter(p => !afavor.includes(p))])
    } else {
      setAfavor(afavor.filter(p => !seleccionados.includes(p)))
    }
    if (bloque === 'abstencion') {
      setAbstencion([...abstencion, ...seleccionados.filter(p => !abstencion.includes(p))])
    } else {
      setAbstencion(abstencion.filter(p => !seleccionados.includes(p)))
    }
    if (bloque === 'encontra') {
      setEncontra([...encontra, ...seleccionados.filter(p => !encontra.includes(p))])
    } else {
      setEncontra(encontra.filter(p => !seleccionados.includes(p)))
    }
    if (bloque === 'partidos') {
      setPartidos([...partidos, ...seleccionados.filter(p => !partidos.includes(p))])
    } else {
      setPartidos(partidos.filter(p => !seleccionados.includes(p)))
    }
    setSeleccionados([])
  }

  const handleReset = (e) => {
    e.stopPropagation()
    setSeleccionados([])
    setAfavor([])
    setAbstencion([])
    setEncontra([])
    setPartidos(partidos_inicial)
  }

  const handleCheck = () => {
    if (partidos.length !== 0) {
      setMessageModal('Es necesario asignar a todos los partidos a favor, en abstención o en contra')
      setShowModal(true)
      return
    }
    if (afavor.reduce((acc, p) => acc + p.escaños, 0)>175) {
      setMessageModal('¡Mayoría absoluta! Se produce la elección del presidente en primera ronda. ¡Felicidades!')
      setShowModal(true)
      confetti()
      return
    } 
    if (afavor.reduce((acc, p) => acc + p.escaños, 0)>encontra.reduce((acc, p) => acc + p.escaños, 0)) {
      setMessageModal('¡Más síes que noes! Se produce la elección del presidente en segunda ronda. ¡Felicidades!')
      setShowModal(true)
      confetti()
      return
    } 
    setMessageModal('Los números no dan. Tienes 20 días para lograr otro pacto... o nos vamos a nuevas elecciones 😔')
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <>
      <h1 className="mb-5">Pactómetro</h1>
      <div className="sm:grid sm:grid-cols-3 sm:grid-rows-1 sm:gap-4">
        <Bloque partidos={afavor} titulo="A favor" seleccionados={seleccionados} handleClickBloque={(e) => handleClickBloque(e, 'afavor')} handleClickPartido={handleClickPartido} />
        <Bloque partidos={abstencion} titulo="Abstención" seleccionados={seleccionados} handleClickBloque={(e) => handleClickBloque(e, 'abstencion')} handleClickPartido={handleClickPartido} />
        <Bloque partidos={encontra} titulo="En contra" seleccionados={seleccionados} handleClickBloque={(e) => handleClickBloque(e, 'encontra')} handleClickPartido={handleClickPartido} />
      </div>
      <div className="partidos mt-2 p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" onClick={(e) => handleClickBloque(e, 'partidos')}>
        {partidos.sort((a, b) => b.escaños-a.escaños).map(partido => {
          return <Partido key={partido.nombre} partido={partido} seleccionado={seleccionados.includes(partido)} handleClickPartido={(e) => handleClickPartido(e, partido)} />
        })}
      </div>
      <div className="partidos mt-2 p-2" onClick={(e) => handleClickBloque(e, 'partidos')}>
        <button type="button" onClick={handleCheck}>Comprobar</button>
        <button type="button" onClick={(e) => handleReset(e)}>Reset</button>
      </div>
      <Modal showModal={showModal} handleClose={handleClose} messageModal={messageModal} />
    </>
  )
}

export default App
