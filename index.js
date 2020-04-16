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
  // psst, the promise should be around here...
  return new Promise((res, rej)=> {
    fs.readFile(path, 'utf8', (err, data) => {
      sleep(2000)
      if (err) {
        rej(err)
      } else {
        res(JSON.parse(data))
      }
    })
  })
}



function matchParentsWithChildren(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  readFilePromise(parentFileName)
  .then(parents_data => {
    return readFilePromise(childrenFileName)
    .then(childsdata => {
      for (let i = 0; i < parents_data.length; i++) {
        parents_data[i].children = []
      }
      for (let i = 0; i < parents_data.length; i++) {
        for (let j = 0; j < childsdata.length; j++) {
          if (parents_data[i].last_name === childsdata[j].family) {
            parents_data[i].children.push(childsdata[j].full_name)
          }
        }
      }
      console.log(parents_data)
    })
    .catch(error => {
      console.log('Ini Error 2 = \n',  error);
    })
  })
  .catch(error => {
    console.log('Ini Error 1 = \n',  error);
  })
  
  
  
}


matchParentsWithChildren('./parents.json', './children.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildren('./parents.json', './not_a_real_file.json');
matchParentsWithChildren('./not_a_real_file.json', './also_not_a_real_file.json');