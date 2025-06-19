import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Inscripcion({ usuario }) {
  const [eventos, setEventos] = useState([]);
  const [paquetes, setPaquetes] = useState([]);
  const [seleccion, setSeleccion] = useState({ evento: null, paquete: null });
  const [datos, setDatos] = useState({
    nombres: usuario.nombres || '',
    apellidos: usuario.apellidos || '',
    direccion: '',
    correo: usuario.email || ''
  });

  useEffect(() => {
    fetch('http://localhost:4007/api/eventos').then(r => r.json()).then(setEventos);
  }, []);

  const handleEvento = async (id) => {
    setSeleccion(prev => ({ ...prev, evento: id }));
    const res = await fetch(`http://localhost:4007/api/paquetes?evento=${id}`);
    const data = await res.json();
    setPaquetes(data);
  };

  const handleInscripcion = async () => {
    await fetch('http://localhost:4007/api/inscripciones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_usuario: usuario.id_usuario,
        id_evento: seleccion.evento,
        id_paquete: seleccion.paquete,
        ...datos
      })
    });
    alert('Inscripción completada');
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center text-primary">Formulario de Inscripción</h2>

      <div className="mb-3">
        <label className="form-label">Nombres</label>
        <input type="text" className="form-control" value={datos.nombres} onChange={(e) => setDatos({ ...datos, nombres: e.target.value })} />
      </div>

      <div className="mb-3">
        <label className="form-label">Apellidos</label>
        <input type="text" className="form-control" value={datos.apellidos} onChange={(e) => setDatos({ ...datos, apellidos: e.target.value })} />
      </div>

      <div className="mb-3">
        <label className="form-label">Dirección</label>
        <input type="text" className="form-control" value={datos.direccion} onChange={(e) => setDatos({ ...datos, direccion: e.target.value })} />
      </div>

      <div className="mb-3">
        <label className="form-label">Correo</label>
        <input type="email" className="form-control" value={datos.correo} onChange={(e) => setDatos({ ...datos, correo: e.target.value })} />
      </div>

      <div className="mb-3">
        <label className="form-label">Evento</label>
        <select className="form-select" onChange={(e) => handleEvento(e.target.value)}>
          <option>Seleccione evento</option>
          {eventos.map(ev => <option key={ev.id_evento} value={ev.id_evento}>{ev.nombre_evento}</option>)}
        </select>
      </div>

      {paquetes.length > 0 && (
        <div className="mb-4">
          <label className="form-label">Seleccione Paquete</label>
          <div className="d-flex flex-row flex-nowrap overflow-auto gap-3 py-2">
            {paquetes.map(p => (
              <div
                className={`card text-center p-3 ${seleccion.paquete === p.id_paquete ? 'border-primary border-3 shadow' : ''}`}
                key={p.id_paquete}
                style={{ minWidth: '250px' }}>
                <h5 className="card-title text-primary">{p.nombre_paquete} {seleccion.paquete === p.id_paquete && <span className='badge bg-primary ms-2'>Seleccionado</span>}</h5>
                <p className="card-text">Precio: S/. {p.precio}</p>
                <button className="btn btn-outline-primary mt-2" onClick={() => setSeleccion(prev => ({ ...prev, paquete: p.id_paquete }))}>Seleccionar</button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="d-grid">
        <button className="btn btn-success" onClick={handleInscripcion}>Confirmar Inscripción</button>
      </div>
    </div>
  );
}
