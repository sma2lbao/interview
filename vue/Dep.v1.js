export default class Dep {

    constructor() {
        this.subs = []
    }

    addSub(sub) {
        this.subs.push(sub)
    }

    removeSub(sub) {
        if (this.subs.length) {
            const subIdx = this.subs.findIndex(sub)
            if (subIdx > -1) {
                this.subs.splice(subIdx, 1)
            }
        }
    }

    // 添加一个依赖
    depend() {
        if (Dep.target) {
            this.addSub(Dep.target)
        }
    }

    notify() {
        const subs = this.subs.slice()
        subs.map(item => {
            item.update()
        })
    }
}