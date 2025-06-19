import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ListaEventos({ onInscribirse }) {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4007/api/eventos')
      .then(r => r.json())
      .then(setEventos);
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary mb-4">Eventos Tecnológicos</h2>
      <div className="row gy-3">
        {eventos.map(evento => (
          <div className="col-12" key={evento.id_evento}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-primary">{evento.nombre_evento}</h5>
                <p className="card-text">{evento.descripcion}</p>
                <button
                  className="btn btn-outline-primary w-100"
                  onClick={() => onInscribirse(evento)}
                >
                  Inscribirse
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
