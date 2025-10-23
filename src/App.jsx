

import { useState, useEffect, useMemo } from "react";
import "./App.css";
import HeaderPurolomo from "./comps/HeaderPurolomo";
import HistoriList from "./comps/HistoriList"
import Formulario from "./comps/Form";

function App() {

  const [descripcion, setDescripcion] = useState('');
  const [autor, setAutor] = useState('');
  const [version, setVersion] = useState('');
  const [hash, setHash] = useState('');
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10));
  

const [registros, setRegistros] = useState(() => {
    const registrosGuardados = localStorage.getItem('historial-versiones');
    let initialRegistros = [];
    if (registrosGuardados) {
      try {
        initialRegistros = JSON.parse(registrosGuardados);
        if (!Array.isArray(initialRegistros)) initialRegistros = [];
      } catch (e) {
        console.error("Error al parsear localStorage", e);
        initialRegistros = [];
      }
    }
    return initialRegistros; // Devuelve la lista SIN ordenar
  });

  useEffect(() => {
    localStorage.setItem('historial-versiones', JSON.stringify(registros));
  }, [registros]);

  const sortedRegistros = useMemo(() => {
    // Crea una copia y la ordena (descendente por fecha, luego versión)
    return [...registros].sort((a, b) => {
      const dateA = a.fecha || '';
      const dateB = b.fecha || '';
      const dateCompare = dateB.localeCompare(dateA);
      if (dateCompare !== 0) return dateCompare;
      const versionA = a.version || '';
      const versionB = b.version || '';
      return versionB.localeCompare(versionA);
    });
  }, [registros]);

  const handleSubmit = (evento) => {
    evento.preventDefault();
    if (!descripcion || !autor || !version || !hash || !fecha || !nombre) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const nuevoRegistro = {
      id: Date.now(),
      descripcion:descripcion,
      autor:autor,
      version:version,
      hash: hash,
      nombre:nombre,
      fecha:fecha,
    };

  

    setRegistros(prevRegistros => [nuevoRegistro, ...prevRegistros]);

   

    // Limpiar los campos
    setDescripcion('');
    setAutor('');
    setVersion('');
    setHash('');
    setNombre('');
    setFecha(new Date().toISOString().slice(0, 10));
  };

    return (
      <>
        <HeaderPurolomo registros= {sortedRegistros} />
        <main className="main-content">
        <Formulario
        handleSubmit= {handleSubmit}
        descripcion={descripcion}
        autor={autor}
        version={version}
        hash={hash}
        fecha={fecha}
        setDescripcion={setDescripcion}
        setAutor={setAutor}
        setVersion={setVersion}
        setHash={setHash}
        setFecha={setFecha}
        nombre={nombre}
        setNombre={setNombre}
         />
       <HistoriList sortedRegistros={sortedRegistros}/>
        </main>
      </>
    );
  }
export default App;