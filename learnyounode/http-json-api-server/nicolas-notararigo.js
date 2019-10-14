const http = require('http');
const port = process.argv[2];

const server = http.createServer((req, res) => {
    const parseUrl = new URL(req.url, 'http://localhost/');
    const time = new Date(parseUrl.searchParams.get('iso'));
    let result;

    if (parseUrl.pathname === '/api/unixtime') {
        result = {
            "unixtime": time.getTime()
        };
    }else if (parseUrl.pathname === '/api/parsetime'){
        result = {
            "hour": time.getHours(),
            "minute": time.getMinutes(),
            "second": time.getSeconds()
        };
    }

    if(result){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
    }else{
        res.writeHead(404, "Bad URL");
        res.end();
    }

});

server.listen(port);
