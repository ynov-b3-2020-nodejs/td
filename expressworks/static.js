const express = require('express');
const app = express();
const port = process.argv[2];

app.use(express.static(process.argv[3]));

app.listen(port);
