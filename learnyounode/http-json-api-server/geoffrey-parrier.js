
const http = require('http');

const port = process.argv[2];

http.createServer((req, res) => {

    const parsedUrl = new URL(req.url, 'http://localhost/');

    const date = new Date(parsedUrl.searchParams.get('iso'));

    res.writeHead(200, {'Content-type': 'application/JSON'});

    switch (parsedUrl.pathname) {
        case '/api/parsetime':
            res.write(JSON.stringify({
                hour: date.getHours(),
                minute: date.getMinutes(),
                second: date.getSeconds()
            }));
            res.end();
            break;

        case '/api/unixtime':
            res.write(JSON.stringify({
                unixtime: date.getTime()
            }));
            res.end();
            break;

        default:
            res.writeHead(404, '404 page not found');
            res.end();
            break;
    }

}).listen(port);
