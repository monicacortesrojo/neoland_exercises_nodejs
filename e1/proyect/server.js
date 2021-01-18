const http = require("http");
const fs = require("fs");

const server = http.createServer((request, response) => {
            let path;

            if (request.url === "/") {
                path = "html/page1.html";
            } else {
                path = `html${request.url}`;
            }


            const extension = request.url; //conseguir extension del fichero que se pide
            if (extension !== "") {
                let ruta;
                let contentType;
                switch (extension) {
                    case '.js':
                        ruta = "./public/js" + request.url;
                        contentType = 'text/javascript';
                        break;
                    case '.css':
                        ruta = "./public/css" + request.url;
                        contentType = 'text/css';
                        break;
                    case '.html':
                        ruta = "./public/html" + request.url;
                        contentType = 'text/html';
                        break;
                    default:
                        ruta = "";
                        contentType = "";
                };

                fs.readFile(path, (error, data) => {
                    if (error) {
                        fs.readFile("html/index.html", (error, data) => {
                            response.writeHead(404);
                            response.write("<h1>pagina no encontrada</h1>");
                            response.end();
                        });
                    } else {
                        response.writeHead(200, { "Content-Type": "text/html" });
                        response.write(data);
                        response.end();
                    }
                });
            });

        server.listen(1111); console.log("Server 1111 Iniciado");