const http = require("http");
const fs = require("fs");

const server = http.createServer((request, response) => {
    fs.appendFile(
        "server.log",
        `\n${request.method}|${new Date().toISOString()}|${request.headers.host}:${
      request.url
    }`,
        (error) => {
            if (error) {
                console.error("no se ha podido añadir el data en el log");
            } else {
                console.log("server.log actualizado correctamente");
            }
        }
    );

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
            contentType = "text/html";
            path = `./public/html${request.url}`;
    }

    fs.readFile(path, (error, data) => {
        if (error) {
            response.writeHead(500);
            response.end();
        } else {
            response.writeHead(200, { "Content-Type": contentType });
            response.write(data);
            response.end();
        }
    });
});

server.listen(8989);
console.log("Server 8989 listen");