const fsPromises = require('fs').promises

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
  return new Promise((res,rej)=>{
    fsPromises.readFile(file,'utf-8')
    .then(result=>{
      res(JSON.parse(result))
    })
    .catch(err=>{
      rej(err)
    })
  })
 
}

function matchParentsWithChildren(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  readFilePromise(parentFileName)
  .then(data=>{
      readFilePromise(childrenFileName)
      .then(dataAnak=>{
        for (let i = 0; i < data.length; i++) {
          data[i].children=[]
          for (let j = 0; j < dataAnak.length; j++) {
            if(data[i].last_name==dataAnak[j].family){
              data[i].children.push(dataAnak[j].full_name)
            }
          }
        }
        console.log(data)
      })
      .catch(err=>{
        console.log(err)
      })
  })
  .catch(err=>{
    console.log(err)
  })
}

matchParentsWithChildren('./parents.json', './children.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildren('./parents.json', './not_a_real_file.json');
matchParentsWithChildren('./not_a_real_file.json', './also_not_a_real_file.json');