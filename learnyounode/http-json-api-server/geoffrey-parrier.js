
const http = require('http');

const port = process.argv[2];

http.createServer((req, res) => {

    const parsedUrl = new URL(req.url, 'http://localhost/');
    const date = new Date(parsedUrl.searchParams.get('iso'));

    res.writeHead(200, {'Content-type': 'application/JSON'});

    if (req.url.match('/api/parsetime')) {
        res.write(JSON.stringify({
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds()
        }));

    } else if (req.url.match('/api/unixtime')) {
        res.write(JSON.stringify({
            unixtime: date.getTime()
        }));
    }
    res.end();
}).listen(port);
