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
  return new Promise ((res, rej) => {
    fs.readFile(path,'utf8', (err, data)=> {
    if(err) rej(err)
    else res(JSON.parse(data))
    })
  })
}

let result;

function matchParentsWithChildren(parentFileName, childrenFileName) {
// your code here... (p.s. readFilePromise function(s) should be around here..)
  readFilePromise('./parents.json')
  .then( data1 => {
    result = data1;
    return readFilePromise('./children.json')
  })
  // sleep(5000);
  .then( data2 => {
    for (let i = 0; i < result.length; i++) {
      result[i].children = [];
      for (let j = 0; j < data2.length; j++) {
        if (result[i].last_name === data2[j].family) {
          result[i].children.push(data2[j].full_name);
        }
      }
    }
    console.log(result);
  })
  .catch((err)=> {
    console.log(err);
  })
}

matchParentsWithChildren('./parents.json', './children.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildren('./parents.json', './not_a_real_file.json');
matchParentsWithChildren('./not_a_real_file.json', './also_not_a_real_file.json');
