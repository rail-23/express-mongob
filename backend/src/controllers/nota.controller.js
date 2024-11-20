import Nota from '../models/Nota';
import User from '../models/User';

// Ver notas
export const verNotas = async (req, res) => {
    try {
        // Verifica si el usuario es estudiante
        if (req.roles.includes('estudiante')) {
            const notas = await Nota.find({ estudiante: req.userId }).populate('estudiante', 'nombre email');
            return res.status(200).json(notas);
        }

        return res.status(403).json({ message: 'Acceso denegado' });
    } catch (error) {
        console.error('Error al obtener notas:', error);
        res.status(500).json({ message: 'Error al obtener notas', error });
    }
};


// Agregar nota
export const agregarNota = async (req, res) => {
    const { estudianteId, materia, calificacion } = req.body;

    try {
        const estudiante = await User.findById(estudianteId);
        if (!estudiante || !estudiante.roles.includes('estudiante')) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }

        const newNota = new Nota({ estudiante: estudianteId, materia, calificacion });
        await newNota.save();

        res.status(201).json({ message: 'Nota agregada con éxito', nota: newNota });
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar nota', error });
    }
};

// Editar nota
export const editarNota = async (req, res) => {
    const { id } = req.params;
    const { materia, calificacion } = req.body;

    try {
        const updatedNota = await Nota.findByIdAndUpdate(id, { materia, calificacion }, { new: true });
        if (!updatedNota) {
            return res.status(404).json({ message: 'Nota no encontrada' });
        }

        res.status(200).json({ message: 'Nota actualizada con éxito', nota: updatedNota });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar nota', error });
    }
};

// Eliminar nota
export const eliminarNota = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedNota = await Nota.findByIdAndDelete(id);
        if (!deletedNota) {
            return res.status(404).json({ message: 'Nota no encontrada' });
        }

        res.status(200).json({ message: 'Nota eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar nota', error });
    }
};
// Controlador para ver notas de estudiantes
export const verNotasEstudiante = async (req, res) => {
    try {
        const notas = await Nota.find({ estudiante: req.userId }).populate('estudiante', 'nombre email');
        res.status(200).json(notas);
    } catch (error) {
        console.error('Error al obtener notas del estudiante:', error);
        res.status(500).json({ message: 'Error al obtener notas', error });
    }
};


// Controlador para ver notas de profesores
export const verNotasProfesor = async (req, res) => {
    try {
        const notas = await Nota.find().populate('estudiante', 'nombre email'); // Si quieres filtrar por profesor, añade una relación.
        res.status(200).json(notas);
    } catch (error) {
        console.error('Error al obtener notas del profesor:', error);
        res.status(500).json({ message: 'Error al obtener notas', error });
    }
};
