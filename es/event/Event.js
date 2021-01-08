export default class Event {

    constructor() {
        this.evmap = {}
    }

    on(name, fn) {
        this.evmap[name] = this.evmap[name] ? this.evmap[name].push(fn) : [fn]
        return this;
    }

    emit(name, ...params) {
        const fns = this.evmap[name]
        if (fns && fns.length) {
            fns.forEach(fn => fn(...params))
        }
        return this;
    }

    off(name, fn) {
        const fns = this.evmap[name]
        const tarIdx = fns.findIndex(item => fn === item)
        if (tarIdx !== -1) {
            fns.splice(tarIdx, 1)
        }
        return this;
    }

    once(name, fn) {
        const self = this;
        const _fn_ = function(...params) {
            fn(...params)
            self.off(name, _fn_)
        }
        this.on(name, _fn_)
        return this;
    }

}