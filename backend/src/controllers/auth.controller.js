import jwt from 'jsonwebtoken';
import User from '../models/User';
import config from '../config/config';
import { ROLES } from '../models/Role';

export const signUp = async (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body;

        // Asignar rol predeterminado si no se proporciona
        const userRole = rol || 'estudiante';

        // Verificar si el rol es válido
        if (!ROLES.includes(userRole)) {
            return res.status(400).json({ message: `El rol ${userRole} no es válido. Roles permitidos: ${ROLES.join(', ')}` });
        }

        // Verificar si el usuario ya existe
        const userFound = await User.findOne({ email });
        if (userFound) return res.status(400).json({ message: 'El usuario ya existe' });

        // Crear nuevo usuario con el rol proporcionado o predeterminado
        const newUser = new User({
            nombre,
            email,
            password: await User.encryptPassword(password),
            roles: [userRole]
        });

        const savedUser = await newUser.save();

        // Generar token JWT
        const token = jwt.sign({ id: savedUser._id, roles: savedUser.roles }, config.SECRET, {
            expiresIn: 86400 // 24 horas
        });

        res.status(201).json({ token });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error al registrar el usuario', error });
    }
};


export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userFound = await User.findOne({ email });

        if (!userFound) return res.status(400).json({ message: 'Usuario no encontrado' });

        const matchPassword = await User.comparePassword(password, userFound.password);
        if (!matchPassword) return res.status(401).json({ token: null, message: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: userFound._id, roles: userFound.roles }, config.SECRET, {
            expiresIn: 86400
        });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
};
