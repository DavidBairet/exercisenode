const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 8080;

const server = http.createServer((req, res) => {
    let filePath;

    switch (req.url) {
        case "/":
            filePath = "index.html";
            break;
        case "/about":
            filePath = "about.html";
            break;
        case "/contact-me":
            filePath = "contact-me.html";
            break;
        default:
            filePath = "404.html";
            res.statusCode = 404;
    }

    fs.readFile(path.join(__dirname, filePath), (err, data) => {
        if (err) {
            res.writeHead(500);
            res.end("Erreur serveur");
            return;
        }

        res.writeHead(res.statusCode || 200, {
            "Content-Type": "text/html",
        });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
