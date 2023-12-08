// Importar el módulo 'express' para crear un servidor web
const express = require('express');

// Importar el módulo 'body-parser' para parsear los cuerpos de las solicitudes HTTP
const bodyParser = require('body-parser');

// Crear una instancia de la aplicación Express
const app = express();

// Definir el puerto en el que el servidor escuchará las solicitudes
const PORT = process.env.PORT || 3000;

// Utilizar el middleware 'body-parser' para parsear el cuerpo de las solicitudes JSON
app.use(bodyParser.json());

// Definir la tabla de precios por material
const preciosPorMaterial = {
  '001': 1500.00,
  '002': 1000.00,
  '003': 800.00,
  '004': 500.00,
  '005': 300.00,
  '006': 200.00,
  '007': 100.00,
};

// Definir un endpoint para calcular el préstamo
app.post('/calcular-prestamo', (req, res) => {
  // Extraer el ID del material y el peso en gramos de la solicitud
  const { idMaterial, pesoGramos } = req.body;

  // Verificar si el material existe en la tabla de precios
  if (!(idMaterial in preciosPorMaterial)) {
    return res.status(400).json({ error: 'Material no válido' });
  }

  // Calcular el precio por gramo y el monto del préstamo
  const precioGramo = preciosPorMaterial[idMaterial];
  const montoPrestamo = (pesoGramos * precioGramo) * 0.8;

  // Enviar la respuesta con el monto del préstamo calculado
  res.json({ montoPrestamo });
});

// Iniciar el servidor y escuchar en el puerto definido
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
