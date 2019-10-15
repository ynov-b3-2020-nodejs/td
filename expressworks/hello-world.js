const express = require('express');
const port = process.argv[2];
const app = express();

app.get('/home', function(req, res) {
  res.end('Bonjour, monde !')
});
app.listen(port);
