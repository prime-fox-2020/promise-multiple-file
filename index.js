const fsPromises = require('fs').promises;

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
    fsPromises.readFile(path, 'utf8')
    .then( data => {
      resolve(JSON.parse(data))
    })
    .catch( err => {
      reject(err)
    })
  })
}

function matchParentsWithChildren(parentFileName, childrenFileName) {
  let result
  readFilePromise(parentFileName)
  .then( dataParents => {
    result = dataParents
    return readFilePromise(childrenFileName)
  }) 
  .then ( dataChildren => {
    for(let i = 0; i < result.length; i++){
      result[i].children = []
      for(let j = 0; j < dataChildren.length; j++){
        if(result[i].last_name === dataChildren[j].family){
          result[i].children.push(dataChildren[j].full_name)
        }
      }
    }
    console.log(result)
  })
  .catch ( (err) => {
    console.log(err)
  })
}

matchParentsWithChildren('./parents.json', './children.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildren('./parents.json', './not_a_real_file.json');
matchParentsWithChildren('./not_a_real_file.json', './also_not_a_real_file.json');
