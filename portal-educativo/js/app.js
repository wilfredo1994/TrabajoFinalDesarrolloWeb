/* =====================================================================
   INSIGHT SCHOOL — app.js
   JavaScript Vanilla. Contiene TODA la lógica funcional del sitio:
   navbar activo, modo oscuro, scroll reveal, botón volver arriba,
   contador de visitas, buscador dinámico, formulario de contacto +
   localStorage, lightbox de galería, login y CRUD del panel admin.
   ===================================================================== */

/* ---------------------------------------------------------------------
   1. CLAVES DE LOCALSTORAGE (centralizadas)
   --------------------------------------------------------------------- */
const LS_KEYS = {
  VISITAS: 'is_contador_visitas',
  MODO_OSCURO: 'is_modo_oscuro',
  MENSAJES: 'is_mensajes_contacto',
  PROGRAMAS: 'is_programas',
  DOCENTES: 'is_docentes',
  SESION: 'is_sesion_admin'
};

/* ---------------------------------------------------------------------
   2. DATOS SEMILLA (se cargan una sola vez si localStorage está vacío)
   --------------------------------------------------------------------- */
const PROGRAMAS_SEMILLA = [
  { id: 1, nombre: 'Inicial 3 años', nivel: 'Inicial', duracion: '1 año académico', pension: 'S/ 420', img: 'https://picsum.photos/seed/insight-ini3/500/340', descripcion: 'Estimulación temprana, desarrollo psicomotriz y socialización a través del juego guiado.' },
  { id: 2, nombre: 'Inicial 4 años', nivel: 'Inicial', duracion: '1 año académico', pension: 'S/ 430', img: 'https://picsum.photos/seed/insight-ini4/500/340', descripcion: 'Fortalecimiento del lenguaje, pensamiento lógico y autonomía personal.' },
  { id: 3, nombre: 'Inicial 5 años', nivel: 'Inicial', duracion: '1 año académico', pension: 'S/ 440', img: 'https://picsum.photos/seed/insight-ini5/500/340', descripcion: 'Preparación integral para el ingreso a primaria, con énfasis en lectoescritura inicial.' },
  { id: 4, nombre: 'Primaria 1° y 2°', nivel: 'Primaria', duracion: '2 años académicos', pension: 'S/ 480', img: 'https://picsum.photos/seed/insight-prim12/500/340', descripcion: 'Consolidación de la lectoescritura, razonamiento matemático y hábitos de estudio.' },
  { id: 5, nombre: 'Primaria 3° y 4°', nivel: 'Primaria', duracion: '2 años académicos', pension: 'S/ 500', img: 'https://picsum.photos/seed/insight-prim34/500/340', descripcion: 'Desarrollo del pensamiento crítico, ciencia aplicada y proyectos de investigación.' },
  { id: 6, nombre: 'Primaria 5° y 6°', nivel: 'Primaria', duracion: '2 años académicos', pension: 'S/ 520', img: 'https://picsum.photos/seed/insight-prim56/500/340', descripcion: 'Preparación para la transición a secundaria, liderazgo estudiantil y proyecto de vida.' }
];

const DOCENTES_SEMILLA = [
  { id: 1, nombre: 'Mariela Quispe Soto', especialidad: 'Educación Inicial', experiencia: '9 años', foto: 'https://i.pravatar.cc/300?img=47', bio: 'Especialista en estimulación temprana y metodologías activas para los primeros años.' },
  { id: 2, nombre: 'Jorge Ramírez Vidal', especialidad: 'Matemática Primaria', experiencia: '11 años', foto: 'https://i.pravatar.cc/300?img=12', bio: 'Promueve el pensamiento lógico-matemático mediante el aprendizaje basado en problemas.' },
  { id: 3, nombre: 'Carla Fernández León', especialidad: 'Comunicación', experiencia: '7 años', foto: 'https://i.pravatar.cc/300?img=32', bio: 'Fomenta la lectura crítica y la expresión oral y escrita desde edades tempranas.' },
  { id: 4, nombre: 'Luis Torres Bravo', especialidad: 'Educación Física', experiencia: '8 años', foto: 'https://i.pravatar.cc/300?img=15', bio: 'Impulsa hábitos de vida saludable y trabajo en equipo a través del deporte.' },
  { id: 5, nombre: 'Daniela Castillo Mora', especialidad: 'Arte y Creatividad', experiencia: '6 años', foto: 'https://i.pravatar.cc/300?img=44', bio: 'Desarrolla la sensibilidad artística mediante talleres de pintura, música y teatro.' },
  { id: 6, nombre: 'Renzo Alvarado Díaz', especialidad: 'Ciencia y Tecnología', experiencia: '10 años', foto: 'https://i.pravatar.cc/300?img=51', bio: 'Introduce a los estudiantes en la robótica educativa y el método científico.' }
];

