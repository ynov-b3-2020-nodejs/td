const http = require('http');
const port = process.argv[2];
const url = require('url');


function parseTime(time){
    return JSON.stringify({
        hour : time.getHours(),
        min : time.getMinutes(),
        sec : time.getSeconds()
    })
}

function unixTime(time){
    return  JSON.stringify({
        unixtime : time.getTime(),
    })
}

const server = http.createServer(function (req, res) {
    const parseUrl = url.parse(req.url, true);
    console.log(parseUrl)
    if(parseUrl.pathname === '/api/parsetime'){
        res.writeHead(200);
        res.end(parseTime(new Date(parseUrl.query.iso)));
    }else if(parseUrl.pathname === '/api/unixtime'){
        res.writeHead(200);
        res.end(unixTime(new Date(parseUrl.query.iso)));
    }else{
        res.writeHead(404);
        res.end('not found');
    }
});
server.listen(port);
