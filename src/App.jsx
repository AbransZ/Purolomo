

import { useState, useEffect } from "react";
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
    return registrosGuardados ? JSON.parse(registrosGuardados) : [];
  });

  useEffect(() => {
    localStorage.setItem('historial-versiones', JSON.stringify(registros));
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

    setRegistros([...registros, nuevoRegistro]);

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
        <HeaderPurolomo />
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
       <HistoriList registros={registros}/>
        </main>
      </>
    );
  }
export default App;