/* ---------------------------------------------------------------------
   3. INICIALIZACIÓN DE DATOS EN LOCALSTORAGE
   --------------------------------------------------------------------- */
function inicializarDatos() {
  if (!localStorage.getItem(LS_KEYS.PROGRAMAS)) {
    localStorage.setItem(LS_KEYS.PROGRAMAS, JSON.stringify(PROGRAMAS_SEMILLA));
  }
  if (!localStorage.getItem(LS_KEYS.DOCENTES)) {
    localStorage.setItem(LS_KEYS.DOCENTES, JSON.stringify(DOCENTES_SEMILLA));
  }
  if (!localStorage.getItem(LS_KEYS.MENSAJES)) {
    localStorage.setItem(LS_KEYS.MENSAJES, JSON.stringify([]));
  }
}
function getProgramas() { return JSON.parse(localStorage.getItem(LS_KEYS.PROGRAMAS) || '[]'); }
function setProgramas(data) { localStorage.setItem(LS_KEYS.PROGRAMAS, JSON.stringify(data)); }
function getDocentes() { return JSON.parse(localStorage.getItem(LS_KEYS.DOCENTES) || '[]'); }
function setDocentes(data) { localStorage.setItem(LS_KEYS.DOCENTES, JSON.stringify(data)); }
function getMensajes() { return JSON.parse(localStorage.getItem(LS_KEYS.MENSAJES) || '[]'); }
function setMensajes(data) { localStorage.setItem(LS_KEYS.MENSAJES, JSON.stringify(data)); }

/* ---------------------------------------------------------------------
   4. NAVBAR: resaltar enlace activo + colapsar en móvil al hacer click
   --------------------------------------------------------------------- */
function marcarEnlaceActivo() {
  const pagina = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === pagina) link.classList.add('active');
  });
}

function colapsarMenuMovil() {
  const navLinks = document.querySelectorAll('.navbar-collapse .nav-link');
  const collapseEl = document.querySelector('.navbar-collapse');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (collapseEl && collapseEl.classList.contains('show') && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(collapseEl).hide();
      }
    });
  });
}

/* ---------------------------------------------------------------------
   5. MODO OSCURO — classList.toggle()
   --------------------------------------------------------------------- */
function inicializarModoOscuro() {
  const activo = localStorage.getItem(LS_KEYS.MODO_OSCURO) === 'true';
  if (activo) document.body.classList.add('modo-oscuro');
  actualizarIconoModoOscuro();

  document.querySelectorAll('.btn-toggle-oscuro').forEach(btn => {
    btn.addEventListener('click', () => {
      document.body.classList.toggle('modo-oscuro');
      const estaActivo = document.body.classList.contains('modo-oscuro');
      localStorage.setItem(LS_KEYS.MODO_OSCURO, estaActivo);
      actualizarIconoModoOscuro();
    });
  });
}
function actualizarIconoModoOscuro() {
  const activo = document.body.classList.contains('modo-oscuro');
  document.querySelectorAll('.btn-toggle-oscuro i').forEach(icon => {
    icon.className = activo ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
  });
}

/* ---------------------------------------------------------------------
   6. SCROLL: revelar elementos + navbar con sombra + volver arriba
   --------------------------------------------------------------------- */
