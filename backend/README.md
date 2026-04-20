
---

# 🛠 Backend - STENELLA Club de Fútbol

API REST para la gestión de usuarios, equipos, partidos y estadísticas.

---

## 🚀 Tecnologías

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- Bcrypt
- Dotenv

---

## ⚙️ Instalación

```bash
npm install
npm run dev
```

Servidor en:
```html
http:localhost:3000
```

## 📁 Estructura
src/  
├── api/  
│   ├── controllers/  
│   ├── models/  
│   ├── routes/  
├── config/  
├── middlewares/  
├── seeds/  
├── utils/  
└── index.js  

## 🧠 Arquitectura
- Routes → endpoints
- Controllers → lógica
- Models → datos
- Middlewares → auth y control

## 🔐 Autenticación
- JWT
- Middleware de protección de rutas
- Control por roles
Roles:
- jugador
- entrenador
- director deportivo

## 📡 Endpoints principales
Usuarios:
```bash
POST /api/v1/users/register
POST /api/v1/users/login
GET  /api/v1/users
```
Equipos:
```bash
GET    /api/v1/team
POST   /api/v1/team
PUT    /api/v1/team/:id
DELETE /api/v1/team/:id
```
Partidos:
```bash
GET    /api/v1/match
GET    /api/v1/match/:id
GET    /api/v1/match/team/:teamId
POST   /api/v1/match
PUT    /api/v1/match/:id
DELETE /api/v1/match/:id
```

## 📊 Modelo de datos
Usuario:
- firstName
- lastName
- email
- password
- role

Equipo:
- name
- coach
- players[]

Partidos:
- team
- rival
- date
- home
- championship
- jornada
- stats[]

Incluye unas seeds para la carga inicial de datos.

