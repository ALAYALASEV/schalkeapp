import React, { useEffect, useState } from "react";

function CartaJugador({ jugador, style }) {
  const cartaStyle = {
    position: "absolute",
    width: "70px",
    height: "100px",
    backgroundColor: "#1c1c1c",
    color: "#fff",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "3px",
    boxShadow: "0 0 10px rgba(0,0,0,0.7)",
    fontFamily: "'Cinzel', serif",
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
    marginTop: "3px",
    textAlign: "center",
    fontSize: "10px",
  };

  const imagenStyle = {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
    marginTop: "10px",
  };

  return (
    <div style={cartaStyle}>
      <div style={puntuacionStyle}>{jugador.puntos}</div>
      <img src={jugador.imagen} alt={jugador.nombre} style={imagenStyle} />
      <div style={nombreStyle}>{jugador.nombre}</div>
    </div>
  );
}

function App() {
  const [jugadores, setJugadores] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    fetch("http://localhost:4000/jugadores")
      .then((res) => res.json())
      .then((data) => setJugadores(data));

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
  };

  // 📌 Posiciones corregidas
  const posiciones = isMobile
    ? {
        // 📱 Vista móvil
        DC: { bottom: 75, left: 50 },
        LW: { bottom: 75, left: 25 },
        RW: { bottom: 75, left: 75 },
        MC: [
          { bottom: 55, left: 25 },
          { bottom: 55, left: 50 },
          { bottom: 55, left: 75 },
        ], // 3 medios en línea
        LI: { bottom: 28, left: 18 },
        DFC: [
          { bottom: 28, left: 40 },
          { bottom: 28, left: 60 },
        ],
        LD: { bottom: 28, left: 82 },
        POR: { bottom: 8, left: 50 },
      }
    : {
        // 🖥️ Vista escritorio
        DC: { bottom: 78, left: 50 },
        LW: { bottom: 72, left: 20 },
        RW: { bottom: 72, left: 80 },
        MC: { bottom: 58, left: 35 },
        MCO: { bottom: 58, left: 65 },
        MCD: { bottom: 48, left: 50 },
        LI: { bottom: 28, left: 18 },
        DFC: [
          { bottom: 28, left: 38 },
          { bottom: 28, left: 62 },
        ],
        LD: { bottom: 28, left: 82 },
        POR: { bottom: 10, left: 50 },
      };

  // 📌 Adaptamos las posiciones de mediocentros en mobile
  const getJugadoresPorPosicion = (pos) => {
    if (isMobile && pos === "MC") {
      return jugadores.filter(
        (j) => j.posicion === "MC" || j.posicion === "MCO" || j.posicion === "MCD"
      );
    }
    return jugadores.filter((j) => j.posicion === pos);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#2c3e50" }}>
        Mi Fantasy League ⚽
      </h1>
      <div style={campoStyle}>
        {Object.entries(posiciones).map(([pos, coords]) => {
          const jugadoresPos = getJugadoresPorPosicion(pos);

          if (Array.isArray(coords)) {
            return jugadoresPos.map((jugador, i) => (
              <CartaJugador
                key={jugador.id}
                jugador={jugador}
                style={{
                  bottom: `${coords[i].bottom}%`,
                  left: `${coords[i].left}%`,
                  transform: "translateX(-50%)",
                }}
              />
            ));
          } else {
            return jugadoresPos.map((jugador) => (
              <CartaJugador
                key={jugador.id}
                jugador={jugador}
                style={{
                  bottom: `${coords.bottom}%`,
                  left: `${coords.left}%`,
                  transform: "translateX(-50%)",
                }}
              />
            ));
          }
        })}
      </div>
    </div>
  );
}

export default App;
