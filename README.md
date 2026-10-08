# TALLER MÓVIL PRO // Landing Page Dark-Mode Industrial

Sitio web clone de alta precisión para **TALLER MÓVIL PRO** (Servicio Técnico y Mecánico Automotriz a Domicilio / en Terreno).

---

## 🛠 Características Técnicas & Visuales

- **Estética Industrial & Técnica**: Paleta de colores dark-mode de alto contraste (#0D0D0D, #171717, #282828), acentos color ámbar industrial (#FF9900), bordes nítidos de 1px y sutil trama cuadriculada técnica.
- **Tipografía de Alto Impacto**: Encabezados en caja alta con **Inter**, combinados con acentos monospaciados en **JetBrains Mono** para tags de sección (`SECCIÓN 01 // ASISTENCIA EN TERRENO`, etc.).
- **Estructura Modular Completa**:
  1. **Header / Barra de Navegación**: Inicio directo sin banner superior, logotipo con ícono de llave mecánica, enlaces de anclaje fluidos (SERVICIOS | CÓMO FUNCIONA | COBERTURA | PREGUNTAS | CONTACTO), botón directo (+56 9 8933 4099) y botón CTA WhatsApp.
  2. **Hero Section (Asistencia en Terreno)**: Título principal de impacto ("TU TALLER MECÁNICO LLEGA A DONDE ESTÉS"), descripción técnica, botones táctiles de 48px+ de alto y badges de garantía y cobertura ("• REGIÓN METROPOLITANA: ACTIVO" y "🛡 TRABAJO GARANTIZADO EN TERRENO").
  3. **Capacidades & Servicios**: Título "LO QUE HACEMOS, DONDE LO NECESITES" con grilla modular (1 col en móvil, 2 en tablet, 3 en desktop) para Vehículos Particulares, Flotas y Empresas, Camiones, Maquinaria, Motores Diésel, Generadores y Equipos Estacionarios.
  4. **En Terreno**: Banner visual con fondo integrado de técnico trabajando con herramientas pesadas y escáner ("ATENDEMOS EN OBRA, PATIO, CAMINO O TU PROPIO GARAJE").
  5. **Cómo Funciona**: Flujo de 4 pasos con imagen vertical del compartimento del motor (01 Escríbenos, 02 Coordinamos, 03 Llegamos con el Taller, 04 Revisamos y Trabajamos).
  6. **Cobertura**: Detalle de motor diésel y panel con especificaciones para Particulares y Flotas, junto al listado interactivo de 24 comunas principales de la RM con buscador en tiempo real.
  7. **Preguntas Frecuentes**: Acordeón interactivo con la pregunta 02 abierta por defecto.
  8. **Contacto**: Título "CUÉNTANOS QUÉ HAY QUE REVISAR", botones de acción directa, asistente rápido de WhatsApp y panel técnico con datos de contacto.
  9. **Footer**: 3 columnas limpias con datos de CYD MECÁNICA SPA, navegación y enlaces de urgencia.
  10. **Botón Flotante de WhatsApp**: Acceso rápido con pulso en vivo para comunicación inmediata.

---

## 🚀 Cómo Visualizar el Proyecto

### Opción 1: Abrir directamente en el navegador
Puedes hacer doble clic en `index.html` o abrirlo directamente con tu navegador favorito (Chrome, Edge, Firefox, Brave).

### Opción 2: Servidor local ligero con Python
En la terminal de la carpeta del proyecto, ejecuta:
```bash
python -m http.server 8080
```
Y abre en tu navegador:
[http://localhost:8080](http://localhost:8080)

---

## 📂 Archivos del Proyecto

- `index.html`: Estructura semántica completa, accesibilidad ARIA y enlaces optimizados.
- `styles.css`: Sistema de diseño moderno, variables CSS, rejilla industrial y media queries responsivas.
- `script.js`: Menú móvil, acordeón FAQ, filtro dinámico de comunas, generador de WhatsApp y copia con toast.
