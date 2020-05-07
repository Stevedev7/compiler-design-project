const { rules, parsetable } = require('../constants');
const exit = require('../exit');
//Parsing Code
module.exports = (tokenString, newLine) => {
  tokenString += '$';

  let stack = ['$', '0'];

  let ip = 0;
  while(true){
    let pivot = parsetable[stack[stack.length - 1]][tokenString[ip]];

    if(pivot[0] === 'S'){
      stack.push(tokenString[ip++]);
      stack.push(...pivot.slice(1));
      continue;
    } else if(pivot[0] === 'R'){
      rule = rules[pivot.slice(1)];
      for (let i = 0; i < rule[1].length * 2; i++) {
        stack.pop();
      }
      stack.push(...rule[0]);
      let newPivot = parsetable[stack[stack.length - 2]][stack[stack.length - 1]];
      if(newPivot !== 'E'){
        stack.push(...newPivot);
        continue;
      } else{
        break;
      }
    } else if (pivot[0] === 'A') {
      console.log('Parsing Completed Successfully');
      process.exit();
    } else{
      break;
    }
  }
  let lineCount = 1;

  for (var i = 0; i < ip; i++) {
    if (tokenString[i] === newLine) {
      lineCount++;
    }
  }
  exit(`Parsing error at line ${lineCount}...`);
}
