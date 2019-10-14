
const http = require('http');
const url = require('url');
const port = process.argv[2];

const parse = {
    "/api/parsetime": function(parsedUrl) {
        d = new Date(parsedUrl.query.iso);
        return {
            hour: d.getHours(),
            minute: d.getMinutes(),
            second: d.getSeconds()
        };
    },
    "/api/unixtime": function(parsedUrl) {
        return {unixtime: (new Date(parsedUrl.query.iso)).getTime()};
    }
}

server = http.createServer(function(request, response) {
    parsedUrl = url.parse(request.url, true);
    resource = parse[parsedUrl.pathname];
    if (resource) {
        response.writeHead(200, {"Content-Type": "application/json"});
        response.end(JSON.stringify(resource(parsedUrl)));
    }
    else {
        response.writeHead(404, "page not found");
        response.end();
    }
});
server.listen(port);
