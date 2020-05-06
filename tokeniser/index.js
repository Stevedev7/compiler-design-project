//tokenizer code
const tokens = require("../constants").tokens;
const exit = require("../exit");
module.exports = (programString) => {
  let ip = 0;

  programString += "$";
  let tokenSting = "";

  while (programString[ip] != "$") {
    let currentToken = "";
    if (programString[ip].match(/[a-zA-Z_]/)) {
      currentToken += programString[ip];
      ip++;
      while (programString[ip].match(/[0-9a-zA-Z_]/)) {
        currentToken += programString[ip];
        ip++;
      }
      if (currentToken in tokens) {
        tokenSting += tokens[currentToken];
      } else {
        tokenSting += tokens["var"];
      }
    } else if (programString[ip].match(/[0-9]/)) {
      currentToken += programString[ip];
      ip++;
      while (programString[ip].match(/[0-9]|\./)) {
        currentToken += programString[ip];
        ip++;
      }
      tokenSting += tokens["num"];
    } else {
      let [first, second] = programString.slice(ip);
      if (first + second in tokens) {
        tokenSting += tokens[first + second];
        ip += 2;
      } else if (first in tokens) {
        tokenSting += tokens[first];
        ip += 1;
      } else {
        var newLine = 1,
          pointerCount = 0;
        for (let i = 0; i < ip; i++) {
          if (programString[i].match(/\n/)) {
            newLine++;
            pointerCount = 0;
          } else {
            pointerCount++;
          }
        }
        exit(`Error on line ${newLine}:${pointerCount}`);
      }
    }
  }
  return tokenSting;
};
