import React, { useEffect, useState } from "react";

function CartaJugador({ jugador, style, isMobile, onClick, seleccionado, enModal }) {
  const cartaStyle = {
    position: enModal ? "relative" : "absolute",
    width: isMobile ? "55px" : "70px",
    height: isMobile ? "80px" : "100px",
    backgroundColor: seleccionado ? "#f39c12" : "#1c1c1c",
    color: "#fff",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "3px",
    boxShadow: "0 0 10px rgba(0,0,0,0.7)",
    fontFamily: "'Cinzel', serif",
    cursor: onClick ? "pointer" : "default",
    ...style,
  };

  const puntuacionStyle = {
    position: "absolute",
    top: "3px",
    left: "3px",
    backgroundColor: "#e74c3c",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "11px",
  };

  const nombreStyle = {
    marginTop: "5px",
    textAlign: "center",
    fontSize: "10px",
  };

  const imagenStyle = {
    width: isMobile ? "40px" : "50px",
    height: isMobile ? "40px" : "50px",
    borderRadius: "50%",
    objectFit: "cover",
    margin: "5px 0",
  };

  return (
    <div style={cartaStyle} onClick={onClick}>
      <div style={puntuacionStyle}>{jugador.puntos}</div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <img src={jugador.imagen} alt={jugador.nombre} style={imagenStyle} />
        <div style={nombreStyle}>{jugador.nombre}</div>
      </div>
    </div>
  );
}

function CartaVacia({ style, onClick, isMobile }) {
  const cartaStyle = {
    position: "absolute",
    width: isMobile ? "55px" : "70px",
    height: isMobile ? "80px" : "100px",
    backgroundColor: "#7f8c8d",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "14px",
    fontStyle: "italic",
    cursor: "pointer",
    boxShadow: "0 0 8px rgba(0,0,0,0.5)",
    ...style,
  };

  return <div style={cartaStyle} onClick={onClick}>+</div>;
}

