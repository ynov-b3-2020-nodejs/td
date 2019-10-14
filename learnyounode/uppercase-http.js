const http = require('http');
const map = require('through2-map');
const port = process.argv[2];


const changeUpperCase = map({wantStrings: true}, function (str) {
    return str.toUpperCase();
});

const server = http.createServer( function (req, res) {
    if(req.method !== 'POST'){
        res.writeHead(400);
    }
    req.pipe(changeUpperCase).pipe(res);
});
server.listen(port);
