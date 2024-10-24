// Importar Express
const express = require('express');

// Crear una instancia de la aplicación Express
const app = express();

// Definir una ruta básica
app.get('/', (req, res) => {
  res.send('¡Hola Mundo desde Express!');
});

// Definir el puerto donde escuchará el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});