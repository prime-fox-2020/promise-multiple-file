const fs = require('fs');

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
  return new Promise((res, rej) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if(err) rej(err)
      else res (JSON.parse(data))
    })
  })
}

function matchParentsWithChildren(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  let parents = []
  readFilePromise(parentFileName)
  .then(parentName => {
    parents = parentName
    console.log(parentName)
    return readFilePromise(childrenFileName)
  })
  .then(childrenName => {
    console.log(childrenName)
    for(let parent of parents){
      parent.children = [];
      for(let children of childrenName){
        if(children.family === parent.last_name) parent.children.push(children.full_name);
      }
    }
    sleep(3000)
    console.log(parents)
  })
  .catch(err => console.log(err))
}

matchParentsWithChildren('./parents.json', './children.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildren('./parents.json', './not_a_real_file.json');
matchParentsWithChildren('./not_a_real_file.json', './also_not_a_real_file.json');