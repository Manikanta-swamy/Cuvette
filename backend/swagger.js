module.exports = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Cuvette Assignment API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
