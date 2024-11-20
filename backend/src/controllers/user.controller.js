import User from '../models/User';
import bcrypt from 'bcryptjs';
import  Router  from 'express';

export const crearUsuario = async (req, res) => {
    const { nombre, email, password, roles } = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'El usuario ya existe' });
    }

    try {
        // Crear nuevo usuario
        const newUser = new User({
            nombre,
            email,
            password: await User.encryptPassword(password),
            roles: roles || ["estudiante"]
        });

        // Guardar usuario
        await newUser.save();
        res.status(201).json({ message: 'Usuario creado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error });
    }
};

export const obtenerEstudiantes = async (req, res) => {
    try {
        const estudiantes = await User.find({ roles: "estudiante" }); 
        res.status(200).json(estudiantes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener estudiantes" });
    }
};
