const fs = require('fs');

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function readFilePromise(fileName) {
  return new Promise((res, rej) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) {
        rej(err);
      } else {
        res(data);
      }
    })
  })
}

function matchParentsWithChildren(parentFileName, childrenFileName) {
  let parent, children;
  readFilePromise(parentFileName)
    .then(data => {
      parent = JSON.parse(data);
      sleep(5000);
      return readFilePromise(childrenFileName);
    })
    .then(data => {
      children = JSON.parse(data);
      sleep(5000);
      for (let i = 0; i < parent.length; i++) {
        parent[i].children = [];
        for (let j = 0; j < children.length; j++) {
          if (parent[i].last_name === children[j].family) {
            parent[i].children.push(children[j].full_name);
          }
        }
      }
      console.log(parent);
    })
    .catch(err => console.log(err));
}

matchParentsWithChildren('./parents.json', './children.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildren('./parents.json', './not_a_real_file.json');
matchParentsWithChildren('./not_a_real_file.json', './also_not_a_real_file.json');