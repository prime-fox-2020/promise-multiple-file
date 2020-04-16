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
  return new Promise ((resolve,reject) => {
    fsPromises.readFile(path, 'utf8')
    .then( data => {
      resolve (JSON.parse(data))
    })
    .catch( err => {
      reject(err)
    })
  })
}

function matchParentsWithChildren(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  let parents = null
  readFilePromise(parentFileName)
    .then (dataParents => {
      parents = dataParents
      return readFilePromise(childrenFileName)
    })
    .then(dataChildrens => {
      sleep(5000)
      for (let i = 0; i < parents.length; i++) {
        parents[i].children = []
        for (let j = 0; j < dataChildrens.length; j++) {
          if (parents[i].last_name === dataChildrens[j].family) {
            parents[i].children.push(dataChildrens[j].full_name)
          }
        }
      }
      console.log(parents)
    })
    .catch((err) => {
      console.log(err);
    })
}

matchParentsWithChildren('./parents.json', './children.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildren('./parents.json', './not_a_real_file.json');
// matchParentsWithChildren('./not_a_real_file.json', './also_not_a_real_file.json');