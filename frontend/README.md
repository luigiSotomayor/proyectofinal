
---

# Frontend - STENELLA Club de Fútbol

Aplicación cliente desarrollada como **Single Page Application (SPA)** para la gestión de equipos, partidos y estadísticas.

---

## Tecnologías

- React
- Vite
- React Router DOM
- React Hook Form
- Context API
- CSS

---

## Instalación

```bash
npm install
npm run dev
```
Aplicación disponible en:
```html
http://localhost:5173
```
## Estructura
src/   
├── components/  
├── context/  
├── hooks/  
├── pages/  
├── styles/  
├── utils/  
├── App.jsx  
└── main.jsx  

## Arquitectura
- Componentes reutilizables
- Context API para estado global
- React Hook Form para formularios
- React Router para navegación

## Autenticación
- Basada en JWT
- Token almacenado en localStorage
- Enviado en cada petición al backend

## API
El frontend consume la API en:
```html
http://localhost:3000/api/v1
```
Ejemplo de header:
```bash
Authorization: Bearer <token>
```

## Funcionalidades
- Login de usuarios
- Visualización de partidos
- Edición de estadísticas
- Gestión según rol

## Consideraciones
- Backend debe estar activo
- Token requerido para rutas protegidas
