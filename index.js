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
    fs.readFile(path,'utf8', (err, data) => {
      if(err) {
        rej(err)
      } else {
        res(JSON.parse(data))
      }
    })
  })
}

function matchParentsWithChildren(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  let parents
  readFilePromise(parentFileName)
  .then(data => {
    sleep(5000)
    parents = data
    return readFilePromise(childrenFileName)
  })
  .then(data => {
    sleep(5000)
    for(let i = 0; i < parents.length; i++) {
      parents[i].childs = []
      for(let j = 0; j < data.length; j++) {
        if(data[j].family == parents[i].last_name) {
          parents[i].childs.push(data[j].full_name)
        }
      }
    }
    console.log(parents)
  })
  .catch(err => {
    console.log(err)
  })
}

matchParentsWithChildren('./parents.json', './children.json');
console.log("Notification : Data sedang diproses !");

// // for Release 2
// matchParentsWithChildren('./parents.json', './not_a_real_file.json');
// matchParentsWithChildren('./not_a_real_file.json', './also_not_a_real_file.json');