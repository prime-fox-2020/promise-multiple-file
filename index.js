const fs = require('fs');
const fsPromises = fs.promises;

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function readFilePromise(path) {
  return new Promise((resolve, reject) =>{
    fsPromises.readFile(path, 'utf8')
    .then(data => {
      resolve(JSON.parse(data));
    })
    .catch(err => reject(err))
  })
}

function matchParentsWithChildren(parentFileName, childrenFileName) {
  let dataParent;
  let dataChildren;
  readFilePromise(parentFileName)
  .then(data => dataParent = data)
  .then(() => readFilePromise(childrenFileName)) // Tidak mau di {banyak operasi}
  .then(data => dataChildren = data)
  .then(() => {
    for (let parent of dataParent) { // Mau di {banyak operasi}
      parent.childrens = [];
      for (let children of dataChildren) {
        if (children.family == parent.last_name)
          parent.childrens.push(children);
      }
    }
  })
  .then(() => console.log(dataParent))
  .catch(err => console.log('Error membaca data\n', err));
}

console.log("Notification : Data sedang diproses !");
matchParentsWithChildren('./parents.json', './children.json');

// for Release 2
matchParentsWithChildren('./parents.json', './not_a_real_file.json');
matchParentsWithChildren('./not_a_real_file.json', './also_not_a_real_file.json');