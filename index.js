const fs = require('fs');
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
    fs.readFile(file, 'utf8', (err, data) => {
      if (!err) {
        resolve(JSON.parse(data))
      } else {
        reject(err)
      }
    })
  })
}




function matchParentsWithChildren(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  let parents;
  readFilePromise(parentFileName)
    .then(parentData => {
        
        parents = parentData;
        return readFilePromise(childrenFileName)
     })
     .then(childrens => {
        for (let child of childrens) {
          parents.map((_, b) => {
            if (parents[b].last_name == child.family) {
              if (parents[b].childrens == undefined) {
                parents[b].childrens = []
                parents[b].childrens.push(child.full_name)
                console.log(`---> Processing ${child.full_name} into ${parents[b].last_name} family`)
                sleep(500)
              } else {
                parents[b].childrens.push(child.full_name)
                console.log(`---> Processing ${child.full_name} into ${parents[b].last_name} family`)
                sleep(500)
              }
            }
          })
        }

        console.table(parents)
      })
     .catch(error => {
       console.log(error)
     })

}

matchParentsWithChildren('./parents.json', './children.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildren('./parents.json', './not_a_real_file.json');
matchParentsWithChildren('./not_a_real_file.json', './also_not_a_real_file.json');