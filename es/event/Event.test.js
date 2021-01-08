import Event from './Event.js'

const event = new Event();

function f1(...args) {
    console.log("f1: hello event!", args)
}
function f2(...args) {
    console.log("f2: hello!", args)
}

event.on("changeF1", f1)
event.once("changeF2", f2)

event.emit("changeF1", {a: 1, b: 2})
event.emit("changeF1", {a: 1, b: 2})
event.off("changeF1", f1)
event.emit("changeF1", {a: 1, b: 2})

event.emit("changeF2", {c: 3, d: 4})
event.emit("changeF2", {c: 3, d: 4})
event.emit("changeF2", {c: 3, d: 4})
