
---

# 🛠 Backend - STENELLA Club de Fútbol

API REST para la gestión de usuarios, equipos, partidos y estadísticas.

---

## Tecnologías

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- Bcrypt
- Dotenv

---

## Instalación

```bash
npm install
npm run dev
```

Servidor en:
```html
http:localhost:3000
```

## Estructura
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

## Arquitectura
- Routes → endpoints
- Controllers → lógica
- Models → datos
- Middlewares → auth y control

## Autenticación
- JWT
- Middleware de protección de rutas
- Control por roles  
Roles:
- jugador
- entrenador
- director deportivo

## Endpoints
Usuarios:
```bash
GET     /api/v1/user/
GET     /api/v1/user/role/:role
GET     /api/v1/user/:id
POST    /api/v1/user/
POST    /api/v1/user/login
PUT     /api/v1/user/:id
DELETE  /api/v1/user/:id
```
Equipos:
```bash
GET    /api/v1/team/
GET    /api/v1/team/:id
GET    /api/v1/team/user/:userId
GET    /api/v1/team/coach/:coachId
POST   /api/v1/team/
PUT    /api/v1/team/:id
DELETE /api/v1/team/:id
```
Partidos:
```bash
GET    /api/v1/match/
GET    /api/v1/match/:id
GET    /api/v1/match/team/:teamId
POST   /api/v1/match/
PUT    /api/v1/match/:id
DELETE /api/v1/match/:id
```

## Modelo de datos
Usuario:
- firstName
- lastName
- birthday
- phone
- email
- nationality
- password
- role
- position
- dorsal
- userCode

Equipo:
- teamCode
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
- stats[ ]
  - csvId
  - player
  - minutes
  - titular
  - yellowCards
  - doubleYellowCards
  - redCars
  - goalsScored
  - goalsConceded
  - rating

Incluye unas seeds para la carga inicial de datos.

