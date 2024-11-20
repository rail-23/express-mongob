import { Router } from 'express';
import { obtenerEstudiantes } from '../controllers/user.controller'; // Asegúrate de que la ruta es correcta
import { verifyToken } from '../middleware/authJwt'; // Desde authJwt.js
import { isProfesor } from '../middleware/verificarRoles'; // Desde verificarRoles.js

const router = Router();

// Ruta protegida para obtener estudiantes
router.get('/estudiantes', [verifyToken, isProfesor], obtenerEstudiantes);


export default router;
