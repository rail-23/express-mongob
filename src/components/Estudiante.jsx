import React, { useState } from 'react';
import { getNotasEstudiante } from '../api/services'; // Función específica para estudiantes
import '../css/Estudiante.css';

const Estudiante = () => {
    const [notas, setNotas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchNotas = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getNotasEstudiante(); // Usar la función específica
            setNotas(data);
        } catch (error) {
            console.error('Error al obtener notas:', error);
            setError('Ocurrió un error al cargar las notas.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="estudiante-container">
            <h2 className="title">Mis Notas</h2>
            <div className="button-container">
                <button onClick={fetchNotas} className="btn primary">Ver Notas</button>
            </div>
            {loading && <p className="loading">Cargando notas...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && notas.length > 0 && (
                <table className="notas-table">
                    <thead>
                        <tr>
                            <th>Materia</th>
                            <th>Calificación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notas.map((nota) => (
                            <tr key={nota._id}>
                                <td>{nota.materia}</td>
                                <td>{nota.calificacion}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {!loading && notas.length === 0 && !error && (
                <p>No hay notas disponibles.</p>
            )}
        </div>
    );
};

export default Estudiante;
