const fs = require('fs');
const fsPromises = fs.promises

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
  return new Promise ((resolve,reject) => {
    fsPromises.readFile(path, 'utf8')
    .then( data => {
      resolve (JSON.parse(data))
    })
    .catch( err => {
      reject(err)
    })
  })
}

function matchParentsWithChildren(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  let parents = null
  readFilePromise(parentFileName)
  .then(dataParents => {
    parents = dataParents
    //console.log('ini chl', childrenFileName)
    return readFilePromise(childrenFileName)
  })
  .then(dataChildren => {
    for(let i=0; i<parents.length; i++){
      parents[i].children = []

      for(let j=0; j<dataChildren.length; j++){
        if(parents[i].last_name === dataChildren[j].family){
          parents[i].children.push(dataChildren[j].full_name)
          
        }
      }
    }
    console.log(parents)
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

// function match_data(parent_file, children_file) {

//   fs.readFile(parent_file, null, (err,data) =>{
//     if(err) {
//       throw (err)
//     } else {

//       let parents = JSON.parse(data)

//       let children = fs.readFileSync(children_file, 'utf8')
//       let chil = JSON.parse(children)

//       for(let i=0; i<parents.length; i++){
//         parents[i].chil = []
//         for(let j=0; j<chil.length; j++) {
//           if(parents[i].last_name === chil[j].family){
//             parents[i].chil.push(chil[j].full_name)
//           }
//         }
//       }

//       console.log(parents)
//     }
    
//   })
// }
