

import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import HeaderPurolomo from "./comps/HeaderPurolomo";
import HistoriList from "./comps/HistoriList"
import Formulario from "./comps/Form";


function App() {

  const api_url = 'http://localhost:3001/api';

  const [descripcion, setDescripcion] = useState('');
  const [autor, setAutor] = useState('');
  const [version, setVersion] = useState('');
  const [hash, setHash] = useState('');
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10));
  

const [registros, setRegistros] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegistros = async () => {
      try{
        setLoading(true);
        setError(null);
        const response = await axios.get(`${api_url}/registros`);
        setRegistros(response.data.data|| []);
      }
      catch (err) {
        setError('Error al obtener los registros: ' + err.message);
      }finally{
        setLoading(false);
      }
    }
    fetchRegistros();
  },[]);


  const handleSubmit = async(evento) => {
    evento.preventDefault();
    if (!descripcion || !autor || !version || !hash || !fecha || !nombre) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const nuevoRegistro = {
      descripcion:descripcion,
      autor:autor,
      version:version,
      hash: hash,
      nombre:nombre,
      fecha:fecha,
    };

  

    try{ 
      const response = await axios.post(`${api_url}/registros`, nuevoRegistro);
        setRegistros(prevRegistros => [response.data,...prevRegistros])

        setDescripcion('');
    setAutor('');
    setVersion('');
    setHash('');
    setNombre('');
    setFecha(new Date().toISOString().slice(0, 10));}     
    
    catch (error){
      console.error("Error al enviar el registro:", error);
      alert("Hubo un error al enviar el registro. Por favor, intenta nuevamente.");
      return;
    }

  };
if (loading) {return<p>Cargando registros</p>}
if (error) {return<p>Error:{error}</p>}
    return (
      <>
        <HeaderPurolomo registros= {registros} />
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