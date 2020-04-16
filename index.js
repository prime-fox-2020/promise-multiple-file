const fs = require('fs').promises

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}


function readFilePromise(path) {
  return new Promise( (resolve, reject) => {
    fs.readFile(path, 'utf8')
    .then(data => {
      resolve(JSON.parse(data));
    })
    .catch(err => {
      reject(err);
    })
  })
}

let result = null;

function matchParentsWithChildren(parentFileName, childrenFileName) {
  sleep(3000);
  readFilePromise(parentFileName)
  .then(dataParents => {
    result = dataParents;
    return readFilePromise(childrenFileName);
  }) 
  .then (dataChildren => {
    result.forEach(parents => {
      parents.children = [];
      dataChildren.forEach(children => {
          if(parents.last_name === children.family){
            parents.children.push(children.full_name);
          }
      });
    });
    console.log(result);
  })
  .catch (err => {
    console.log(`Wrong path (${err.path})`);
  })
}

matchParentsWithChildren('./parents.json', './children.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildren('./parents.json', './not_a_real_file.json');
matchParentsWithChildren('./not_a_real_file.json', './also_not_a_real_file.json');