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
    fs.readFile(path, (err, data) => {
      if (err) {
        rej(err)
      } else {
        res(JSON.parse(data))
      }
    })
  })
}

// readFilePromise('./parents.json')
//   .then(data1 => {
//     console.log(`ini data parent \n ${data1}`)

//     return readFilePromise('./children.json')})
//     .then(data2 =>{
//       console.log(`ini data children \n ${data2}`)
//     })
//     .catch(err =>{
//       console.log(`ini error ${err}`)
//     })

//     console.log(data1)

function matchParentsWithChildren(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  readFilePromise(parentFileName)
    .then(data1 => {
      readFilePromise(childrenFileName)
        .then(data2 => {

          for (let i = 0; i < data1.length; i++) {
            data1[i].childrens = []
            for (let j = 0; j < data2.length; j++) {
              if (data1[i].last_name === data2[j].family) {
                data1[i].childrens.push(data2[j].full_name)
              }
            }
          }
          console.log(data1)

        })
    })
    .catch(err =>{
      console.log(err)
    })
}

matchParentsWithChildren('./parents.json', './children.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildren('./parents.json', './not_a_real_file.json');
matchParentsWithChildren('./not_a_real_file.json', './also_not_a_real_file.json');