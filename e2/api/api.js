const express = require("express");
const api = express();
const dbCursos = require("./dbCursos");

api.get("/api/cursos", (request, response) => {
    response.status(200).send({
        success: true,
        message: "API CURSOS",
        pokemons: dbCursos.dbCursosExportados,
    });
});

api.listen(2009, () => {
    console.log("API NEOLAND corriendo en puerto 2009");
});