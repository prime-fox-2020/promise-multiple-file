const fs = require('fs');

let parent;
// let child;
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function readFilePromise(path) {
  return new Promise((res, rej)=>{
    fs.readFile(path, 'utf8', (err, data)=>{
      if(err) rej(err)

      else
      res(JSON.parse(data))
    })
  })
}

function matchParentsWithChildren(parentFileName, childrenFileName) {
  readFilePromise(parentFileName)
  .then( data=>{
    parent = data
    return readFilePromise(childrenFileName)
  })
  .then(data2 =>{
    sleep(1000)
    for(let a = 0; a < parent.length; a++){
      parent[a].children = []
      for(let b = 0; b < data2.length; b++){
        if(parent[a].last_name == data2[b].family){
          parent[a].children.push(data2[b].full_name)
        }
      }
    }
    console.table(parent)
  })
  .catch(err =>{
    console.log('sumtin wong')
  })
  // your code here... (p.s. readFilePromise function(s) should be around here..)
}

matchParentsWithChildren('./parents.json', './children.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildren('./parents.json', './not_a_real_file.json');
matchParentsWithChildren('./not_a_real_file.json', './also_not_a_real_file.json');