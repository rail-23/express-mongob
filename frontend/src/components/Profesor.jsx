import React, { useEffect, useState } from 'react';
import { getEstudiantes, createNota, getNotasProfesor } from '../api/services'; // Funciones específicas
import '../css/Profesor.css';

const Profesor = () => {
    const [estudiantes, setEstudiantes] = useState([]);
    const [notas, setNotas] = useState([]);
    const [notaData, setNotaData] = useState({ estudianteId: '', materia: '', calificacion: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEstudiantes = async () => {
            try {
                const data = await getEstudiantes();
                setEstudiantes(data);
            } catch (error) {
                console.error('Error al obtener estudiantes:', error);
                alert('No se pudieron cargar los estudiantes. Intente nuevamente.');
            }
        };

        fetchEstudiantes();
        fetchNotas();
    }, []);

    const fetchNotas = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getNotasProfesor(); // Usar función específica
            setNotas(data);
        } catch (error) {
            console.error('Error al obtener notas:', error);
            setError('Error al cargar las notas.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNotaData({ ...notaData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createNota(notaData);
            alert('Nota agregada con éxito');
            setNotaData({ estudianteId: '', materia: '', calificacion: '' });
            fetchNotas(); // Actualiza las notas
        } catch (error) {
            console.error('Error al agregar nota:', error);
            alert('No se pudo agregar la nota.');
        }
    };

    return (
        <div className="profesor-container">
            <h2>Agregar Nota</h2>
            <form onSubmit={handleSubmit} className="form-container">
                <label>
                    Estudiante:
                    <select
                        name="estudianteId"
                        value={notaData.estudianteId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione un estudiante</option>
                        {estudiantes.map((estudiante) => (
                            <option key={estudiante._id} value={estudiante._id}>
                                {estudiante.nombre}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Materia:
                    <input
                        type="text"
                        name="materia"
                        value={notaData.materia}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Calificación:
                    <input
                        type="number"
                        name="calificacion"
                        value={notaData.calificacion}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Agregar Nota</button>
            </form>

            <button onClick={fetchNotas} className="btn primary">Actualizar Notas</button>

            <h2>Notas Agregadas</h2>
            {loading && <p className="loading">Cargando notas...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && notas.length > 0 && (
                <table className="notas-table">
                    <thead>
                        <tr>
                            <th>Estudiante</th>
                            <th>Materia</th>
                            <th>Calificación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notas.map((nota) => (
                            <tr key={nota._id}>
                                <td>{nota.estudiante.nombre}</td>
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

export default Profesor;
