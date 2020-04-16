const fs = require('fs');
const fsPromises = fs.promises
// fsp.readFile("someFile").then(data => {
//     console.log(data);
//     }); 
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
    // return new Promise((res, rej) => {
    //     fsPromises.readFile(path, 'utf8')
    //         .then(data => {
    //             res(JSON.parse(data))
    //         })
    //         .catch(err => {
    //             rej(err)
    //         })
    // })
    sleep(2000)
    return new Promise((res,rej) => {
        fsPromises.readFile(path,'utf8')
        .then(data=>{
            res(JSON.parse(data))
           
        })
        .catch(err=>{
            rej(err)
        })
    })
}

function matchParentsWithChildren(parentFileName, childrenFileName) {
    let arr=[]
    readFilePromise(parentFileName)
    .then(data=>{
        arr.push(data)
        // sleep(2000)
        // console.log(arr,`ini data arr`)
        return readFilePromise(childrenFileName)
    })
    .then(data2=>{
        arr.push(data2) 
        // console.log(arr,`ini data`)
        // sleep(2000)
        for(let i=0;i<arr[0].length;i++){
            arr[0][i].children =[]
            for(let j=0;j<arr[1].length;j++){
                if(arr[0][i].last_name == arr[1][j].family){
                    arr[0][i].children.push(arr[1][j].full_name)
                }
            }
        }
        console.log(arr[0])
    })
    
    // your code here... (p.s. readFilePromise function(s) should be around here..)
}

matchParentsWithChildren('./parents.json', './children.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildren('./parents.json', './not_a_real_file.json');
// matchParentsWithChildren('./not_a_real_file.json', './also_not_a_real_file.json');

