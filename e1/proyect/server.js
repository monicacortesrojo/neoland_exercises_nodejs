const http = require("http");
const fs = require("fs");
const server = http.createServer((request, response) => {
    let contentType;
    let path;

    const PATH_INDEX = "./public/html/index.html";

    const extension = request.url.split(".")[1];

    switch (extension) {
        case "html":
            contentType = "text/html";
            path = `./public/html${request.url}`;
            break;
        case "css":
            contentType = "text/css";
            path = `./public/css${request.url}`;
            break;
        case "js":
            contentType = "text/javascript";
            path = `./public/js${request.url}`;
            break;
        default:
            path = PATH_INDEX;
            contentType = "text/html";
    }

    fs.readFile("./public/html/index.html", (error, data) => {
        if (error) {
            console.error(error.stack);
            response.writeHead(404);
            response.write("<h1>Página no encontrada</h1>");
            response.end();
        } else {
            response.writeHead(200, { "Content-Type": "text/html" });
            response.write(data);
            response.end();
        }
    });
});

server.listen(1111);
console.log("Server 1111 Iniciado");