/* ============================================
   Mundial 2026 — Lógica de la página
   Datos de las 48 selecciones clasificadas
============================================ */

// Lista completa de las 48 selecciones clasificadas, por confederación
const equipos = [
  // CONMEBOL — Sudamérica (6)
  { nombre: "Argentina",            bandera: "🇦🇷", conf: "CONMEBOL" },
  { nombre: "Brasil",               bandera: "🇧🇷", conf: "CONMEBOL" },
  { nombre: "Colombia",             bandera: "🇨🇴", conf: "CONMEBOL" },
  { nombre: "Ecuador",              bandera: "🇪🇨", conf: "CONMEBOL" },
  { nombre: "Paraguay",             bandera: "🇵🇾", conf: "CONMEBOL" },
  { nombre: "Uruguay",              bandera: "🇺🇾", conf: "CONMEBOL" },

  // UEFA — Europa (16)
  { nombre: "Alemania",             bandera: "🇩🇪", conf: "UEFA" },
  { nombre: "Austria",              bandera: "🇦🇹", conf: "UEFA" },
  { nombre: "Bélgica",              bandera: "🇧🇪", conf: "UEFA" },
  { nombre: "Bosnia y Herzegovina", bandera: "🇧🇦", conf: "UEFA" },
  { nombre: "Croacia",              bandera: "🇭🇷", conf: "UEFA" },
  { nombre: "España",               bandera: "🇪🇸", conf: "UEFA" },
  { nombre: "Escocia",              bandera: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", conf: "UEFA" },
  { nombre: "Francia",              bandera: "🇫🇷", conf: "UEFA" },
  { nombre: "Inglaterra",           bandera: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", conf: "UEFA" },
  { nombre: "Noruega",              bandera: "🇳🇴", conf: "UEFA" },
  { nombre: "Países Bajos",         bandera: "🇳🇱", conf: "UEFA" },
  { nombre: "Portugal",             bandera: "🇵🇹", conf: "UEFA" },
  { nombre: "República Checa",      bandera: "🇨🇿", conf: "UEFA" },
  { nombre: "Suecia",               bandera: "🇸🇪", conf: "UEFA" },
  { nombre: "Suiza",                bandera: "🇨🇭", conf: "UEFA" },
  { nombre: "Turquía",              bandera: "🇹🇷", conf: "UEFA" },

  // CAF — África (10)
  { nombre: "Argelia",              bandera: "🇩🇿", conf: "CAF" },
  { nombre: "Cabo Verde",           bandera: "🇨🇻", conf: "CAF" },
  { nombre: "Costa de Marfil",      bandera: "🇨🇮", conf: "CAF" },
  { nombre: "Egipto",               bandera: "🇪🇬", conf: "CAF" },
  { nombre: "Ghana",                bandera: "🇬🇭", conf: "CAF" },
  { nombre: "Marruecos",            bandera: "🇲🇦", conf: "CAF" },
  { nombre: "RD del Congo",         bandera: "🇨🇩", conf: "CAF" },
  { nombre: "Senegal",              bandera: "🇸🇳", conf: "CAF" },
  { nombre: "Sudáfrica",            bandera: "🇿🇦", conf: "CAF" },
  { nombre: "Túnez",                bandera: "🇹🇳", conf: "CAF" },

  // AFC — Asia (9)
  { nombre: "Arabia Saudita",       bandera: "🇸🇦", conf: "AFC" },
  { nombre: "Australia",            bandera: "🇦🇺", conf: "AFC" },
  { nombre: "Catar",                bandera: "🇶🇦", conf: "AFC" },
  { nombre: "Corea del Sur",        bandera: "🇰🇷", conf: "AFC" },
  { nombre: "Irak",                 bandera: "🇮🇶", conf: "AFC" },
  { nombre: "Irán",                 bandera: "🇮🇷", conf: "AFC" },
  { nombre: "Japón",                bandera: "🇯🇵", conf: "AFC" },
  { nombre: "Jordania",             bandera: "🇯🇴", conf: "AFC" },
  { nombre: "Uzbekistán",           bandera: "🇺🇿", conf: "AFC" },

  // CONCACAF — Norte, Centroamérica y Caribe (6)
  { nombre: "Canadá",               bandera: "🇨🇦", conf: "CONCACAF" },
  { nombre: "Curazao",              bandera: "🇨🇼", conf: "CONCACAF" },
  { nombre: "Estados Unidos",       bandera: "🇺🇸", conf: "CONCACAF" },
  { nombre: "Haití",                bandera: "🇭🇹", conf: "CONCACAF" },
  { nombre: "México",               bandera: "🇲🇽", conf: "CONCACAF" },
  { nombre: "Panamá",               bandera: "🇵🇦", conf: "CONCACAF" },

  // OFC — Oceanía (1)
  { nombre: "Nueva Zelanda",        bandera: "🇳🇿", conf: "OFC" },
];

// Colores de acento por confederación (coinciden con styles.css)
const colores = {
  CONMEBOL: "#f5c542",
  UEFA:     "#38bdf8",
  CAF:      "#1fa85c",
  AFC:      "#ff5a5f",
  CONCACAF: "#c084fc",
  OFC:      "#fb923c",
};

// Estado actual de los filtros
let confActiva = "TODOS";
let textoBusqueda = "";

// Referencias al DOM
const grid       = document.getElementById("grid");
const filtros    = document.getElementById("filtros");
const buscador   = document.getElementById("buscador");
const contador   = document.getElementById("contador");
const mensajeVacio = document.getElementById("vacio");

// Quita acentos para que la búsqueda sea más flexible (ej: "mexico" = "México")
function normalizar(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Construye los botones de filtro a partir de las confederaciones existentes
function crearFiltros() {
  const confs = ["TODOS", ...Object.keys(colores)];
  confs.forEach((conf) => {
    const btn = document.createElement("button");
    btn.className = "filter-btn" + (conf === "TODOS" ? " active" : "");
    btn.textContent = conf === "TODOS" ? "Todos" : conf;
    btn.addEventListener("click", () => {
      confActiva = conf;
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      render();
    });
    filtros.appendChild(btn);
  });
}

// Dibuja las tarjetas según los filtros activos
function render() {
  const lista = equipos.filter((e) => {
    const coincideConf = confActiva === "TODOS" || e.conf === confActiva;
    const coincideTexto = normalizar(e.nombre).includes(normalizar(textoBusqueda));
    return coincideConf && coincideTexto;
  });

  grid.innerHTML = "";

  lista.forEach((e, i) => {
    const card = document.createElement("article");
    card.className = "team-card";
    card.style.setProperty("--accent", colores[e.conf]);
    card.style.animationDelay = `${i * 0.03}s`;
    card.innerHTML = `
      <span class="team-flag">${e.bandera}</span>
      <h3 class="team-name">${e.nombre}</h3>
      <span class="team-conf">${e.conf}</span>
    `;
    grid.appendChild(card);
  });

  contador.textContent = lista.length;
  mensajeVacio.hidden = lista.length !== 0;
}

// Escucha la barra de búsqueda
buscador.addEventListener("input", (ev) => {
  textoBusqueda = ev.target.value;
  render();
});

// Arranque
crearFiltros();
render();
