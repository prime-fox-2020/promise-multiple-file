const reports = (val) => new Promise((resolve, reject) => {
    resolve(val)
})

reports(1)
    .then(() => {return reports(2)})
    .then(() => {return reports(3)})
    .then(() => {
        console.log(val)
    })


