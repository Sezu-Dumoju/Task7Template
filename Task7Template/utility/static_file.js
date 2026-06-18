const fs = require("fs");
const { mimeTypes } = require('./mime');

const staticFile = function (res, filePath, extname) {

    fs.readFile('./public' + filePath, function (err, data) {

        if (err) {
            res.statusCode = 404;
            res.end();
            return;
        }

        res.writeHead(200, {
            'Content-Type': mimeTypes[extname]
        });

        res.end(data);
    });
};

module.exports = { staticFile };