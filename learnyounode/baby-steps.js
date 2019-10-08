const [node, path, ...params] = process.argv;
console.log(params.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue), 0));
