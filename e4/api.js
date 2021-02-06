const fs = require("fs");
const express = require("express");

const api = express();

api.get("/api/films", (request, response) => {
    fs.readFile("db/dbFake.json", (err, data) => {
        if (err) throw err;
        const allFilms = JSON.parse(data);
        response.status(200).send({
            success: true,
            url: "api/films",
            films: allFilms,
            method: "GET",
        });
    });
});

api.get("/api/film", (request, response) => {
    fs.readFile("db/dbFake.json", (err, data) => {
        if (!request.query.title) {
            response.status(400).send({
                success: false,
                url: "/api/film",
                method: "GET",
                message: "title is require",
            });
        } else {
            const films = JSON.parse(data);
            const titleFilm = films.filter(
                (film) => request.query.title == film.title
            );
            response.status(200).send({
                success: true,
                url: "/api/film",
                films: titleFilm.title,
                method: "GET",
            });
        }
    });
});

api.listen(2022);
console.log("API FILMS corriendo en puerto 2022");