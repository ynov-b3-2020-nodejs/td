const port = process.argv[2];
const http = require('http');
const url = require('url');

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
    }
};

const server = http.createServer(function (request, response) {
    if (request.method === 'GET') {
        response.writeHead(200, {'Content-Type': 'application/json'});
        const myUrl = url.parse(request.url, true);
        response.end(JSON.stringify(parseQuery(myUrl)))
    } else {
        response.writeHead(405);
        response.end()
    }
});
server.listen(port);
