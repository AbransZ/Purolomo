import { useState, useEffect } from "react";

//import { useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import "./App.css";
import HeaderPurolomo from "./comps/HeaderPurolomo";
import HistoriList from "./comps/HistoriList";
import Formulario from "./comps/Form";
import EditModal from "./comps/Edit";

function App() {
  const api_url = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

  const [descripcion, setDescripcion] = useState("");
  const [autor, setAutor] = useState("");
  const [version, setVersion] = useState("");
  const [hash, setHash] = useState("");
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10));

  const [registros, setRegistros] = useState([]);
  const [listaAPP, setListaAPP] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [recordToEdit, setRecordToEdit] = useState(null);

  const handleEditClick = (registrosEdit) => {
    console.log("App.jsx: handleEditClick llamado con:", registrosEdit);
    setIsOpen(true);
    setRecordToEdit(registrosEdit);
  };

  const handleCloseEditModal = () => {
    setIsOpen(false);
    setRecordToEdit(null);
  };

  const handleUpdate = async (id, dataUpdated) => {
    try {
      const response = await axios.put(
        `${api_url}/registros/${id}`,
        dataUpdated
      );
      setRegistros((prev) =>
        prev.map((reg) => (reg.id === id ? response.data : reg))
      );
      handleCloseEditModal();
      alert("Registro actualizado con exito");
    } catch (Error) {
      console.error("Error al actualizar:", error);
      alert("Error al actualizar Datos.");
    }
  };

  useEffect(() => {
    const fetchRegistros = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${api_url}/registros`);
        setRegistros(response.data.data || []);
      } catch (err) {
        setError("Error al obtener los registros: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchAppList = async () => {
      try {
        const response = await axios.get(`${api_url}/aplicacion`);
        setListaAPP(response.data.data || []);
        console.log("Lista de aplicaciones obtenida:", response.data.data);
      } catch (error) {
        console.error("Error al obtener la lista de aplicaciones:", error);
      }
    };
    fetchRegistros();
    fetchAppList();
  }, []);

  const handleRecordDisabled = (idToRemove) => {
    setRegistros((prevRegistros) =>
      prevRegistros.filter((registro) => registro.id !== idToRemove)
    );
  };

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    if (!descripcion || !autor || !version || !hash || !fecha || !nombre) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const nuevoRegistro = {
      descripcion: descripcion,
      autor: autor,
      version: version,
      hash: hash,
      nombre: nombre,
      fecha: fecha,
    };

    try {
      const response = await axios.post(`${api_url}/registros`, nuevoRegistro);
      setRegistros((prevRegistros) => [response.data, ...prevRegistros]);

      setDescripcion("");
      setAutor("");
      setVersion("");
      setHash("");
      setNombre("");
      setFecha(new Date().toISOString().slice(0, 10));
    } catch (error) {
      console.error("Error al enviar el registro:", error);
      alert(
        "Hubo un error al enviar el registro. Por favor, intenta nuevamente."
      );
      return;
    }
  };
  if (loading) {
    return <p>Cargando registros</p>;
  }
  if (error) {
    return <p>Error:{error}</p>;
  }

  console.log(
    "App.jsx: Renderizando. isOpen =",
    isOpen,
    "recordToEdit =",
    recordToEdit
  );
  return (
    <>
      <HeaderPurolomo registros={registros} />
      <main className="main-content">
        <Formulario
          handleSubmit={handleSubmit}
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
          listaAPP={listaAPP}
        />
        <HistoriList
          registros={registros}
          onDisable={handleRecordDisabled}
          onEdit={handleEditClick}
        />
        <EditModal
          isOpen={isOpen}
          onClose={handleCloseEditModal}
          record={recordToEdit}
          onSave={handleUpdate}
        />
      </main>
    </>
  );
}
export default App;
