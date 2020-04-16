const fs = require('fs');
const fsPromise = fs.promises

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
  return new Promise((res,rej) => {
    setTimeout(() => {
      fsPromise.readFile(path,'utf-8')
      .then(data=>{
        res(JSON.parse(data))
      })
      .catch(err=>{
        rej(err)
      })
    }, 2000);
  }) 
  return fsPromise.readFile(path, 'utf-8')
}

function matchParentsWithChildren(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  let dataParent = []
  readFilePromise(parentFileName)
  .then(data => {
    for(let i = 0; i<data.length; i++){
      dataParent.push(data[i])
    }
    // dataParent = data
    return readFilePromise(childrenFileName)
  })
  .then(data2 => {
     for (let i = 0; i<dataParent.length; i++){
       dataParent[i].children = []
       for(let j = 0; j<data2.length; j++){
         if(dataParent[i].last_name === data2[j].family){
           dataParent[i].children.push(data2[j].full_name)
         }
       }
     }
     console.log(dataParent)
  })
  .catch(err=>{
    console.log(err)
  })
}

matchParentsWithChildren('./parents.json', './children.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildren('./parents.json', './not_a_real_file.json');
// matchParentsWithChildren('./not_a_real_file.json', './also_not_a_real_file.json');