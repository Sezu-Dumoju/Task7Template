const fs = require("fs");
const { mimeTypes } = require('./mime');

function staticFile(res, filePath, ext) {
    res.setHeader('Content-Type', mimeTypes[ext]);
    fs.readFile('./public' + filePath, (error, data) => {
        if (error) {
            res.statusCode = 404;
            res.end();
            return;
        }
        res.end(data);
    });
}

module.exports = { staticFile };