const http = require('http');
const [node, path, port] = process.argv;

const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, 'http://localhost/');
    const iso = parsedUrl.searchParams.get('iso');

    if (!iso) {
        res.writeHead(400);
        res.write('No ISO parameter specified.');
        return;
    }

    const date = new Date();

    if (!date) {
        res.writeHead(400);
        res.write('Bad date format.');
        return;
    }

    if (req.url.match('/api/parsetime')) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify({
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds(),
        }));
    } else if (req.url.match('/api/unixtime')) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify({
            unixtime: date.getTime()
        }));
    } else {
        res.writeHead(404);
        res.write('Not found.');
    }
    res.end();
}).listen(port);
