const port = process.argv[2];
const path = process.argv[3];
const fs = require('fs');
const http = require('http');

const server = http.createServer(function (request, response) {
  const stream = fs.createReadStream(path);
  stream.pipe(response);
});

server.listen(port);
