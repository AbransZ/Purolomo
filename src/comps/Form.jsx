function Formulario({
    handleSubmit,
    descripcion,
    autor,
    version,
    hash,
    fecha,
    setDescripcion,
    setAutor,
    setVersion,
    setHash,
    setFechas,
    nombre,
    setNombre,
}) {



    return (

       
            <section className="form-section">
                <h2>Registrar nueva version</h2>

                <form className="form-grid" onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Nombre de la aplicacion</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Descripcion</label>
                        <input
                            type="text"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Autor</label>
                        <input
                            type="text"
                            value={autor}
                            onChange={(e) => setAutor(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Version</label>
                        <input
                            type="text"
                            value={version}
                            onChange={(e) => setVersion(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Hash del Commit</label>
                        <input
                            type="text"
                            value={hash}
                            onChange={(e) => setHash(e.target.value)}
                        />
                    </div>

                     <div className="form-group">
                        <label>Fecha</label>
                        <input 
                        type="text"
                        value={fecha}
                        onChange={(e)=>setFechas(e.target.value)}
                        />
                    </div>
                </form>
            </section>
       

    );
}
export default Formulario;