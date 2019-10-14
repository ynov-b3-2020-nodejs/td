const http = require('http');
const url = require('url');

const [_, __, port] = process.argv;

const server = http.createServer( function (req, res) {
    let urlObject = url.parse(req.url, true)

    res.writeHead(200);
    
    switch (urlObject.pathname) {
        case '/api/parsetime':
            res.end(getParseTime(urlObject));
            break;
        case '/api/unixtime':
            res.end(getUnixTime(urlObject));
            break;
        default:
            res.writeHead(404)
            res.end()
    }

});

const getParseTime = (urlObject) => {
    const { query } = urlObject;
    const date = new Date(query.iso);

    return JSON.stringify({
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds()
    })
};

const getUnixTime = (urlObject) => {
    const { query } = urlObject;
    const date = new Date(query.iso);

    return JSON.stringify({
        unixtime: date.getTime()
    })
}

server.listen(port);
