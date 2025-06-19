import React, { useState } from 'react';
import Login from './components/Login';
import Inscripcion from './components/Inscripcion';
import Asistencia from './components/Asistencia';
import ListaEventos from './components/ListaEventos';
import './App.css';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

  return (
    <div className="App" style={{
      background: 'linear-gradient(135deg, #4f46e5, #9333ea)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      <div className="iphone-frame">
        <div style={{
          padding: '24px',
          textAlign: 'center',
          backgroundColor: '#f3f0ff',
          height: '100%'
        }}>
          <h1 style={{
            color: '#4f46e5',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            marginBottom: '20px'
          }}>
            Sistema de Control de Asistencia - UPeU
          </h1>

          {!usuario ? (
            <Login setUsuario={setUsuario} />
          ) : usuario.rol === 'estudiante' ? (
            !eventoSeleccionado ? (
              <ListaEventos onInscribirse={setEventoSeleccionado} />
            ) : (
              <Inscripcion usuario={usuario} evento={eventoSeleccionado} />
            )
          ) : (
            <Asistencia usuario={usuario} />
          )}
        </div>
      </div>

      <style>{`
        .iphone-frame {
          max-width: 390px;
          width: 100%;
          height: 844px;
          background: white;
          border: 16px solid #333;
          border-radius: 40px;
          box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
          overflow-y: auto;
          position: relative;
        }
      `}</style>
    </div>
  );
}

export default App;