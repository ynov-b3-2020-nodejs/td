const http = require('http');
const url = require('url');
[node, me, port] = process.argv;

function parseTime(time) {
    return JSON.stringify({
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds()
    })
}

function getTimeStamp(time) {
    return JSON.stringify({
        unixtime: time.getTime()
    })
}

const server = http.createServer((req, res) => {
    const myUrl = new URL(req.url, 'http://example.com');
    const date = myUrl.searchParams.get('iso');

    if (myUrl.pathname === '/api/parsetime') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(parseTime(new Date(date)));
    } else if (myUrl.pathname === '/api/unixtime'){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(getTimeStamp(new Date(date))) ;
    } else{
        res.writeHead(404);
    }
});
server.listen(port);

