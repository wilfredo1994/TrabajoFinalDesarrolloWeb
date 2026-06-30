# INSIGHT SCHOOL — Portal Web Institucional

Proyecto académico (Proyecto Final de Desarrollo Web) que implementa el portal institucional del colegio privado **Insight School**, ubicado en UPIS San José, Lurín, Lima, Perú.

> "Descubriendo talentos, formando líderes para el futuro"

## 🎨 Identidad visual

La paleta de colores y la tipografía se derivan directamente del **escudo institucional**:

| Color           | Hex       | Uso                                   |
|-----------------|-----------|----------------------------------------|
| Turquesa        | `#18A7C8` | Color de marca, botones, enlaces      |
| Turquesa oscuro | `#0E7E9C` | Hover, gradientes                     |
| Beige           | `#F2E5CF` | Acentos cálidos, badges secundarios   |
| Negro (Tinta)   | `#111111` | Texto, navbar oscuro, footer          |
| Blanco          | `#FFFFFF` | Fondos base                           |
| Gris claro      | `#F7F8FA` | Secciones alternas                    |

**Tipografía:** `Playfair Display` (titulares, en línea con el wordmark serifado del logo) + `Poppins` (textos, solicitada en el brief).

**Elemento de firma:** se reutiliza el motivo del escudo de 4 cuadrantes turquesa/beige (presente en el logo) como patrón decorativo en banners, separadores y footer.

## 🗂️ Estructura del proyecto

```
portal-educativo/
├── index.html          → Página de inicio (hero, carousel, diferenciales, noticias)
├── nosotros.html        → Historia, misión, visión, valores, organigrama, línea de tiempo
├── cursos.html           → Programas académicos con buscador y filtro dinámico
├── docentes.html         → Plantilla docente (6 perfiles)
├── galeria.html           → Galería de 12 imágenes con filtros y lightbox
├── contacto.html          → Formulario validado + guardado en localStorage
├── ubicacion.html          → Google Maps, horario de atención, WhatsApp
├── login.html               → Acceso al panel administrativo
├── admin.html                 → Dashboard + CRUD de Programas, Docentes y Mensajes
├── css/
│   └── estilos.css            → Variables CSS, modo oscuro, animaciones, responsive
├── js/
│   └── app.js                   → Toda la lógica funcional (vanilla JS)
└── img/
    ├── logo.png                   → Logo institucional
    ├── banner/, cursos/, docentes/, galeria/   → Carpetas para imágenes propias
```

> Las imágenes de contenido usan URLs temporales (`picsum.photos` / `i.pravatar.cc`) que pueden reemplazarse por archivos locales dentro de `img/`.

## ⚙️ Tecnologías

- HTML5 semántico
- CSS3 (variables, Flexbox, Grid, animaciones, media queries, mobile-first)
- Bootstrap 5.3 (Navbar, Carousel, Cards, Modal, Table, Alert, Forms)
- Bootstrap Icons
- JavaScript Vanilla (sin frameworks)
- LocalStorage / SessionStorage como base de datos del lado del cliente

## 🔑 Acceso administrativo

```
Usuario:     admin
Contraseña:  123456
```

Al iniciar sesión correctamente se guarda una bandera en `sessionStorage` que protege el acceso directo a `admin.html`.

## ✅ Funcionalidades JavaScript implementadas

1. Menú responsive con colapso automático al navegar
2. Carousel Bootstrap (3 slides)
3. Validación de formularios (contacto y login)
4. Buscador y filtro dinámico de programas académicos
5. Registro de mensajes de contacto en LocalStorage
6. Contador de visitas (LocalStorage)
7. Modo oscuro con `classList.toggle()` (persistente)
8. Botón "Volver arriba"
9. Botón flotante de WhatsApp
10. Lightbox de galería con filtros por categoría
11. CRUD completo de Programas y Docentes (Crear / Editar / Eliminar) en el panel admin
12. Dashboard con KPIs en tiempo real (total programas, docentes y mensajes)

## ▶️ Cómo ejecutar

1. Descarga o clona la carpeta `portal-educativo/`.
2. Abre `index.html` directamente en tu navegador, o sirve la carpeta con cualquier servidor estático (Live Server, `python -m http.server`, etc.).
3. No requiere instalación de dependencias: Bootstrap, Bootstrap Icons y Google Fonts se cargan vía CDN.

## 📌 Notas

- Todo el sitio es responsive (mobile-first) y fue probado en resoluciones de escritorio, tablet y móvil.
- Los datos de Programas, Docentes y Mensajes se inicializan automáticamente en LocalStorage la primera vez que se carga el sitio.
- El proyecto está listo para presentar como entrega final de curso, cumpliendo los requisitos de Bootstrap, CSS, JavaScript y LocalStorage solicitados.

---
© 2026 Insight School — Proyecto académico de Desarrollo Web.
