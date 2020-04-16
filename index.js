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
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

function matchParentsWithChildren(parentFileName, childrenFileName) {
  let parents, children
  readFilePromise(parentFileName)
    .then(data => {
      parents = JSON.parse(data)
      // console.log(parents)
      sleep(5000);
      return readFilePromise(childrenFileName)
    })
    .then(data => {
      children = JSON.parse(data)
      sleep(5000);
      parents.forEach(parent => {
        parent.children = children.filter(child => child.family === parent.last_name).map(child => child.full_name)
      })
      console.log(parents)
    })
    .catch(err => console.log(err))
}

matchParentsWithChildren('./parents.json', './children.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildren('./parents.json', './not_a_real_file.json');
matchParentsWithChildren('./not_a_real_file.json', './also_not_a_real_file.json');