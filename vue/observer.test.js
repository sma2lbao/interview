import Observer from './Observer.v1.js'
import Watcher from './Watcher.v1.js'


function Demo() {
    this.data = new Observer({
        arry: [1, 2, 3]
    })
    new Watcher(this, 'data.value.arry', function(val, old) {
        console.log('watcher callback function~', val, old)
    })
    console.log(this.data.value.arry[0])
    this.data.value.arry.push(4)
    // this.data.value.arry = [2]

    // new Watcher(this, 'data.value.obj.a', function(val, old) {
    //     console.log('watcher callback function~', val, old)
    // })
    // this.data.value.obj.a = 2
    // console.log(this.data.value.obj.a)
}

new Demo()

console.log('debugger end!')