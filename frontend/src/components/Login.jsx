import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/services'; // Llamada al backend
import { decodeJWT } from '../utils/decodeJWT'; // Decodificador de JWT

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(formData); // Login API
            const { token } = response;

            // Almacenar el token en localStorage
            localStorage.setItem('token', token);

            // Decodificar el token para obtener roles y otros datos
            const decoded = decodeJWT(token);
            if (!decoded) throw new Error("Token inválido");

            const { roles } = decoded;

            // Redirigir según el rol del usuario
            if (roles.includes('estudiante')) navigate('/estudiante');
            else if (roles.includes('profesor')) navigate('/profesor');
            else if (roles.includes('director')) navigate('/director');
        } catch (err) {
            console.error("Error en el inicio de sesión:", err);
            setError('Credenciales inválidas o problema en el servidor.');
        }
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Contraseña:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default Login;
