const http = require('http');
const url = require('url');

const date = {
    "/api/parsetime": function(parsedUrl) {
        const d = new Date(parsedUrl.query.iso);
        return {   // on recupère la date ci-dessous
            hour: d.getHours(),
            minute: d.getMinutes(),
            second: d.getSeconds()
        };
    },
    "/api/unixtime": function(parsedUrl) {return {unixtime: (new Date(parsedUrl.query.iso)).getTime()};
    }
}

server = http.createServer(function(request, reponse) {
    const parsedUrl = url.parse(request.url, true);
    const ressource = date[parsedUrl.pathname];
    // If qui permet de vérifier si on a bien les données souhaité
    if (ressource) {
       // On affiche a la fin au format JSON la date avec les heures, les minutes et les secondes.
        reponse.writeHead(200, {"Content-Type": "application/json"});
        reponse.end(JSON.stringify(ressource(parsedUrl)));
    }
    else {
        // Au cas ou on ne récupère rien.
        // avec l'erreur 404
        reponse.writeHead(404);
        reponse.end();
    }
});// Le serveur est donc lancé sur le port souhaité
server.listen(process.argv[2]);
