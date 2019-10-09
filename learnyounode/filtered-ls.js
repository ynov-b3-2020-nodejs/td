const {readdir} = require('fs');
const {extname} = require('path');
const path = process.argv[2];
const ext = process.argv[3];

readdir(path, (err, list) => {
    if (err) {
        return console.error(err);
    }
    const filtered = list.filter(
        (fileName) => extname(fileName) === `.${ext}`
    );
    
    console.log(filtered.join("\n"));
});
