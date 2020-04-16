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

  return new Promise((res, rej) => {
    fs.readFile(path, 'utf8', (err,data) => {
      if(err){
        rej(err)
      }else{
        res(JSON.parse(data))
        sleep(1000)
      }
    })
  })
}

function matchParentsWithChildren(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)

  let parent_Data = []
  let children_Data = []
  
  readFilePromise(parentFileName)
  .then( data1 => {
    parent_Data = data1
    return readFilePromise(childrenFileName)
  })
  .then( data2 => {
    children_Data = data2
    // console.log(parent_Data)
    // console.log(children_Data)
    for (let i = 0; i < parent_Data.length; i++) {
      parent_Data[i].family = []
      for (let j = 0; j < children_Data.length; j++) {
        if (parent_Data[i].last_name == children_Data[j].family) {
          parent_Data[i].family.push(children_Data[j].full_name)
        }
      }
    }
    console.log(parent_Data)
  })
  .catch( error => {
    console.log(`Error nih karena :\n`, error);
    console.log("-------------------------------------------------");
  })
}

matchParentsWithChildren('./parents.json', './children.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildren('./parents.json', './not_a_real_file.json');
matchParentsWithChildren('./not_a_real_file.json', './also_not_a_real_file.json');