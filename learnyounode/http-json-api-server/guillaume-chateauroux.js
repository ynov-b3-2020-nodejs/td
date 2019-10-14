const http = require('http');
const [node, path, port] = process.argv;

const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, 'http://localhost/');
    const iso = parsedUrl.searchParams.get('iso');

    if (!iso) {
        res.writeHead(400);
        res.write('No ISO parameter specified.');
        res.end();
    } else {
        const date = new Date(iso);

        if (!date) {
            res.writeHead(400);
            res.write('Bad date format.');
            res.end();
        } else {
            if (parsedUrl.pathname === '/api/parsetime') {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(JSON.stringify({
                    hour: date.getHours(),
                    minute: date.getMinutes(),
                    second: date.getSeconds(),
                }));
            } else if (parsedUrl.pathname === '/api/unixtime') {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(JSON.stringify({
                    unixtime: date.getTime()
                }));
            } else {
                res.writeHead(404);
                res.write('Not found.');
            }
            res.end();
        }
    }
}).listen(port);
