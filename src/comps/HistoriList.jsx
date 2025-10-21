function HistoriList({ registros }) {
    <section className="form-section">
        <h2>Hostorial de Cambios</h2>
        {registros.length === 0 ? (
            <div className="empty-history">
                <p>Hostorial vacio</p>
            </div>
        ) : (registros.map((registros) => (
            <div key={registros.id} className="register-item">
                <p><strong>Version:</strong> {registros.version}</p>
                <p><strong>Descripcion:</strong> {registros.descripcion}</p>
                <p><strong>Autor:</strong> {registros.autor}</p>
                <p><strong>Hash:</strong> {registros.hash}</p>
            </div>
        )))}
    </section>
}
export default HistoriList;