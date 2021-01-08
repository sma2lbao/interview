export default class Futuer {
    constructor(executor) {
        this.status = 'pending'; // pending fulfilled rejected
        this.fulfilledQueue = [];
        this.rejectedQueue = [];
        this.value = undefined;
        this.reason = undefined;

        const resolve = (val) => {
            setTimeout(() => {
                if (this.status === 'pending') {
                    this.status = 'fulfilled'
                    this.value = val
                    this.fulfilledQueue.forEach(fn => fn(val))
                }
            })
        }

        const reject = (reason) => {
            setTimeout(() => {
                if (this.status === 'pending') {
                    this.status = 'rejected'
                    this.reason = reason
                    this.rejectedQueue.forEach(fn => fn(reason))
                }
            })
        }
        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)            
        }
    }

    then(onFulfill, onReject) {
        const { value, reason, status } = this
        return new Futuer((onFulfillNext, onRejectNext) => {
            const _onFulfill = _value => {
                try {
                    if (typeof onFulfill !== 'function') {
                        onFulfillNext(_value)
                    } else {
                        const result = onFulfill(_value)
                        if (result instanceof Futuer) {
                            result.then(onFulfillNext, onRejectNext)
                        } else {
                            onFulfillNext(result)
                        }
                    }
                } catch (error) {
                    onRejectNext(error)
                }
            }

            const _onReject = _reason => {
                try {
                    if (typeof onReject !== 'function') {
                        onRejectNext(_reason)
                    } else {
                        const result = onReject(_reason)
                        if (result instanceof Futuer) {
                            result.then(onFulfillNext, onRejectNext)
                        } else {
                            onRejectNext(_reason)
                        }
                    }
                } catch (error) {
                    onRejectNext(error)
                }
            }

            switch (status) {
                case 'pending':
                    this.fulfilledQueue.push(_onFulfill)
                    this.rejectedQueue.push(_onReject)
                    break;
                case 'fulfilled':
                    _onFulfill(value)
                    break;
                case 'rejected':
                    _onReject(reason)
                    break;
            }
        })
    }

    catch(onReject) {
        this.then(undefined, onReject)
    }

    finally(fn) {
        return this.then(
            val => Futuer.resolve(fn()).then(() => val),
            reason => Futuer.resolve(fn()).then(() => { throw reason })
        )
    }

    static resolve(value) {
        if (value instanceof Futuer) {
            return value
        }
        return new Futuer(resolve => resolve(value))
    }

    static reject(reason) {
        return new Futuer((_, reject) => {reject(reason)})
    }

    static all(futures) {
        return new Futuer((resolve, reject) => {
            let values = [], count = 0;
            for (let i = 0; i < futures.length; i++) {
                futures[i].then((val) => {
                    values[i] = val
                    count++
                    if (count === futures.length) {
                        resolve(values)
                    }
                }, (reason) => {
                    reject(reason)
                })
            }
        })
    }

    static race(futures) {
        return new Futuer((resolve, reject) => {
            futures.forEach(fn => {
                fn.then(val => resolve(val), err => reject(err))
            })
        })
    }
}