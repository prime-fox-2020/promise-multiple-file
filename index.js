const fs = require('fs');
const fsPromises = fs.promises

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function readFilePromise(path) {
  // psst, the promise should be around here...
  return new Promise ((reso, reje) => {
    fsPromises.readFile(path, 'utf8')
    .then(data => reso(JSON.parse(data)))
    .catch( err => reje(err))
  })
}

function matchParentsWithChildren(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  let buffer
  readFilePromise(parentFileName)
    .then(data => {
      buffer = data
      return readFilePromise(childrenFileName)
    })
    .then(data => {
      for(let i = 0; i < buffer.length; i++){
        for(let j = 0; j < data.length; j++){
          if(data[j].family === buffer[i].last_name){
            if(buffer[i].children === undefined){
              buffer[i].children = []
              buffer[i].children.push(data[j].full_name)
            }else{
              buffer[i].children.push(data[j].full_name)
            }
          }
        }
      }
      console.log(buffer)
    })
    .catch(err => {console.log(err)})
}

matchParentsWithChildren('./parents.json', './children.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildren('./parents.json', './not_a_real_file.json');
matchParentsWithChildren('./not_a_real_file.json', './also_not_a_real_file.json');