function inicializarScrollEffects() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15 });
  reveals.forEach(el => observer.observe(el));

  const btnArriba = document.querySelector('.btn-volver-arriba');
  window.addEventListener('scroll', () => {
    if (btnArriba) btnArriba.classList.toggle('show', window.scrollY > 420);
  });
  if (btnArriba) {
    btnArriba.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
}

/* ---------------------------------------------------------------------
   7. CONTADOR DE VISITAS
   --------------------------------------------------------------------- */
function actualizarContadorVisitas() {
  let total = parseInt(localStorage.getItem(LS_KEYS.VISITAS) || '0', 10);
  total += 1;
  localStorage.setItem(LS_KEYS.VISITAS, total);
  document.querySelectorAll('.contador-visitas').forEach(el => {
    el.textContent = total.toLocaleString('es-PE');
  });
}

/* ---------------------------------------------------------------------
   8. VALIDACIÓN DE FORMULARIO DE CONTACTO + GUARDADO EN LOCALSTORAGE
   --------------------------------------------------------------------- */
function inicializarFormularioContacto() {
  const form = document.getElementById('formContacto');
  if (!form) return;

  const alertaBox = document.getElementById('alertaContacto');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const nombre = document.getElementById('contactoNombre');
    const correo = document.getElementById('contactoCorreo');
    const telefono = document.getElementById('contactoTelefono');
    const asunto = document.getElementById('contactoAsunto');
    const mensaje = document.getElementById('contactoMensaje');

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexTelefono = /^[9]\d{8}$/; // celular peruano: 9 dígitos iniciando en 9

    let valido = true;

    [nombre, correo, telefono, asunto, mensaje].forEach(campo => campo.classList.remove('is-invalid'));

    if (nombre.value.trim().length < 3) { nombre.classList.add('is-invalid'); valido = false; }
    if (!regexCorreo.test(correo.value.trim())) { correo.classList.add('is-invalid'); valido = false; }
    if (!regexTelefono.test(telefono.value.trim())) { telefono.classList.add('is-invalid'); valido = false; }
    if (asunto.value.trim().length < 3) { asunto.classList.add('is-invalid'); valido = false; }
    if (mensaje.value.trim().length < 10) { mensaje.classList.add('is-invalid'); valido = false; }

    if (!valido) {
      mostrarAlerta(alertaBox, 'Por favor revisa los campos marcados en rojo.', 'danger');
      return;
    }

    const mensajes = getMensajes();
    mensajes.unshift({
      id: Date.now(),
      nombre: nombre.value.trim(),
      correo: correo.value.trim(),
      telefono: telefono.value.trim(),
      asunto: asunto.value.trim(),
      mensaje: mensaje.value.trim(),
      fecha: new Date().toLocaleString('es-PE')
    });
    setMensajes(mensajes);

    mostrarAlerta(alertaBox, '¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
    form.reset();
    form.classList.remove('was-validated');
  });
}

