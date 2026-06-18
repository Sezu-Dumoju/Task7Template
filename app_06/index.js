const http = require("http");
const path = require("path");
const { mimeTypes } = require('./utility/mime');
const { staticFile } = require('./utility/static_file');

const PORT = 3500;

const server = http.createServer(function(req, res) {
    const url = req.url;
    console.log(url);

    switch (url) {
        case '/':
            staticFile(res, '/html/main_page.html', '.html');
            break;
        case '/stats':
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
                message: 'Statystyki serwera',
                uptime: process.uptime(),
                timestamp: new Date().toISOString()
            }, null, 2));
            break;
        default:
            const extname = String(path.extname(url)).toLowerCase();
            if (extname in mimeTypes) {
                staticFile(res, url, extname);
            } else {
                res.statusCode = 404;
                res.end();
            }
    }
});

server.listen(PORT, function() {
    console.log('Server running at http://localhost:' + PORT);
});

process.on('SIGINT', function() {
    console.log('Server stopped');
    process.exit();
});