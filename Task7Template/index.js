const http = require('http');
const path = require('path');

const { mimeTypes } = require('./utility/mime');
const { staticFile } = require('./utility/static_file');

const PORT = process.env.PORT || 3500;

http.createServer(function (req, res) {

    const url = req.url;

    switch (url) {

        case '/':
            staticFile(res, '/html/main_page.html', '.html');
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

}).listen(PORT);
