import React, { useState } from "react";
import GuestFields from "./GuestFields";

const initialGuest = {
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",
  tipoDocumento: "",
  numeroDocumento: "",
  fechaNacimiento: ""
};

const inmuebles = [
  { value: "casa1", label: "Casa 1" },
  { value: "casa2", label: "Casa 2" },
  { value: "apartamento1", label: "Apartamento 1" }
];

const maxGuests = 6;

export default function UserForm({ onSubmit }) {
  const [form, setForm] = useState({
    inmueble: "",
    fechaLlegada: "",
    fechaSalida: "",
    cantidadHuespedes: 1,
    huespedes: [ { ...initialGuest } ],
    observaciones: ""
  });
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuestChange = (idx, field, value) => {
    setForm((prev) => {
      const huespedes = prev.huespedes.map((h, i) =>
        i === idx ? { ...h, [field]: value } : h
      );
      return { ...prev, huespedes };
    });
  };

  const handleCantidadHuespedes = (e) => {
    const cantidad = parseInt(e.target.value, 10);
    setForm((prev) => {
      let huespedes = [...prev.huespedes];
      if (cantidad > huespedes.length) {
        for (let i = huespedes.length; i < cantidad; i++) {
          huespedes.push({ ...initialGuest });
        }
      } else {
        huespedes = huespedes.slice(0, cantidad);
      }
      return { ...prev, cantidadHuespedes: cantidad, huespedes };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setError("");
    try {
      await onSubmit(form);
    } catch (err) {
      setError("Error al enviar la reserva. Intenta nuevamente.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>Reserva tu Inmueble</h2>
      <label>
        Inmueble:
        <select name="inmueble" value={form.inmueble} onChange={handleChange} required>
          <option value="">Selecciona un inmueble</option>
          {inmuebles.map((i) => (
            <option key={i.value} value={i.value}>{i.label}</option>
          ))}
        </select>
      </label>
      <label>
        Fecha de llegada:
        <input type="date" name="fechaLlegada" value={form.fechaLlegada} onChange={handleChange} required />
      </label>
      <label>
        Fecha de salida:
        <input type="date" name="fechaSalida" value={form.fechaSalida} onChange={handleChange} required />
      </label>
      <label>
        Cantidad de huéspedes:
        <select name="cantidadHuespedes" value={form.cantidadHuespedes} onChange={handleCantidadHuespedes} required>
          {[...Array(maxGuests)].map((_, i) => (
            <option key={i+1} value={i+1}>{i+1}</option>
          ))}
        </select>
      </label>
      <hr />
      {form.huespedes.map((huesped, idx) => (
        <GuestFields
          key={idx}
          index={idx}
          data={huesped}
          onChange={handleGuestChange}
          principal={idx === 0}
        />
      ))}
      <label>
        Observaciones:
        <textarea name="observaciones" value={form.observaciones} onChange={handleChange} />
      </label>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button type="submit" disabled={enviando}>{enviando ? "Enviando..." : "Enviar reserva"}</button>
    </form>
  );
}
