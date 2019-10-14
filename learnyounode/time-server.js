const port = process.argv[2];
const net = require('net');

function addZero(nb) {
    if (nb < 10) {
        nb = '0' + nb;
    }
    return nb;
}

const server = net.createServer(function(socket) {
    const date = new Date();
    const result = date.getFullYear() +
    '-' + addZero(date.getMonth() + 1) +
    '-' + addZero(date.getDate()) +
    ' ' + addZero(date.getHours()) +
    ':' + addZero(date.getMinutes()) + '\n';
    socket.end(result);
});
server.listen(port);
