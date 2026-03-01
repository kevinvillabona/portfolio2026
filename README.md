# Kevin Villabona | Tech Lead & Software Developer

<div align="center">

  ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

</div>

## Descripción

Portfolio web interactivo, dinámico y totalmente responsive que refleja mi perfil profesional como Líder Técnico y Desarrollador .NET. El proyecto destaca mi experiencia laboral, stack tecnológico, formación académica y proyectos destacados (incluyendo un espacio *Sandbox* para experimentación). Está construido con un enfoque en el rendimiento, la escalabilidad del código y una experiencia de usuario moderna.

## Características Principales

- **Diseño Moderno (Bento Grid)**: Interfaz estructurada mediante grillas tipo Bento con efectos "glow" y animaciones suaves al hacer scroll.
- **Tema Oscuro/Claro**: Soporte nativo para *Dark Mode* con persistencia de preferencias del usuario mediante `localStorage`.
- **Línea de Tiempo Interactiva**: Representación visual de la experiencia laboral utilizando trazados de SVG animados (`stroke-dashoffset`) que se dibujan dinámicamente según el scroll.
- **Formulario de Contacto**: Integración asíncrona (`fetch`) con Google Apps Script para el envío directo de correos, incluyendo notificaciones tipo *Toast* de feedback.
- **Renderizado Dinámico**: Toda la información del portfolio (perfil, métricas, experiencia, proyectos) se inyecta en el DOM de forma asíncrona consumiendo el archivo `data.json`.
- **Responsive Design**: Navegación adaptativa con menú hamburguesa para dispositivos móviles y optimización de layouts.
- **Hero Section Multimedia**: Soporte para renderizado de videos ligeros (`.webm` / `.mov`) como avatares animados.

## Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla).
- **Estilos**: Tailwind CSS (vía CDN) combinado con variables CSS personalizadas.
- **Librerías Externas**: 
  - [AOS.js](https://michalsnik.github.io/aos/) para animaciones.
  - FontAwesome & Devicons para la iconografía.
- **Backend/Integración**: Google Apps Script (para el procesamiento del formulario de contacto).

## Estructura del Proyecto

```text
├── index.html      # Estructura principal y maquetación (Tailwind classes)
├── style.css       # Theming (variables CSS), custom animations y utilidades
├── script.js       # Lógica de renderizado dinámico, Intersection Observers y formulario
├── data.json       # Base de datos local con toda la información del perfil
├── images/         # Recursos visuales estáticos (logos, capturas, placeholders)
├── videos/         # Archivos multimedia para el hero section
└── README.md       # Documentación del proyecto