function mostrarAlerta(contenedor, texto, tipo) {
  if (!contenedor) return;
  contenedor.innerHTML = `
    <div class="alert alert-${tipo} alert-dismissible fade show shadow-sm" role="alert">
      ${texto}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>`;
  contenedor.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/* ---------------------------------------------------------------------
   9. RENDER DE PROGRAMAS (página cursos.html) + BUSCADOR DINÁMICO
   --------------------------------------------------------------------- */
function renderTarjetaPrograma(p) {
  return `
    <div class="col-md-6 col-lg-4 programa-item reveal" data-nombre="${p.nombre.toLowerCase()}" data-nivel="${p.nivel.toLowerCase()}">
      <div class="card-marca h-100">
        <img src="${p.img}" alt="${p.nombre}" class="w-100">
        <div class="p-4">
          <span class="badge-marca rounded-pill px-3 py-2 mb-2 d-inline-block">${p.nivel}</span>
          <h5 class="font-display mb-1">${p.nombre}</h5>
          <p class="text-secondary small mb-2"><i class="bi bi-clock-history me-1"></i>${p.duracion}</p>
          <p class="mb-3" style="color:var(--texto-sec)">${p.descripcion}</p>
          <div class="d-flex justify-content-between align-items-center">
            <span class="fw-bold text-turquesa">${p.pension} <small class="text-secondary">/ mes</small></span>
            <a href="contacto.html" class="btn btn-marca btn-sm">Más información</a>
          </div>
        </div>
      </div>
    </div>`;
}

function inicializarPaginaProgramas() {
  const contenedor = document.getElementById('listaProgramas');
  if (!contenedor) return;

  function pintar(lista) {
    contenedor.innerHTML = lista.length
      ? lista.map(renderTarjetaPrograma).join('')
      : `<div class="col-12 text-center py-5"><i class="bi bi-search display-4 text-secondary"></i><p class="mt-3 text-secondary">No se encontraron programas con ese criterio.</p></div>`;
    setTimeout(() => {
      contenedor.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    }, 30);
  }

  const todos = getProgramas();
  pintar(todos);

  const inputBuscar = document.getElementById('buscadorProgramas');
  const filtroNivel = document.getElementById('filtroNivel');

  function aplicarFiltros() {
    const texto = (inputBuscar?.value || '').toLowerCase().trim();
    const nivel = (filtroNivel?.value || '').toLowerCase();
    const filtrados = todos.filter(p => {
      const coincideTexto = p.nombre.toLowerCase().includes(texto) || p.descripcion.toLowerCase().includes(texto);
      const coincideNivel = !nivel || p.nivel.toLowerCase() === nivel;
      return coincideTexto && coincideNivel;
    });
    pintar(filtrados);
  }

  if (inputBuscar) inputBuscar.addEventListener('input', aplicarFiltros);
  if (filtroNivel) filtroNivel.addEventListener('change', aplicarFiltros);
}

/* ---------------------------------------------------------------------
   10. RENDER DE DOCENTES (página docentes.html)
   --------------------------------------------------------------------- */
function renderTarjetaDocente(d) {
  return `
    <div class="col-md-6 col-lg-4 reveal">
      <div class="card-marca h-100 text-center p-4">
        <img src="${d.foto}" alt="${d.nombre}" class="rounded-circle mx-auto mb-3" style="width:120px;height:120px;object-fit:cover;border:4px solid var(--beige)">
        <h5 class="font-display mb-1">${d.nombre}</h5>
        <p class="text-turquesa fw-semibold mb-1">${d.especialidad}</p>
        <p class="small text-secondary mb-2"><i class="bi bi-award me-1"></i>${d.experiencia} de experiencia</p>
        <p class="mb-0" style="color:var(--texto-sec)">${d.bio}</p>
      </div>
    </div>`;
}
function inicializarPaginaDocentes() {
  const contenedor = document.getElementById('listaDocentes');
  if (!contenedor) return;
  contenedor.innerHTML = getDocentes().map(renderTarjetaDocente).join('');
  setTimeout(() => contenedor.querySelectorAll('.reveal').forEach(el => el.classList.add('visible')), 30);
}

/* ---------------------------------------------------------------------
   11. GALERÍA: filtrado por categoría + LIGHTBOX
   --------------------------------------------------------------------- */
function inicializarGaleria() {
  const galeria = document.getElementById('galeriaGrid');
  if (!galeria) return;

  const chips = document.querySelectorAll('.filtro-chip');
  const items = galeria.querySelectorAll('.galeria-item');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const categoria = chip.dataset.categoria;
      items.forEach(item => {
        const coincide = categoria === 'todos' || item.dataset.categoria === categoria;
        item.closest('.col-grid').style.display = coincide ? '' : 'none';
      });
    });
  });

  const overlay = document.getElementById('lightboxOverlay');
  const imgLightbox = document.getElementById('lightboxImg');
  const listaImgs = Array.from(items).map(i => i.querySelector('img').src);
  let indiceActual = 0;

  function abrirLightbox(idx) {
    indiceActual = idx;
    imgLightbox.src = listaImgs[idx];
    overlay.style.display = 'flex';
  }
  items.forEach((item, idx) => item.addEventListener('click', () => abrirLightbox(idx)));

  document.getElementById('lightboxClose')?.addEventListener('click', () => overlay.style.display = 'none');
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.style.display = 'none'; });
  document.getElementById('lightboxPrev')?.addEventListener('click', (e) => {
    e.stopPropagation();
    indiceActual = (indiceActual - 1 + listaImgs.length) % listaImgs.length;
    imgLightbox.src = listaImgs[indiceActual];
  });
  document.getElementById('lightboxNext')?.addEventListener('click', (e) => {
    e.stopPropagation();
    indiceActual = (indiceActual + 1) % listaImgs.length;
    imgLightbox.src = listaImgs[indiceActual];
  });
  document.addEventListener('keydown', (e) => {
    if (overlay.style.display !== 'flex') return;
    if (e.key === 'Escape') overlay.style.display = 'none';
    if (e.key === 'ArrowRight') document.getElementById('lightboxNext')?.click();
    if (e.key === 'ArrowLeft') document.getElementById('lightboxPrev')?.click();
  });
}

