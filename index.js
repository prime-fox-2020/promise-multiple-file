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
  return new Promise ((res,rej)=>{
    fs.readFile(path, 'utf8', (err,data)=>{
      if(err){
        rej(err)
      }else{
        sleep(5000)
        res(JSON.parse(data))
      }
    })
  })
}

function matchParentsWithChildren(parentFileName, childrenFileName) {
  let parent_data;
  readFilePromise(parentFileName)
  .then(dataParents=>{
    parent_data = dataParents

    return readFilePromise(childrenFileName)
  })
  .then(dataChildrens=>{
    for (let i = 0; i < parent_data.length; i++) {
      parent_data[i].children = []
      for (let j = 0; j < dataChildrens.length; j++) {
        if(parent_data[i].last_name === dataChildrens[j].family){
          parent_data[i].children.push(dataChildrens[j].full_name)
        }
      }
    }
    console.log(parent_data);
  })
  .catch(err=>{
    console.log(err);
  })
}

// Tanpa promisify

/*
function matchParentsWithChildren(parentFileName, childrenFileName){
  let parent_data;

  fs.promises.readFile(parentFileName, 'utf8')
  .then(dataParents=>{
    sleep(5000)
    parent_data = JSON.parse(dataParents)

    return fs.promises.readFile(childrenFileName, 'utf8')
  })
  .then(dataChildrens=>{
    sleep(5000)
    childrens = JSON.parse(dataChildrens)
    
    for (let i = 0; i < parent_data.length; i++) {
      parent_data[i].children = []
      for (let j = 0; j < childrens.length; j++) {
        if(parent_data[i].last_name === childrens[j].family){
        parent_data[i].children.push(childrens[j].full_name)
        }
      }
    }
    console.log(parent_data);
  })
  .catch(err=>{
    console.log(err);
  })
}
*/


matchParentsWithChildren('./parents.json', './children.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildren('./parents.json', './not_a_real_file.json');
matchParentsWithChildren('./not_a_real_file.json', './also_not_a_real_file.json');