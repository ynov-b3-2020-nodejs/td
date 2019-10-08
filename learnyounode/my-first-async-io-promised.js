const fs = require('fs')
const [node, path, filePath] = process.argv;

fs.promises.readFile(filePath, 'utf8')
    .then((data) => {
        const fileToStrings = data.toString();

        const splitedLinesFile = fileToStrings.split('\n');
        
        const numberOfLines = splitedLinesFile.length - 1;
        
        console.log(numberOfLines);
    })
    .catch(console.error);