/* ---------------------------------------------------------------------
   12. LOGIN
   --------------------------------------------------------------------- */
function inicializarLogin() {
  const form = document.getElementById('formLogin');
  if (!form) return;
  const alertaBox = document.getElementById('alertaLogin');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const usuario = document.getElementById('loginUsuario').value.trim();
    const clave = document.getElementById('loginClave').value.trim();

    if (usuario === 'admin' && clave === '123456') {
      sessionStorage.setItem(LS_KEYS.SESION, 'true');
      mostrarAlerta(alertaBox, '<i class="bi bi-check-circle-fill me-2"></i>Bienvenido Administrador. Redirigiendo...', 'success');
      setTimeout(() => window.location.href = 'admin.html', 900);
    } else {
      mostrarAlerta(alertaBox, '<i class="bi bi-x-circle-fill me-2"></i>Credenciales incorrectas.', 'danger');
    }
  });
}

function protegerPanelAdmin() {
  const esAdmin = document.body.dataset.admin === 'true';
  if (esAdmin && sessionStorage.getItem(LS_KEYS.SESION) !== 'true') {
    window.location.href = 'login.html';
  }
}

/* ---------------------------------------------------------------------
   13. PANEL ADMINISTRATIVO — Dashboard + CRUD Programas / Docentes / Mensajes
   --------------------------------------------------------------------- */
function inicializarAdmin() {
  const dashboard = document.getElementById('adminDashboard');
  if (!dashboard) return;

  // ----- Toggle sidebar móvil -----
  document.getElementById('btnToggleSidebar')?.addEventListener('click', () => {
    document.querySelector('.admin-sidebar')?.classList.toggle('show');
  });

  // ----- Cerrar sesión -----
  document.getElementById('btnCerrarSesion')?.addEventListener('click', () => {
    sessionStorage.removeItem(LS_KEYS.SESION);
    window.location.href = 'login.html';
  });

  actualizarKPIs();
  renderTablaProgramas();
  renderTablaDocentes();
  renderTablaMensajes();
  inicializarFormulariosCRUD();
}

function actualizarKPIs() {
  const elProg = document.getElementById('kpiProgramas');
  const elDoc = document.getElementById('kpiDocentes');
  const elMsg = document.getElementById('kpiMensajes');
  if (elProg) elProg.textContent = getProgramas().length;
  if (elDoc) elDoc.textContent = getDocentes().length;
  if (elMsg) elMsg.textContent = getMensajes().length;
}

/* ---- CRUD PROGRAMAS ---- */
function renderTablaProgramas() {
  const tbody = document.getElementById('tablaProgramas');
  if (!tbody) return;
  const programas = getProgramas();
  tbody.innerHTML = programas.map(p => `
    <tr>
      <td>${p.id}</td>
      <td>${p.nombre}</td>
      <td>${p.nivel}</td>
      <td>${p.duracion}</td>
      <td>${p.pension}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-secondary me-1 btn-editar-programa" data-id="${p.id}"><i class="bi bi-pencil-square"></i></button>
        <button class="btn btn-sm btn-outline-danger btn-eliminar-programa" data-id="${p.id}"><i class="bi bi-trash3"></i></button>
      </td>
    </tr>`).join('') || `<tr><td colspan="6" class="text-center text-secondary py-4">Sin programas registrados.</td></tr>`;

  tbody.querySelectorAll('.btn-eliminar-programa').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!confirm('¿Eliminar este programa?')) return;
      setProgramas(getProgramas().filter(p => p.id !== Number(btn.dataset.id)));
      renderTablaProgramas(); actualizarKPIs();
    });
  });
  tbody.querySelectorAll('.btn-editar-programa').forEach(btn => {
    btn.addEventListener('click', () => abrirModalPrograma(Number(btn.dataset.id)));
  });
}

