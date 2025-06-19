import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserGraduate, FaChalkboardTeacher, FaInfoCircle } from 'react-icons/fa';

export default function Login({ setUsuario }) {
  const [email, setEmail] = useState('');

  const handleLogin = async () => {
    const res = await fetch(`http://localhost:4007/api/usuarios?email=${email}`);
    const data = await res.json();
    if (data.length > 0) {
      setUsuario(data[0]);
    } else {
      alert('Usuario no encontrado');
    }
  };

  const usarDemo = (correo) => {
    setEmail(correo);
  };

  return (
    <div className="text-start">
      <h2 className="text-center mb-4 text-primary fw-bold">Iniciar Sesión</h2>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Correo institucional</label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="ejemplo@upeu.edu.pe"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button className="btn btn-primary w-100" onClick={handleLogin}>
        Ingresar
      </button>

      <hr className="my-4" />

      <p className="text-muted text-center"><em>Este formulario es un demo funcional</em></p>

      <div className="bg-light p-3 rounded small animate-wiggle" style={{ animation: 'wiggle 5s ease-in-out infinite' }}>
        <p className="mb-1 fw-bold">
          <FaInfoCircle className="me-2 text-secondary" />
          Usuarios de prueba:
        </p>
        <ul className="list-unstyled">
          <li className="d-flex align-items-center justify-content-between">
            <span><FaUserGraduate className="me-2 text-primary" /><strong>juan@example.com</strong></span>
            <button className="btn btn-sm btn-outline-primary" onClick={() => usarDemo('juan@example.com')}>Usar</button>
          </li>
          <li className="d-flex align-items-center justify-content-between">
            <span><FaUserGraduate className="me-2 text-primary" /><strong>ana@example.com</strong></span>
            <button className="btn btn-sm btn-outline-primary" onClick={() => usarDemo('ana@example.com')}>Usar</button>
          </li>
          <li className="d-flex align-items-center justify-content-between">
            <span><FaChalkboardTeacher className="me-2 text-dark" /><strong>carlos@example.com</strong></span>
            <button className="btn btn-sm btn-outline-primary" onClick={() => usarDemo('carlos@example.com')}>Usar</button>
          </li>
        </ul>
        <p className="mt-3"><FaInfoCircle className="me-2 text-muted" />Contraseñas: <code>hash123</code>, <code>hash456</code>, <code>hash789</code> (simuladas)</p>
      </div>

      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}
