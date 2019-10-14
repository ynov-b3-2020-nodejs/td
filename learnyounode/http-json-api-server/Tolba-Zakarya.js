const port = process.argv[2];
const http = require('http');

const server = http.createServer((function(req, res) {
    const parsedUrl = new URL(req.url, 'http://localhost/');
    const d = new Date(parsedUrl.searchParams.get('iso'));

    res.writeHead(200, {'Content-type': 'application/JSON'});

    if(req.url.match('api/parsetime')) {
        res.write(JSON.stringify({
            hour: d.getHours(),
            minute: d.getMinutes(),
            second: d.getSeconds()
        }));
        res.end();
    } else if (req.url.match('api/unixtime')) {
        res.write(JSON.stringify({
            unixtime: d.getTime()
        }));
        res.end();
    } else {
        res.writeHead(404, "Error: Not Found");
    }
}));
server.listen(port);
