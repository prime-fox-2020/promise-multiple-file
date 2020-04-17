const fsPromise = require('fs').promises


function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function readFilePromise(data) {
  // psst, the promise should be around here...
  return new Promise((resolve,reject)=>{

    fsPromise.readFile(data,'utf8')

    .then(res=>{
      resolve(JSON.parse(res))
    })
    .catch(err=>{
      reject(err)
    })

  })
}

function matchParentsWithChildren(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  readFilePromise(parentFileName)
  .then(dataParent=>{

      readFilePromise(childrenFileName)
      .then(dataChild=>{

        for (let i = 0; i < dataParent.length; i++) {
          for (let j = 0; j < dataChild.length; j++) {
            if(dataChild[j].family == dataParent[i].last_name){
              if(dataParent[i].children == undefined){
                dataParent[i].children =[];
                dataParent[i].children.push(dataChild[j].full_name)
              }else{
                dataParent[i].children.push(dataChild[j].full_name)
              }
            }
          }
        }
        
        console.log(dataParent)
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

// // for Release 2
// matchParentsWithChildren('./parents.json', './not_a_real_file.json');
// matchParentsWithChildren('./not_a_real_file.json', './also_not_a_real_file.json');