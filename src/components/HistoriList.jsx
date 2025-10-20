function HistoriList({ registro }) {
    <section className="form-section">
        <h2>Hostorial de Cambios</h2>
        {registro.length === 0 ? (
            <div className="empty-history">
                <p>Hostorial vacio</p>
            </div>
        ) : (registro.map((registro) => (
            <div key={registro.id} className="register-item">
                <p><strong>Version:</strong> {registro.version}</p>
                <p><strong>Descripcion:</strong> {registro.descripcion}</p>
                <p><strong>Autor:</strong> {registro.autor}</p>
                <p><strong>Hash:</strong> {registro.hash}</p>
            </div>
        )))}
    </section>
}
export default HistoriList;