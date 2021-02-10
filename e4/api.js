const fs = require("fs");
const express = require("express");
const { response, request } = require("express");

const api = express();
const rutaDb = "db/dbFake.json";

api.get("/api/films", (request, response) => {
    fs.readFile(rutaDb, (err, data) => {
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

api.get("/api/film/:title", (request, response) => {
    fs.readFile(rutaDb, (err, data) => {
        if (!request.params.title) {
            response.status(400).send({
                success: false,
                url: "/api/film",
                method: "GET",
                message: "title is require",
            });
        } else {
            const allFilms = JSON.parse(data);
            const filmByName = allFilms.find(
                (film) => request.params.title === film.title
            );
            response.status(200).send({
                success: true,
                url: "/api/film",
                films: filmByName,
                method: "GET",
            });
        }
    });
});

api.get("/api/films/genre", (request, response) => {
    fs.readFile(rutaDb, (err, data) => {
        if (!request.query.genre) {
            response.status(400).send({
                success: false,
                url: "/api/films/genre",
                method: "GET",
                message: "Genre is require",
            });
        } else {
            const allFilms = JSON.parse(data);
            const filmsByGenre = allFilms.filter(
                (films) => request.query.genre === films.genre
            );
            response.status(200).send({
                success: true,
                url: "/api/film",
                films: filmsByGenre,
                method: "GET",
            });
        }
    });
});

api.post("/api/film", (request, response) => {
    if (!request.query.title || !request.query.genre) {
        response.status(400).send({
            success: false,
            url: "/api/film",
            method: "POST",
            message: "title and genre are require",
        });
    } else {
        fs.readFile(rutaDb, (err, data) => {
            const allFilms = JSON.parse(data);
            const newFilm = {
                id: allFilms.length + 2,
                title: request.query.title,
                director: request.query.director,
                genre: request.query.genre,
                year: request.query.year,
            };

            allFilms.push(newFilm);

            fs.writeFile(rutaDb, JSON.stringify(allFilms), (err) => {
                if (err) {
                    response.status(400).send({
                        success: false,
                        url: "/api/film",
                        method: "POST",
                        message: "Film not added correctly",
                        err: err,
                    });
                } else {
                    response.status(201).send({
                        success: true,
                        url: "/api/film",
                        method: "POST",
                        message: "Film added successfully",
                        newFilm: newFilm,
                    });
                }
            });
        });
    }
});

api.delete("/api/film", (request, response) => {
    if (!request.query.id) {
        response.status(400).send({
            success: false,
            url: "/api/film",
            method: "DELETE",
            message: "title is require",
        });
    } else {
        fs.readFile(rutaDb, (err, data) => {
            const allFilms = JSON.parse(data);
            const deleteFilm = {
                id: Number.parseInt(request.query.id),
            };
            const newAllFilms = allFilms.filter((film) => film.id !== deleteFilm.id);

            fs.writeFile(rutaDb, JSON.stringify(newAllFilms), (err) => {
                if (err) {
                    response.status(400).send({
                        success: false,
                        url: "/api/film",
                        method: "DELETE",
                        message: "Film not deleted correctly",
                        err: err,
                    });
                } else {
                    response.status(204).send({
                        success: true,
                        url: "/api/film",
                        method: "DELETE",
                        message: "Film deleted successfully",
                        deleteFilm: deleteFilm,
                    });
                }
            });
        });
    }
});

api.get("/api/films/page/:page", (request, response) => {
    fs.readFile(rutaDb, (err, data) => {
        if (err) throw err;
        const allFilms = JSON.parse(data);
        const PAGESIZE = 5;
        const groupFilms = allFilms.slice(
            request.params.page * PAGESIZE - PAGESIZE,
            request.params.page * PAGESIZE
        );
        response.status(200).send({
            success: true,
            url: "/api/films",
            films: groupFilms,
            method: "GET",
        });
    });
});

api.get("/api/films/:filmsId/actors/:actorsId", (request, response) => {
    fs.readFile(rutaDb, (err, data) => {
        const allFilms = JSON.parse(data);
        const film = allFilms.find(
            (film) => film.id === Number.parseInt(request.params.filmsId)
        );
        if (film) {
            const actor = film.actors.find(
                (actor) => actor.id === parseInt(request.params.actorsId)
            );

            if (actor) {
                return response.status(200).send({
                    success: true,
                    message: "Film's actors found",
                    film: film.id,
                    actor: actor,
                });
            } else {
                return response.status(400).send({
                    success: true,
                    message: "Film's actors not found",
                });
            }
        } else {
            return response.status(400).send({
                success: true,
                message: "Film not found",
            });
        }
    });
});

api.get("/api/films/:filmsId/actors", (request, response) => {
    fs.readFile(rutaDb, (error, data) => {
        const allFilms = JSON.parse(data);
        const film = allFilms.find(
            (film) => film.id === parseInt(request.params.filmsId)
        );

        if (film) {
            const actors = film.actors((actors) => actors === request.params.actors);
        }

        response.status(200).send({
            success: false,
            url: "/api/films",
            message: "Film's actors found",
            film: film.id,
            actors: actors,
        });
    });
});

api.put("/api/film/:id", (request, response) => {
    fs.readFile(rutaDb, (error, data) => {
        if (error) throw error;
        const allFilmsUpdate = JSON.parse(data);
        allFilmsUpdate.forEach((film) => {
            if (film.id === Number.parseInt(request.params.id)) {
                film.title = request.body.title ? request.body.title : film.title;
                film.director = request.body.director ?
                    request.body.director :
                    film.director;
                film.genre = request.body.genre ? request.body.genre : film.genre;
                film.year = request.body.year ? request.body.year : film.year;
                film.actors = request.body.actors ? request.body.actors : film.actors;
            }
        });

        fs.writeFile(rutaDb, JSON.stringify(allFilmsUpdate), (error) => {
            if (error) throw error;
            response.status(200).send({
                success: true,
                url: "/api/film/:title",
                method: "PUT",
                message: "Film update successfully",
                film: request.params.id,
            });
        });
    });
});

api.listen(2022);
console.log("API FILMS corriendo en puerto 2022");