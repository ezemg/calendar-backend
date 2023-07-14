const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes.js');
const eventsRoutes = require('./routes/eventsRoutes.js');
const { dbConnection } = require('./database/dbConfig.js');

// Crear servidor de express
const app = express();

// Paths
const paths = {
  auth: '/api/auth',
  events: '/api/events',
};

// Base de Datos
dbConnection();

// CORS
app.use(cors());

// Directorio Public
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());

// Rutas
app.use(paths.auth, authRoutes);
app.use(paths.events, eventsRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
