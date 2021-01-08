import MyPromise from './Promise.js';
new MyPromise((resolve) => {
    resolve(1)
}).then(res => {
    console.log(res)
})
// MyPromise.resolve(1).then(value=>console.log(value));
console.log(2);