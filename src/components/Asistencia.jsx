import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEnvelope, FaCheckCircle, FaStar, FaQrcode } from 'react-icons/fa';
import QrScanner from 'react-qr-scanner';

export default function Asistencia({ usuario }) {
  const [talleres, setTalleres] = useState([]);
  const [alumno, setAlumno] = useState('');
  const [mensaje, setMensaje] = useState(null);
  const [showStars, setShowStars] = useState(false);
  const [mostrarQR, setMostrarQR] = useState(false);

  const demoUsuarios = [
    'juan@example.com',
    'ana@example.com',
    'carlos@example.com'
  ];

  useEffect(() => {
    fetch('http://localhost:4007/api/talleres')
      .then(r => r.json())
      .then(setTalleres);
  }, []);

  const registrar = async (id_taller) => {
    const res = await fetch(`http://localhost:4007/api/usuarios?email=${alumno}`);
    const data = await res.json();
    if (data.length === 0) return alert('Alumno no encontrado');
    await fetch('http://localhost:4007/api/asistencias', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_usuario: data[0].id_usuario,
        id_taller,
        metodo: mostrarQR ? 'QR' : 'MANUAL'
      })
    });
    setMensaje('Asistencia registrada con éxito');
    setShowStars(true);
    setTimeout(() => {
      setMensaje(null);
      setShowStars(false);
    }, 3000);
  };

  const handleScan = (data) => {
    if (data) {
      const parsed = data.text || data;
      setAlumno(parsed);
      alert(`QR leído: ${parsed}`);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className="container mt-4 position-relative">
      {showStars && (
        <div className="global-stars position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center pointer-events-none">
          <FaStar className="star-icon-global" />
          <FaStar className="star-icon-global delay-1" />
          <FaStar className="star-icon-global delay-2" />
        </div>
      )}

      <h2 className="text-center text-primary mb-4">Control de Asistencia</h2>

      <div className="mb-3">
        <label htmlFor="correo" className="form-label">
          <FaEnvelope className="me-2 text-secondary" />Correo del estudiante
        </label>
        <input
          type="email"
          id="correo"
          className="form-control"
          placeholder="ejemplo@upeu.edu.pe"
          value={alumno}
          onChange={(e) => setAlumno(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <button className="btn btn-outline-dark w-100" onClick={() => setMostrarQR(!mostrarQR)}>
          <FaQrcode className="me-2" />{mostrarQR ? 'Cerrar lector QR' : 'Escanear QR'}
        </button>
      </div>

      {mostrarQR && (
        <div className="mb-4">
          <QrScanner
            delay={300}
            style={{ width: '100%' }}
            onError={handleError}
            onScan={handleScan}
          />
        </div>
      )}

      <div className="bg-light p-3 rounded small mb-4">
        <p className="mb-2 fw-bold">Usuarios de prueba:</p>
        <div className="d-flex gap-2 flex-wrap">
          {demoUsuarios.map(correo => (
            <button
              key={correo}
              className="btn btn-outline-primary btn-sm"
              onClick={() => setAlumno(correo)}
            >
              Usar {correo}
            </button>
          ))}
        </div>
        <p className="mt-2 mb-0 text-muted"><em>Este formulario es un demo funcional</em></p>
      </div>

      {mensaje && (
        <div className="alert alert-success text-center position-relative" role="alert">
          <span>{mensaje}</span>
        </div>
      )}

      <div className="row gy-3">
        {talleres.map(t => (
          <div className="col-md-6" key={t.id_taller}>
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title text-primary">{t.nombre_taller}</h5>
                <button
                  className="btn btn-outline-success mt-3"
                  onClick={() => registrar(t.id_taller)}
                >
                  <FaCheckCircle className="me-2" />Registrar Asistencia
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .global-stars {
          z-index: 1050;
          animation: fadein 0.5s ease-out;
        }

        .star-icon-global {
          color: gold;
          font-size: 2.5rem;
          margin: 0 10px;
          animation: sparkle 1s ease-in-out;
        }

        .star-icon-global.delay-1 {
          animation-delay: 0.2s;
        }
        .star-icon-global.delay-2 {
          animation-delay: 0.4s;
        }

        @keyframes sparkle {
          0% { transform: scale(0.5) rotate(0deg); opacity: 0; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 1; }
          100% { transform: scale(1.5) rotate(360deg); opacity: 0; }
        }

        @keyframes fadein {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}