function abrirModalPrograma(id = null) {
  const form = document.getElementById('formPrograma');
  form.reset();
  document.getElementById('programaId').value = '';
  document.getElementById('tituloModalPrograma').textContent = 'Nuevo Programa';
  if (id) {
    const p = getProgramas().find(x => x.id === id);
    if (p) {
      document.getElementById('tituloModalPrograma').textContent = 'Editar Programa';
      document.getElementById('programaId').value = p.id;
      document.getElementById('programaNombre').value = p.nombre;
      document.getElementById('programaNivel').value = p.nivel;
      document.getElementById('programaDuracion').value = p.duracion;
      document.getElementById('programaPension').value = p.pension;
      document.getElementById('programaImg').value = p.img;
      document.getElementById('programaDescripcion').value = p.descripcion;
    }
  }
  bootstrap.Modal.getOrCreateInstance(document.getElementById('modalPrograma')).show();
}

/* ---- CRUD DOCENTES ---- */
function renderTablaDocentes() {
  const tbody = document.getElementById('tablaDocentes');
  if (!tbody) return;
  const docentes = getDocentes();
  tbody.innerHTML = docentes.map(d => `
    <tr>
      <td><img src="${d.foto}" class="rounded-circle" style="width:40px;height:40px;object-fit:cover"></td>
      <td>${d.nombre}</td>
      <td>${d.especialidad}</td>
      <td>${d.experiencia}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-secondary me-1 btn-editar-docente" data-id="${d.id}"><i class="bi bi-pencil-square"></i></button>
        <button class="btn btn-sm btn-outline-danger btn-eliminar-docente" data-id="${d.id}"><i class="bi bi-trash3"></i></button>
      </td>
    </tr>`).join('') || `<tr><td colspan="5" class="text-center text-secondary py-4">Sin docentes registrados.</td></tr>`;

  tbody.querySelectorAll('.btn-eliminar-docente').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!confirm('¿Eliminar este docente?')) return;
      setDocentes(getDocentes().filter(d => d.id !== Number(btn.dataset.id)));
      renderTablaDocentes(); actualizarKPIs();
    });
  });
  tbody.querySelectorAll('.btn-editar-docente').forEach(btn => {
    btn.addEventListener('click', () => abrirModalDocente(Number(btn.dataset.id)));
  });
}

function abrirModalDocente(id = null) {
  const form = document.getElementById('formDocente');
  form.reset();
  document.getElementById('docenteId').value = '';
  document.getElementById('tituloModalDocente').textContent = 'Nuevo Docente';
  if (id) {
    const d = getDocentes().find(x => x.id === id);
    if (d) {
      document.getElementById('tituloModalDocente').textContent = 'Editar Docente';
      document.getElementById('docenteId').value = d.id;
      document.getElementById('docenteNombre').value = d.nombre;
      document.getElementById('docenteEspecialidad').value = d.especialidad;
      document.getElementById('docenteExperiencia').value = d.experiencia;
      document.getElementById('docenteFoto').value = d.foto;
      document.getElementById('docenteBio').value = d.bio;
    }
  }
  bootstrap.Modal.getOrCreateInstance(document.getElementById('modalDocente')).show();
}

