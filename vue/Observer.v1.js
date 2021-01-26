import { arrayMethods } from './array.v1.js'
import Dep from './Dep.v1.js'

const hasProto = '__proto__' in {}
const arrayKeys = Object.getOwnPropertyNames(arrayMethods)

function protoAugment(target, src, keys) {
    target.__proto__ = src
}

function copyAugment(target, src, keys) {
    for(let i = 0; i < keys.length; i++) {
        target[key] = src[key]
    }
}

/**
 * Define a property.
 */
export function def (obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
      value: val,
      enumerable: !!enumerable,
      writable: true,
      configurable: true
    })
}

export default class Observer {

    constructor(value) {
        this.value = value
        this.dep = new Dep()
        def(value, '__ob__', this)
        if (Array.isArray(value)) {
            const augment = hasProto
                ? protoAugment
                : copyAugment
            augment(value, arrayMethods, arrayKeys)
            this.observeArray(value)
        } else {
            this.walk(value)
        }
    }

    walk(obj) {
        const keys = Object.keys(obj)
        for (let i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i])
        }
    }

    observeArray(items) {
        items.forEach(item => {
            observe(item)
        })
    }
}

function defineReactive(obj, key, val) {
    if (arguments.length === 2) {
        val = obj[key]
    }
    // if (typeof val === 'object') {
    //     new Observer(val)
    // }
    let childOb = observe(val)
    const dep = new Dep()
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get () {
            if (childOb) {
                childOb.dep.depend()
            }
            dep.depend()
            // console.log(`${key}属性被读取了`, dep);
            return val
        },
        set (newVal) {
            if (val === newVal) {
                return
            }
            // console.log(`${key}属性被修改了`);
            val = newVal
            dep.notify()
        }
    })
}
export function observe(value, asRootData) {
    if (typeof value !== 'object' || value === null) {
        return
    }
    let ob
    if (value.hasOwnProperty('__ob__') && value.__ob__ instanceof Observer) {
        ob = value.__ob__
    } else {
        ob = new Observer(value)
    }
    return ob
}

