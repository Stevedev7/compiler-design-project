//tokenizer code
const tokens = require('../constants').tokens;
const exit = require('../exit');
module.exports = programString =>{
  let ip = 0;

  programString += '$';
  let tokenSting = "";

  while(programString[ip] != '$'){
    let currentToken = '';
    if(programString[ip].match(/[a-zA-Z_]/)){
      currentToken += programString[ip];
      ip ++;
      while(programString[ip].match(/[0-9a-zA-Z_]/)){
        currentToken += programString[ip];
        ip ++;
      }
      if(tokens[currentToken]){
        tokenSting += tokens[currentToken];
      } else{
        tokenSting += tokens['var']
      }
    }else if (programString[ip].match(/[0-9]/)) {
      currentToken += programString[ip];
      ip ++;
      while(programString[ip].match(/[0-9]|\./)){
        currentToken += programString[ip];
        ip++;
      }
      tokenSting += tokens['num'];
    }else if (programString[ip].match(/=/)) {
      currentToken += programString[ip];
      ip ++;
      if(programString[ip].match(/=/)){
        currentToken += programString[ip];
        ip ++;
      }
      tokenSting += tokens[currentToken];
    }else if (programString[ip].match(/&/)) {
      currentToken += programString[ip];
      ip ++;
      if(programString[ip].match(/&/)){
        currentToken += programString[ip];
        ip ++;
      }
      tokenSting += tokens[currentToken];
    }else if (programString[ip].match(/\|/)) {
      currentToken += programString[ip];
      ip ++;
      if(programString[ip].match(/\|/)){
        currentToken += programString[ip];
        ip ++;
      }
      tokenSting += tokens[currentToken];
    } else if (programString[ip] == ('>' || '<')) {
      currentToken += programString[ip];
      ip ++;
      if(programString[ip].match(/=/)){
        currentToken += programString[ip];
        ip ++;
      }
      tokenSting += tokens[currentToken];
    } else{
      if(tokens[programString[ip]]){
        tokenSting += tokens[programString[ip]];
        ip ++;
      } else{
        var newLine = 1, pointerCount = 0;
        for(let i = 0; i < ip; i++){
          if(programString[i].match(/\n/)){
            newLine ++;
            pointerCount = 0;
          } else{
            pointerCount ++;
          }
        }
        exit(`Error on line ${newLine}:${pointerCount}`);
      }
    }
  }
  return tokenSting;
}
