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
    justifyContent: "center", // ⬅️ centramos el bloque entero
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
    margin: "5px 0", // ⬅️ espacio arriba/abajo
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

function App() {
  const [jugadores, setJugadores] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/jugadores")
      .then((res) => res.json())
      .then((data) => setJugadores(data));

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔹 función para guardar plantilla
  const guardarPlantilla = () => {
    fetch("http://localhost:4000/plantilla", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jugadores }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message || "Plantilla guardada ✅");
      })
      .catch((err) => console.error("Error al guardar plantilla:", err));
  };

  const campoStyle = {
    width: "90vw",
    maxWidth: "600px",
    height: "80vh",
    maxHeight: "600px",
    margin: "0 auto",
    backgroundImage: "url('/imagenes/field.png')",
    backgroundSize: "cover",
    backgroundPosition: "bottom",
    position: "relative",
    borderRadius: "10px",
    overflow: "hidden",
  };

  const posiciones = isMobile
    ? {
        DC: { bottom: 75, left: 50 },
        LW: { bottom: 70, left: 15 },
        RW: { bottom: 70, left: 85 },
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
      };

  const getJugadoresPorPosicion = (pos) => {
    const equivalencias = {
      MI: ["MI"],
      MD: ["MD"],
      MCD: ["MCD"],
      DC: ["DC"],
      LW: ["LW"],
      RW: ["RW"],
      LI: ["LI"],
      LD: ["LD"],
      DFC: ["DFC"],
      POR: ["POR"],
    };
    const posicionesValidas = equivalencias[pos] || [pos];
    return jugadores.filter((j) => posicionesValidas.includes(j.posicion) && j.titular);
  };

  const suplentes = jugadores.filter((j) => !j.titular);

  const getSuplentesPorPosicion = (pos) => {
    const equivalencias = {
      MI: ["MI"],
      MD: ["MD"],
      MCD: ["MCD"],
      DC: ["DC"],
      LW: ["LW"],
      RW: ["RW"],
      LI: ["LI"],
      LD: ["LD"],
      DFC: ["DFC"],
      POR: ["POR"],
    };
    const posicionesValidas = equivalencias[pos] || [pos];
    return suplentes.filter((s) => posicionesValidas.includes(s.posicion));
  };

  const handleSelectTitular = (jugador) => {
    setJugadorSeleccionado(jugador);
  };

  const handleSelectSuplente = (suplente) => {
    if (!jugadorSeleccionado) return;

    let nuevosJugadores;
    if (jugadorSeleccionado.id) {
      // Intercambio normal
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
      // Posición vacía → añadir suplente
      nuevosJugadores = jugadores.map((j) =>
        j.id === suplente.id
          ? { ...suplente, titular: true, posicion: jugadorSeleccionado.posicion }
          : j
      );
    }

    setJugadores(nuevosJugadores);
    setJugadorSeleccionado(null);
  };

  const cartasTitulares = Object.entries(posiciones).flatMap(([pos, coords]) => {
    const jugadoresPos = getJugadoresPorPosicion(pos);

    if (Array.isArray(coords)) {
      return coords.map((coord, i) => {
        const jugador = jugadoresPos[i];
        if (jugador) {
          return (
            <CartaJugador
              key={jugador.id}
              jugador={jugador}
              isMobile={isMobile}
              onClick={() => handleSelectTitular(jugador)}
              seleccionado={jugadorSeleccionado?.id === jugador.id}
              style={{
                bottom: `${coord.bottom}%`,
                left: `${coord.left}%`,
                transform: "translateX(-50%)",
              }}
            />
          );
        } else {
          return (
            <CartaVacia
              key={`${pos}-${i}`}
              isMobile={isMobile}
              onClick={() => setJugadorSeleccionado({ posicion: pos })}
              style={{
                bottom: `${coord.bottom}%`,
                left: `${coord.left}%`,
                transform: "translateX(-50%)",
              }}
            />
          );
        }
      });
    }

    const jugador = jugadoresPos[0];
    if (jugador) {
      return (
        <CartaJugador
          key={jugador.id}
          jugador={jugador}
          isMobile={isMobile}
          onClick={() => handleSelectTitular(jugador)}
          seleccionado={jugadorSeleccionado?.id === jugador.id}
          style={{
            bottom: `${coords.bottom}%`,
            left: `${coords.left}%`,
            transform: "translateX(-50%)",
          }}
        />
      );
    } else {
      return (
        <CartaVacia
          key={pos}
          isMobile={isMobile}
          onClick={() => setJugadorSeleccionado({ posicion: pos })}
          style={{
            bottom: `${coords.bottom}%`,
            left: `${coords.left}%`,
            transform: "translateX(-50%)",
          }}
        />
      );
    }
  });

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1
      style={{
        textAlign: "center",
        color: "#2c3e50",
        margin: "5px 0 10px 0", // ⬅️ menos espacio arriba
        fontSize: "26px",
      }}
      >
        Schalke fantasy ⚽
      </h1>
      <div style={campoStyle}>{cartasTitulares}</div>

      {/* 🔹 Botón guardar */}
      <div style={{ textAlign: "center", marginTop: "15px" }}>
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

export default App;
