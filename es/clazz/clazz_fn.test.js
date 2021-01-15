setTimeout(() => {
    console.log(5)
}, 0)

Promise.resolve(1)
.then(res => {
    console.log(res)
    return Promise.resolve(2)
    .then(res2 => {
        console.log(res2)
        return Promise.resolve(3)
        .then(res3 => {
            console.log(res3)
            return Promise.resolve(4)
                .then(res4=> {
                    console.log(res4)
                })
        })
    })
})
.then(res => {
    console.log(6)
})

debugger