import Dep from './Dep.v1.js'

export default class Watcher {

    constructor(vm, expOrFn, cb) {
        this.vm = vm;
        this.cb = cb;
        this.getter = parsePath(expOrFn);
        this.value = this.get()
    }

    get() {
        Dep.target = this;
        const vm = this.vm;
        let value = this.getter.call(vm, vm);
        Dep.target = undefined;
        return value
    }

    update() {
        const old = this.value;
        this.value = this.getter.call(this.vm, this.vm);
        this.cb.call(this.vm, this.value, old)
    }
}

const bailRE = /[^\w.$]/
export function parsePath(path) {
    if (bailRE.test(path)) {
        return
    }
    const segments = path.split('.')
    return function (obj) {
        for (let i = 0; i < segments.length; i++) {
            if (!obj) return
            obj = obj[segments[i]]
        }
        return obj
    }
}