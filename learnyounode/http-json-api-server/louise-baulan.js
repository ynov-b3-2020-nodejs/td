'use strict';

const http = require('http');
const fs = require('fs');
const [bullshit, bullshit2, port] = process.argv;
const base = 'http://localhost/'; 

const pathParsetime = '/api/parsetime';
const pathUnixtime = '/api/unixtime';

http.createServer((request, response) => {
    const newUrl = new URL(request.url, base); 
    const urlDate = newUrl.searchParams.get('iso');
    const date = new Date(urlDate);

    if( urlDate.pathname === pathParsetime ) {
        console.log(JSON.stringify({
            hours: date.getHours(), 
            minutes: date.getMinutes(), 
            seconds: date.getSeconds(),
        }));
    } else if ( urlDate.pathname === pathUnixtime ) {
        console.log(JSON.stringify({
            unixtime: date.getTime()
        }));
    } else {
        response.writeHead(404, 'Page Not Found : Error 404');
        response.write('Nous avons perdu la page que vous demandez... RIP');
    }

}).listen(port);
