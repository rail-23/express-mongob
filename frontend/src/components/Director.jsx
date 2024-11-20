import React, { useEffect, useState } from 'react';
import { getNotas, updateNota, deleteNota } from '../api/services';
import { useNavigate } from 'react-router-dom';
import '../css/Director.css';

const Director = () => {
    const [notas, setNotas] = useState([]);
    const [editData, setEditData] = useState({ id: '', materia: '', calificacion: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchNotas = async () => {
        setLoading(true);
        try {
            const data = await getNotas();
            setNotas(data);
        } catch (error) {
            console.error('Error al obtener notas:', error);
            if (error.response?.status === 403) {
                alert('No tienes permisos para acceder a esta página.');
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotas();
    }, []);

    const handleEdit = async (e) => {
        e.preventDefault();
        if (!editData.materia.trim() || editData.calificacion === '') {
            alert('Todos los campos son obligatorios.');
            return;
        }

        try {
            await updateNota(editData.id, { materia: editData.materia, calificacion: editData.calificacion });
            alert('Nota actualizada con éxito');
            const updatedNotas = await getNotas();
            setNotas(updatedNotas);
            setEditData({ id: '', materia: '', calificacion: '' });
        } catch (error) {
            console.error('Error al actualizar nota:', error);
            alert('Error al actualizar la nota.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteNota(id);
            alert('Nota eliminada con éxito');
            setNotas(notas.filter((nota) => nota._id !== id));
        } catch (error) {
            console.error('Error al eliminar nota:', error);
            alert('Error al eliminar la nota.');
        }
    };

    const startEdit = (nota) => {
        setEditData({
            id: nota._id,
            materia: nota.materia,
            calificacion: nota.calificacion,
        });
    };

    return (
        <div className="director-container">
            <h2>Administración de Notas</h2>
            <button onClick={fetchNotas} className="btn refresh">Actualizar Notas</button>
            {loading ? (
                <p>Cargando notas...</p>
            ) : (
                <table className="notas-table">
                    <thead>
                        <tr>
                            <th>Estudiante</th>
                            <th>Materia</th>
                            <th>Calificación</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notas.length === 0 ? (
                            <tr>
                                <td colSpan="4">No hay notas disponibles.</td>
                            </tr>
                        ) : (
                            notas.map((nota) => (
                                <tr key={nota._id}>
                                    <td>{nota.estudiante?.nombre || 'Desconocido'}</td>
                                    <td>{nota.materia}</td>
                                    <td className={nota.calificacion < 60 ? 'low-grade' : ''}>
                                        {nota.calificacion}
                                    </td>
                                    <td>
                                        <button onClick={() => startEdit(nota)} className="btn edit">Editar</button>
                                        <button onClick={() => handleDelete(nota._id)} className="btn delete">Eliminar</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}

            {editData.id && (
                <div className="edit-form">
                    <h3>Editar Nota</h3>
                    <form onSubmit={handleEdit}>
                        <label>
                            Materia:
                            <input
                                type="text"
                                name="materia"
                                value={editData.materia}
                                onChange={(e) => setEditData({ ...editData, materia: e.target.value })}
                                required
                            />
                        </label>
                        <label>
                            Calificación:
                            <input
                                type="number"
                                name="calificacion"
                                value={editData.calificacion}
                                onChange={(e) => setEditData({ ...editData, calificacion: e.target.value })}
                                required
                            />
                        </label>
                        <button type="submit" className="btn save">Guardar Cambios</button>
                        <button
                            type="button"
                            onClick={() => setEditData({ id: '', materia: '', calificacion: '' })}
                            className="btn cancel"
                        >
                            Cancelar
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Director;
