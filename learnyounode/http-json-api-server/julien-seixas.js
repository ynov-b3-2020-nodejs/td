'use strict'
const http = require('http');
const map = require('through2-map');
const [node, path, port] = process.argv;

const url = require('url');

http.createServer(function (req, res) {
    const urlObj = url.parse(req.url);    

    if (urlObj.pathname.includes('/api/')) {
        
        if (!urlObj.query.includes('iso=')) {
            res.writeHead(405, { 'content-type': 'Not Acceptable' });
            res.end('406 Entry Not Acceptable');
        }

        const dateObj = new Date(urlObj.query.replace('iso=', ''));

        switch (urlObj.pathname) {
            case '/api/parsetime':
                const obj1 = {
                    "hour": dateObj.getHours(),
                    "minute": dateObj.getMinutes(),
                    "second": dateObj.getSeconds()
                };

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(obj1));
            break;

            case '/api/unixtime':
                let obj2 = {
                    "unixtime": dateObj.getTime()
                };
                
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify(obj2));
            break;
    
            default:
                res.writeHead(405, { 'content-type': 'Not allowed' });
                res.end('405 Entry not allowed');
            break;
        }
    } else {
        res.writeHead(404, { 'content-type': 'Path not found' });
        res.end('404 Path not found');
    }
}).listen(port, () => {
    console.log(port)
});