/* ---- MENSAJES (solo lectura + eliminar) ---- */
function renderTablaMensajes() {
  const tbody = document.getElementById('tablaMensajes');
  if (!tbody) return;
  const mensajes = getMensajes();
  tbody.innerHTML = mensajes.map(m => `
    <tr>
      <td>${m.fecha}</td>
      <td>${m.nombre}</td>
      <td>${m.correo}</td>
      <td>${m.telefono}</td>
      <td>${m.asunto}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary btn-ver-mensaje" data-id="${m.id}"><i class="bi bi-eye"></i></button>
        <button class="btn btn-sm btn-outline-danger btn-eliminar-mensaje" data-id="${m.id}"><i class="bi bi-trash3"></i></button>
      </td>
    </tr>`).join('') || `<tr><td colspan="6" class="text-center text-secondary py-4">No hay mensajes recibidos todavía.</td></tr>`;

  tbody.querySelectorAll('.btn-eliminar-mensaje').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!confirm('¿Eliminar este mensaje?')) return;
      setMensajes(getMensajes().filter(m => m.id !== Number(btn.dataset.id)));
      renderTablaMensajes(); actualizarKPIs();
    });
  });
  tbody.querySelectorAll('.btn-ver-mensaje').forEach(btn => {
    btn.addEventListener('click', () => {
      const m = getMensajes().find(x => x.id === Number(btn.dataset.id));
      if (m) alert(`De: ${m.nombre} (${m.correo})\nTeléfono: ${m.telefono}\nAsunto: ${m.asunto}\n\n${m.mensaje}`);
    });
  });
}

/* ---- Submits de los formularios modales ---- */
function inicializarFormulariosCRUD() {
  document.getElementById('btnNuevoPrograma')?.addEventListener('click', () => abrirModalPrograma());
  document.getElementById('btnNuevoDocente')?.addEventListener('click', () => abrirModalDocente());

  document.getElementById('formPrograma')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('programaId').value;
    const programas = getProgramas();
    const datos = {
      nombre: document.getElementById('programaNombre').value.trim(),
      nivel: document.getElementById('programaNivel').value,
      duracion: document.getElementById('programaDuracion').value.trim(),
      pension: document.getElementById('programaPension').value.trim(),
      img: document.getElementById('programaImg').value.trim() || 'https://picsum.photos/seed/insight-default/500/340',
      descripcion: document.getElementById('programaDescripcion').value.trim()
    };
    if (id) {
      const idx = programas.findIndex(p => p.id === Number(id));
      if (idx > -1) programas[idx] = { ...programas[idx], ...datos };
    } else {
      const nuevoId = programas.length ? Math.max(...programas.map(p => p.id)) + 1 : 1;
      programas.push({ id: nuevoId, ...datos });
    }
    setProgramas(programas);
    bootstrap.Modal.getInstance(document.getElementById('modalPrograma'))?.hide();
    renderTablaProgramas(); actualizarKPIs();
  });

  document.getElementById('formDocente')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('docenteId').value;
    const docentes = getDocentes();
    const datos = {
      nombre: document.getElementById('docenteNombre').value.trim(),
      especialidad: document.getElementById('docenteEspecialidad').value.trim(),
      experiencia: document.getElementById('docenteExperiencia').value.trim(),
      foto: document.getElementById('docenteFoto').value.trim() || 'https://i.pravatar.cc/300',
      bio: document.getElementById('docenteBio').value.trim()
    };
    if (id) {
      const idx = docentes.findIndex(d => d.id === Number(id));
      if (idx > -1) docentes[idx] = { ...docentes[idx], ...datos };
    } else {
      const nuevoId = docentes.length ? Math.max(...docentes.map(d => d.id)) + 1 : 1;
      docentes.push({ id: nuevoId, ...datos });
    }
    setDocentes(docentes);
    bootstrap.Modal.getInstance(document.getElementById('modalDocente'))?.hide();
    renderTablaDocentes(); actualizarKPIs();
  });
}

/* ---------------------------------------------------------------------
   14. PUNTO DE ENTRADA
   --------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  inicializarDatos();
  marcarEnlaceActivo();
  colapsarMenuMovil();
  inicializarModoOscuro();
  inicializarScrollEffects();
  actualizarContadorVisitas();
  inicializarFormularioContacto();
  inicializarPaginaProgramas();
  inicializarPaginaDocentes();
  inicializarGaleria();
  inicializarLogin();
  protegerPanelAdmin();
  inicializarAdmin();
});
