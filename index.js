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
  return new Promise((res, rej) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) rej(err);
      else res(JSON.parse(data));
    })
  });
  // psst, the promise should be around here...
}

let newParent = null;
function matchParentsWithChildren(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  readFilePromise(parentFileName)
  .then(parent => {
    newParent = parent;
    return readFilePromise(childrenFileName)
  })
  .then(children => {
    for (let i in newParent) {
      for (let j in children) {
        if (children[j].family == newParent[i].last_name) {
          if (!newParent[i]['children']) newParent[i]['children'] = [children[j].full_name];
          else newParent[i]['children'].push(children[j].full_name);
        }
      }
    }
    sleep(5000);
    console.log(newParent);
  })
  .catch(err => {
    console.log(err);
  })
}

matchParentsWithChildren('./parents.json', './children.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
newParent = null
matchParentsWithChildren('./parents.json', './not_a_real_file.json');
newParent = null
matchParentsWithChildren('./not_a_real_file.json', './also_not_a_real_file.json');
