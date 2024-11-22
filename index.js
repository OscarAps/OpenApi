const express = require("express");
const path = require("path"); // Importa el módulo Express
const app = express();
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc"); // Crea una instancia de la aplicación Express
const cors = require("cors"); // Importa el módulo CORS

// Configura el puerto
const port = process.env.PORT || 8082;

// Middleware para habilitar CORS
app.use(cors()); // Habilita CORS para permitir solicitudes de otros dominios, si es necesario

// Ruta de ejemplo
app.get("/empleado", (req, res) => {
  res.json({ message: "Servidor funcionando en 8082" }); // Responde con un mensaje JSON
});

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Tareas",
      version: "1.0.0",
    },
    servers: [
      {
        url: `https://oscarm-production.up.railway.app/`, // Usa la URL de Railway
      },
    ],
  },
  apis: [`${path.join(__dirname, "index.js")}`],
};

// Generación de la documentación Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Ruta para acceder a la documentación de Swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Ruta para obtener la especificación completa de la API
app.get("/api-spec", (req, res) => {
  res.json(swaggerDocs);
});

// Inicia el servidor
app.listen(port, () => console.log(`Server is listening on ${port}`)); // Usa comillas invertidas para interpolación
