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
  return new Promise ((res, rej) =>{
    fs.readFile(file, 'utf8', (err,data)=>{
      if (err) rej(err)
      else res(JSON.parse(data))
    })
  })
}

function matchParentsWithChildren(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  let parentData = ''
  readFilePromise(parentFileName)

  .then((dataP)=>{
    parentData = dataP
    return readFilePromise(childrenFileName)
  })
  .then((dataC)=>{

    for (i = 0; i <parentData.length;i++){
      for (j = 0; j<dataC.length;j++){
        if(!parentData[i].children){
          parentData[i].children = []
        }
        if(parentData[i].last_name == dataC[j].family){
          parentData[i].children.push(dataC[j].full_name)
        }
      }
    }
    console.log(parentData);
  })
  .catch((err) =>{
    console.log(err);
  })
};

matchParentsWithChildren('./parents.json', './children.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildren('./parents.json', './not_a_real_file.json');
// matchParentsWithChildren('./not_a_real_file.json', './also_not_a_real_file.json');