function ModalSuplentes({ suplentes, onSelect, onClose, isMobile }) {
  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  const modalStyle = {
    backgroundColor: "#ecf0f1",
    borderRadius: "10px",
    padding: "20px",
    maxWidth: isMobile ? "90vw" : "600px",
    maxHeight: isMobile ? "70vh" : "500px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const gridStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center",
    width: "100%",
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div style={overlayStyle} onClick={handleOverlayClick}>
      <div style={modalStyle}>
        <h3 style={{ textAlign: "center", color: "#2c3e50" }}>Elige un suplente</h3>
        <div style={gridStyle}>
          {suplentes.map((s) => (
            <CartaJugador
              key={s.id}
              jugador={s}
              isMobile={isMobile}
              enModal={true}
              onClick={() => onSelect(s)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [jugadores, setJugadores] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null);
  const [formacion, setFormacion] = useState("4-3-3");

  useEffect(() => {
    fetch("http://localhost:4000/jugadores")
      .then((res) => res.json())
      .then((data) => {
        // si tu endpoint devuelve { jugadores, formacion } lo adaptas aquí
        if (data.jugadores) {
          setJugadores(data.jugadores);
          setFormacion(data.formacion || "4-3-3");
        } else {
          // si solo devuelve array de jugadores:
          setJugadores(data);
        }
      })
      .catch((e) => console.error("fetch jugadores:", e));

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // guardado de plantilla (tu endpoint PUT /plantilla)
  const guardarPlantilla = () => {
    fetch("http://localhost:4000/plantilla", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jugadores }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message || "Plantilla guardada ✅"))
      .catch((err) => console.error("Error al guardar plantilla:", err));
  };

  // --- definimos formaciones correctamente (cada formación tiene 11 slots) ---
  // Las keys son códigos que usamos también para comparar con jugador.posicion
const formaciones = {
  // ✅ Mantenemos tu 4-3-3 tal cual estaba funcionando
  "4-3-3": isMobile
    ? {
        DC: { bottom: 75, left: 50 },
        LW: { bottom: 70, left: 20 },
        RW: { bottom: 70, left: 80 },
        MI: { bottom: 50, left: 25 },
        MCD: { bottom: 42, left: 50 },
        MD: { bottom: 50, left: 75 },
        LI: { bottom: 30, left: 18 },
        DFC: [
          { bottom: 23, left: 40 },
          { bottom: 23, left: 62 },
        ],
        LD: { bottom: 30, left: 84 },
        POR: { bottom: 4, left: 50 },
      }
    : {
        DC: { bottom: 78, left: 50 },
        LW: { bottom: 72, left: 20 },
        RW: { bottom: 72, left: 80 },
        MI: { bottom: 58, left: 35 },
        MCD: { bottom: 48, left: 50 },
        MD: { bottom: 58, left: 65 },
        LI: { bottom: 32, left: 18 },
        DFC: [
          { bottom: 28, left: 38 },
          { bottom: 28, left: 62 },
        ],
        LD: { bottom: 32, left: 82 },
        POR: { bottom: 8, left: 50 },
      },

  // 🔹 Nuevo: 4-4-2
  "4-4-2": isMobile
  ? {
      DC: [
        { bottom: 80, left: 35 },
        { bottom: 80, left: 65 },
      ],
      MI: { bottom: 52, left: 22 },
      MCO: { bottom: 60, left: 50 },
      MCD: { bottom: 42, left: 50 },
      MD: { bottom: 52, left: 78 },
      LI: { bottom: 30, left: 18 },
      DFC: [
        { bottom: 23, left: 40 },
        { bottom: 23, left: 60 },
      ],
      LD: { bottom: 30, left: 82 },
      POR: { bottom: 4, left: 50 },
    }
  : {
      DC: [
        { bottom: 80, left: 40 },
        { bottom: 80, left: 60 },
      ],
      MI: { bottom: 52, left: 25 },
      MCO: { bottom: 62, left: 50 },
      MCD: { bottom: 42, left: 50 },
      MD: { bottom: 52, left: 75 },
      LI: { bottom: 30, left: 18 },
      DFC: [
        { bottom: 25, left: 38 },
        { bottom: 25, left: 62 },
      ],
      LD: { bottom: 30, left: 82 },
      POR: { bottom: 8, left: 50 },
    },

  // 🔹 Nuevo: 3-5-2
  "3-5-2": isMobile
    ? {
        DC: [
          { bottom: 75, left: 40 },
          { bottom: 75, left: 60 },
        ],
        MI: { bottom: 48, left: 25 },
        MCD: { bottom: 42, left: 50 },
        MD: { bottom: 48, left: 75 },
        LW: { bottom: 68, left: 16 },
        RW: { bottom: 68, left: 83 },
        DFC: [
          { bottom: 23, left: 22 },
          { bottom: 23, left: 50 },
          { bottom: 23, left: 77 },
        ],
        POR: { bottom: 4, left: 50 },
      }
    : {
        DC: [
          { bottom: 75, left: 40 },
          { bottom: 75, left: 60 },
        ],
        MI: { bottom: 55, left: 30 },
        MCD: { bottom: 50, left: 50 },
        MD: { bottom: 55, left: 70 },
        LW: { bottom: 68, left: 15 },
        RW: { bottom: 68, left: 85 },
        DFC: [
          { bottom: 28, left: 32 },
          { bottom: 28, left: 50 },
          { bottom: 28, left: 69 },
        ],
        POR: { bottom: 8, left: 50 },
      },

  // 🔹 Nuevo: 5-3-2
  "5-3-2": isMobile
    ? {
        DC: [
          { bottom: 73, left: 38 },
          { bottom: 73, left: 62 },
        ],
        MI: { bottom: 53, left: 25 },
        MCD: { bottom: 43, left: 50 },
        MD: { bottom: 53, left: 75 },
        LI: { bottom: 30, left: 10 },
        LD: { bottom: 30, left: 90 },
        DFC: [
          { bottom: 23, left: 29 },
          { bottom: 23, left: 50 },
          { bottom: 23, left: 71 },
        ],
        POR: { bottom: 4, left: 50 },
      }
    : {
        DC: [
          { bottom: 78, left: 38 },
          { bottom: 78, left: 62 },
        ],
        MI: { bottom: 55, left: 32 },
        MCD: { bottom: 48, left: 50 },
        MD: { bottom: 55, left: 68 },
        LI: { bottom: 35, left: 15 },
        LD: { bottom: 35, left: 85 },
        DFC: [
          { bottom: 28, left: 32 },
          { bottom: 28, left: 50 },
          { bottom: 28, left: 68 },
        ],
        POR: { bottom: 8, left: 50 },
      },
};

  // posiciones seleccionadas (ya adaptadas a mobile o normal)
  const posiciones = formaciones[formacion] || formaciones["4-3-3"];

  // mapping de qué posiciones del jugador son válidas para un slot
  const allowedPositions = {
    POR: ["POR"],
    DFC: ["DFC"],       // central defenders
    LI: ["LI"],
    LD: ["LD"],
    LW: ["LW"],
    RW: ["RW"],
    DC: ["DC"],         // strikers
    MCD: ["MCD", "MC", "MCO"],
    MC: ["MC", "MCO", "MCD"],
    MCO: ["MCO", "MC", "MCD"],
    MI: ["MI", "MC"],
    MD: ["MD", "MC"],
  };

  // lista de suplentes
  const suplentes = jugadores.filter((j) => !j.titular);

  // función para obtener suplentes válidos para una posición (usa allowedPositions)
  const getSuplentesPorPosicion = (pos) => {
    const valido = allowedPositions[pos] || [pos];
    return suplentes.filter((s) => valido.includes(s.posicion));
  };

  // Cuando el usuario selecciona un titular en campo
  const handleSelectTitular = (jugador) => {
    setJugadorSeleccionado(jugador);
  };

  // Intercambiar titular por suplente (o añadir si slot vacío)
  const handleSelectSuplente = (suplente) => {
    if (!jugadorSeleccionado) return;

    let nuevosJugadores;
    if (jugadorSeleccionado.id) {
      // intercambio normal
      nuevosJugadores = jugadores.map((j) => {
        if (j.id === jugadorSeleccionado.id) {
          return { ...suplente, titular: true, posicion: j.posicion };
        }
        if (j.id === suplente.id) {
          return { ...jugadorSeleccionado, titular: false };
        }
        return j;
      });
    } else {
      // slot vacío -> poner suplente en esa posición
      nuevosJugadores = jugadores.map((j) =>
        j.id === suplente.id
          ? { ...suplente, titular: true, posicion: jugadorSeleccionado.posicion }
          : j
      );
    }

    setJugadores(nuevosJugadores);
    setJugadorSeleccionado(null);
  };

  // --- Asignación determinista de jugadores a slots (sin duplicados) ---
  const cartasTitulares = (() => {
    const assigned = new Set();
    const result = [];

    // Convertimos posiciones (algunos valores pueden ser arrays)
    const entries = Object.entries(posiciones);

    for (const [pos, coords] of entries) {
      const coordsArray = Array.isArray(coords) ? coords : [coords];
      // Para el slot pos, buscamos jugadores titulares válidos (y no asignados todavía)
      const aceptables = allowedPositions[pos] || [pos];

      for (let i = 0; i < coordsArray.length; i++) {
        // buscamos el primer jugador titular que encaje y no esté asignado
        const jugadorIndex = jugadores.findIndex(
          (j) => j.titular && !assigned.has(j.id) && aceptables.includes(j.posicion)
        );

        const coord = coordsArray[i];
        if (jugadorIndex !== -1) {
          const jugador = jugadores[jugadorIndex];
          assigned.add(jugador.id);
          result.push(
            <CartaJugador
              key={jugador.id}
              jugador={jugador}
              isMobile={isMobile}
              onClick={() => handleSelectTitular(jugador)}
              seleccionado={jugadorSeleccionado?.id === jugador.id}
              style={{
                bottom: `${coord.bottom}%`,
                left: `${coord.left}%`,
                transform: isMobile ? "translate(-50%, 6%)" : "translateX(-50%)",
              }}
            />
          );
        } else {
          // hueco vacío
          result.push(
            <CartaVacia
              key={`${pos}-${i}`}
              isMobile={isMobile}
              onClick={() => setJugadorSeleccionado({ posicion: pos })}
              style={{
                bottom: `${coord.bottom}%`,
                left: `${coord.left}%`,
                transform: isMobile ? "translate(-50%, 6%)" : "translateX(-50%)",
              }}
            />
          );
        }
      }
    }

    return result;
  })();

  return (
    <div style={{ padding: "10px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#2c3e50", margin: "2px 0 8px 0", fontSize: "24px" }}>
        Schalke fantasy ⚽
      </h1>

      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <label>Formación: </label>
        <select value={formacion} onChange={(e) => {
          const nueva = e.target.value;
          setFormacion(nueva);
          // guardamos formacion en backend (opcional)
          fetch("http://localhost:4000/formacion", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ formacion: nueva }),
          }).catch(() => {});
        }}>
          {Object.keys(formaciones).map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>

      <div
        style={{
          width: "90vw",
          maxWidth: "700px",
          height: isMobile ? "75vh" : "80vh",
          maxHeight: "700px",
          margin: "0 auto",
          backgroundImage: "url('/imagenes/field.png')",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          position: "relative",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {cartasTitulares}
      </div>

      <div style={{ textAlign: "center", marginTop: "12px" }}>
        <button
          onClick={guardarPlantilla}
          style={{
            backgroundColor: "#27ae60",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            boxShadow: "0px 4px 8px rgba(0,0,0,0.3)",
          }}
        >
          💾 Guardar plantilla
        </button>
      </div>

      {jugadorSeleccionado && (
        <ModalSuplentes
          suplentes={getSuplentesPorPosicion(jugadorSeleccionado.posicion)}
          onSelect={handleSelectSuplente}
          onClose={() => setJugadorSeleccionado(null)}
          isMobile={isMobile}
        />
      )}
    </div>
  );
}