import axios from './axios'; // Axios ya configurado con el token y la baseURL

// Funciones relacionadas con Auth
export const login = async (data) => {
    const response = await axios.post('/auth/login', data);
    return response.data;
};
export const getNotas = async () => {
    const response = await axios.get('/notas');
    return response.data;
};

export const register = async (data) => {
    const response = await axios.post('/auth/register', data);
    return response.data;
};

// Funciones relacionadas con Notas
export const getNotasEstudiante = async () => {
    const response = await axios.get('/notas/estudiante'); // Ruta específica para estudiantes
    return response.data;
};

export const getNotasProfesor = async () => {
    const response = await axios.get('/notas/profesor'); // Ruta específica para profesores
    return response.data;
};

export const createNota = async (data) => {
    const response = await axios.post('/notas', data);
    return response.data;
};

export const updateNota = async (id, data) => {
    const response = await axios.put(`/notas/${id}`, data);
    return response.data;
};

export const deleteNota = async (id) => {
    const response = await axios.delete(`/notas/${id}`);
    return response.data;
};

// Funciones relacionadas con Estudiantes
export const getEstudiantes = async () => {
    const response = await axios.get('/user/estudiantes');
    return response.data;
};
