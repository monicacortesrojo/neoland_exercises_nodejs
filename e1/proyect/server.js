const http = require("http");
const fs = require("fs");
const server = http.createServer((request, response) => {
    const path = "";
    const path_splitted = path.split(".");
    const extension = path_splitted.pop();

    if (extension !== "") {
        let ruta;
        let contentType;
        switch (extension) {
            case ".js":
                ruta = "./public/js" + request.url;
                contentType = "text/javascript";
                break;
            case ".css":
                ruta =
                    "../node_modules/bootstrap/dist/css/bootstrap.min.css" + request.url;
                contentType = "text/css";
                break;
            case ".html":
                ruta = "./public/html" + request.url;
                contentType = "text/html";
                break;
            default:
                ruta = "";
                contentType = "";
        }
    }

    fs.readFile("html/index.html", (error, data) => {
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