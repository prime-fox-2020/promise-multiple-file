const fs = require('fs');

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function readFilePromise(file) {
  // psst, the promise should be around here...
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        console.log('\n=====================')
        console.log('   INCORRECT FILE   ')
        console.log('=====================\n')
        reject(err)
      }else{
        let result = JSON.parse(data)
        resolve(result)
      }
    })
  })
}

function matchParentsWithChildren(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  sleep(3000)
  let globalParent  
  let globalChildren
  //promise can't call its previous variable except the return(s) ? true : false
  readFilePromise(parentFileName)
  .then(parseParent => {
    globalParent = parseParent
    return new readFilePromise(childrenFileName)
  })
  .then(parseChildren => {
    globalChildren = parseChildren
    for (let i = 0; i < globalParent.length; i++) {
      globalParent[i].childrens = []
      for (let j = 0; j < globalChildren.length; j++) {
        if (globalParent[i].last_name == globalChildren[j].family) {
          globalParent[i].childrens.push(globalChildren[j].full_name)
        }
      }
    }
    console.log(globalParent)
  })
  .catch( error => {
    console.log(error, '\n\nERROR BRO COBA CEK INPUTNYA LAGI KARENA KODINGAN GUE MUSTAHIL SALAH\n')
  })
}

matchParentsWithChildren('./parents.json', './chilren.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildren('./parents.json', './not_a_real_file.json');
// matchParentsWithChildren('./not_a_real_file.json', './also_not_a_real_file.json');