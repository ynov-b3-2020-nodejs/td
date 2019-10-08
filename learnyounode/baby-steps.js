
const [node, path, ...argsToSum] = process.argv


const sum = (first, second) => first + second;

const result = argsToSum.map(parseInt).reduce(sum, 0)

console.log(result);
