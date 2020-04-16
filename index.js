const fs = require('fs');
const promises = fs.promises;

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
  return new Promise ((res, rej) => {
    promises.readFile(path, 'utf8')
    .then (data => {
      res(JSON.parse(data))
    })
    .catch (err => {
      rej(err)
    })
  })
}


let result;
function matchParentsWithChildren(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  readFilePromise(parentFileName)
  .then(parentsData => {
    result = parentsData
    return readFilePromise(childrenFileName)
  })
  .then (childrenData => {
    for (let i = 0; i < result.length; i++) {
      result[i].children = []
      for (let j = 0; j < childrenData.length; j++) {
        if (result[i].last_name == childrenData[j].family) {
          result[i].children.push(childrenData[j].full_name)
        }
      }
    }
    console.log(result)
  })
  .catch((err) => {
    console.log(err)
  })
}

matchParentsWithChildren('./parents.json', './children.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildren('./parents.json', './not_a_real_file.json');
matchParentsWithChildren('./not_a_real_file.json', './also_not_a_real_file.json');