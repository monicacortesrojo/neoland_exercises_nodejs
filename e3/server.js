const http = require("http");
const fs = require("fs");

const server = http.createServer((request, response) => {
    let contentType;
    let path;

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
            path = "";
    }

    fs.readFile(path, (error, data) => {
        if (error) {
            response.writeHead(500);
            response.end();
            console.log("ERROR NO SE CARGA");
        } else {
            response.writeHead(200, { "Content-Type": contentType });
            response.write(data);
            response.end();
        }
    });
});

server.listen(2021);
console.log("Server 2021 inicializado");