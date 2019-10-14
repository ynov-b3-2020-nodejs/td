const http = require('http');
const port = process.argv[2];

const nodeServer = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, 'http://localhost/');
    const date = new Date(parsedUrl.searchParams.get('iso'));

    switch (parsedUrl.pathname) {

        case '/api/parsetime' :
            res.writeHead(200, {'Content-Type': 'application/json'});

            res.write(JSON.stringify({
                hour: date.getHours(),
                minute: date.getMinutes(),
                second: date.getSeconds()
            }));
            res.end();
            break;
        case '/api/unixtime' :
            res.writeHead(200, {'Content-Type': 'application/json'});

            res.write(JSON.stringify({
                unixtime: date.getTime()
            }));
            res.end();
            break;
        default :
            res.writeHead(404);

            res.write('Vous vous êtes trompé de lien, c\'est dommage');
            res.end();
    }

}).listen(port);
