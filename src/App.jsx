import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import HeaderPurolomo from "./components/HeaderPurolomo"
function App() {



  const [Descripcion, setDescripcion] = useState('');
  const [Autor, setAutor] = useState('');
  const [Version, setVersion] = useState('');
  const [Hash, setHash] = useState('');
  const [Fecha, setFecha] = useState(new Date().toISOString().slice(0,10));

    const [registro, setRegistro] = useState(()=>{
    const registrosGuardados = localStorage.getItem('historial-versiones');

    if (registrosGuardados) {
      return JSON.parse(registrosGuardados)
    } else{
      return []

    }
  });


  useEffect(() => {
    localStorage.setItem('historial-versiones', JSON.stringify(registro));
  },[registro]);

const handleSubmit = (evento) => {
    evento.preventDefault(); // Evita que la página se recargue

    // Verificamos que todos los campos estén llenos
    if (!Descripcion || !Autor || !Version || !Hash || !Fecha) {
      alert("Por favor, completa todos los campos.");
      return;
    }

      //agrgeamos registros nuevos
    setRegistro([...registro, nuevoRegistro]);

    // Creamos el objeto con todos los datos
    const nuevoRegistro = {
      descripcion:Descripcion,
      autor: Autor,
      version: Version,
      hash: Hash,
      Fecha: Fecha,
      id: Date.now()
    };

    console.log("Nuevo registro guardado:", nuevoRegistro);

  

    // Limpiamos todos los campos
    setDescripcion('');
    setAutor('');
    setVersion('');
    setHash('');
    setFecha(new Date().toISOString().slice(0,10));
  };

  return (

    <main className="main-content">
    <div>
     <HeaderPurolomo />
      
      <form onSubmit={handleSubmit} >

        <div className="form-section">
          <label>Descripcion</label>
          <input
          type="text"
          value={Descripcion}
          onChange={(e) => setDescripcion(e.target.value)
          } 
          />
        </div>

        <div>
          <label>Autor</label>
          <input 
          type="text"
          value={Autor}
          onChange={(e) => setAutor(e.target.value)
          }
           />
        </div>

         <div>
          <label>version</label>
          <input type="text"
          value={Version}
          onChange={(e) => setVersion(e.target.value)
          }
           />
        </div>

         <div>
          <label>Hash</label>
          <input type="text"
          value={Hash}
          onChange={(e) => setHash(e.target.value)
          } 
          />
        </div>

        <div>
          <label>fecha</label>
        <input 
        type="date"
        value={Fecha}
        onChange={(e)=>setFecha(e.target.value)}
        />
        </div>

        <button className="submit-button" type="submit">Guardar registro</button>

      </form>

      <HistoryList registro={registro}/>

    </div>
    </main>
  );
}

export default App;