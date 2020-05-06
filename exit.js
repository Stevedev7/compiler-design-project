//Function to Display error message and exit
module.exports= message =>{
  console.log(new Error(message));
  process.exit();
}
