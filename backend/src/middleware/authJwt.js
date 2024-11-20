import jwt from 'jsonwebtoken';
import User from '../models/User';
import config from '../config/config';

export const verifyToken = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    console.log('Token recibido:', token); // Depuración
    if (!token) {
        return res.status(403).json({ message: 'No se proporcionó un token' });
    }

    try {
        const decoded = jwt.verify(token, config.SECRET);
        console.log('Token decodificado:', decoded); // Depuración
        req.userId = decoded.id;

        const user = await User.findById(req.userId, { password: 0 });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        req.roles = user.roles;
        console.log('Roles del usuario:', req.roles); // Depuración
        next();
    } catch (error) {
        console.error('Error al verificar el token:', error); // Depuración
        return res.status(401).json({ message: 'Token no válido' });
    }
};