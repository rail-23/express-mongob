import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import notaRoutes from './routes/nota.routes';
import { crearRoles } from './libs/iniciarRoles';

const app = express();
crearRoles();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/notas', notaRoutes);

export default app;
