const tokens = require("./constants").tokens;

const fs = require('fs');
const [, , fileName] = process.argv;
const tokeniser = require('./tokeniser');


const exit = message =>{
  console.log(new Error(message));
  process.exit();
}

//Check for input fileName
fileName ? console.log(fileName) : exit('Compiler: No input file mentioned...\nUse Syntax ./compiler <filename> or python3 compiler <filename>');

const program = fs.readFileSync(fileName, 'utf-8');

console.log(program);

//Tokenise
const tokenString = tokeniser(program);
console.log(tokenString);


// parsig
