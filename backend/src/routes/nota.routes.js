import { Router } from 'express';
import * as notaCtrl from '../controllers/nota.controller';
import { verifyToken } from '../middleware/authJwt';
import { isEstudiante, isProfesor, isDirector } from '../middleware/verificarRoles';

const router = Router();

// Ver notas
router.get('/estudiante', [verifyToken, isEstudiante], notaCtrl.verNotasEstudiante);

router.get('/profesor', [verifyToken, isProfesor], notaCtrl.verNotasProfesor);

// Agregar nota
router.post('/', [verifyToken, isProfesor], notaCtrl.agregarNota);

// Editar nota
router.put('/:id', [verifyToken, isDirector], notaCtrl.editarNota);

// Eliminar nota
router.delete('/:id', [verifyToken, isDirector], notaCtrl.eliminarNota);

export default router;