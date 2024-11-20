import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Estudiante from './components/Estudiante';
import Profesor from './components/Profesor';
import Director from './components/Director';

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/register">Registro</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/estudiante" element={<Estudiante />} />
        <Route path="/profesor" element={<Profesor />} />
        <Route path="/director" element={<Director />} />
      </Routes>
    </div>
  );
}

export default App;
