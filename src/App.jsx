import { useState } from "react";

function App() {

  const [registro, setRegistro] = useState([]);

  const [Descripcion, setDescripcion] = useState('');
  const [Autor, setAutor] = useState('');
  const [Version, setVersion] = useState('');
  const [Hash, setHash] = useState('');
  const [Fecha, setFecha] = useState(new Date().toISOString().slice(0,10));

const handleSubmit = (evento) => {
    evento.preventDefault(); // Evita que la página se recargue

    // Verificamos que todos los campos estén llenos
    if (!Descripcion || !Autor || !Version || !Hash || !Fecha) {
      alert("Por favor, completa todos los campos.");
      return;
    }

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

    //agrgeamos registros nuevos
    setRegistro([...registro, nuevoRegistro]);

    // Limpiamos todos los campos
    setDescripcion('');
    setAutor('');
    setVersion('');
    setHash('');
    setFecha(new Date().toISOString().slice(0,10));
  };

  return (
    <div>
      <h1>Reporte de Cambios De Version Purolomo, C.A</h1>
      <form onSubmit={handleSubmit}>

        <div>
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

        <button type="submit">Guardar registro</button>

      </form>

      <div className="lista-registro">
        <h2>Registros de Cambios Realizados en las versiones</h2>
        {registro.map((registro) => (
           <div key={registro.id} className="registro-item">
            <p><strong>Version:</strong> {registro.version}</p>
            <p><strong>Descripcion:</strong> {registro.descripcion}</p>
            <p><strong>Autor:</strong> {registro.autor}</p>
            <p><strong>Hash:</strong> {registro.hash}</p>
          </div>
        ))}
        </div>
      

    </div>
  );
}

export default App;