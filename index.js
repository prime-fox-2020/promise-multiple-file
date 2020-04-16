const fs = require('fs');

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function readFilePromise(path1) {
  // psst, the promise should be around here...
  return new Promise((res,rej)=>{
    fs.readFile(path1, 'utf8', (err1,data1)=>{
      if(err1){
        rej(err1)
      }else{
        res(JSON.parse(data1))
        
       
        
      }
      
    })
  })

}

function matchParentsWithChildren(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
let kotak = []
 readFilePromise(parentFileName)
.then(data1=>{
 for(var i = 0; i < data1.length; i++){
  kotak.push(data1[i])
 }

  return readFilePromise(childrenFileName)
})
.then(anak=>{
  for(var i = 0; i < kotak.length; i++){
    kotak[i].children = [];
    for(var j = 0; j < anak.length; j++){
      if(kotak[i].last_name === anak[j].family){
        kotak[i].children.push(anak[j].full_name)
      }
    }
   
  }
  console.log(kotak)
})
.catch(error1=>{
  console.log(error1)
 })

}

// matchParentsWithChildren('./parents.json', './children.json');

// console.log("Notification : Data sedang diproses !");
// sleep(1200)
// for Release 2
matchParentsWithChildren('./parents.json', './not_a_real_file.json');
matchParentsWithChildren('./not_a_real_file.json', './also_not_a_real_file.json');