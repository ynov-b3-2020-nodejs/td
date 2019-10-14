const port = process.argv[2];
const path = '/api/parsetime';
const http = require('http');
let url = require('url');

function parseTime(time) {
    return {
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds()
    }
}

function unixTime(time) {
    return {
        unixtime: time.getTime()
    }
}

let parseQuery = function (url) {
    switch (url.pathname) {
        case '/api/parsetime':
            return parseTime(new Date(url.query.iso));
        case '/api/unixtime':
            return unixTime(new Date(url.query.iso));
        default:
            return 'Rentrez une bonne url'
    }
};

http.createServer(function (request, response) {
    if (request.method === 'GET') {
        response.writeHead(200, {'Content-Type': 'application/json'});
        url = url.parse(request.url, true);
        response.end(JSON.stringify(parseQuery(url)))
    } else {
        response.writeHead(405);
        response.end()
    }
}).listen(+port, function () {
    console.log('Serveur en écoute sur http://localhost:%s', port)
});
