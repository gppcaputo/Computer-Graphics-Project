

let drag = false

let translateY = 0.0
let translateX = 0.0
let translateZ = -6 // default -6

let scaleX = 1.0
let scaleY = 1.0
let scaleZ = 1.0

let rotateY = 1.0
let rotateX = 1.0

let zNear = 0.1
let zFar = 100.0

const controls = {
    translateY: translateY,
    translateX: translateX,
    translateZ: translateZ,
    scaleX: scaleX,
    scaleY: scaleY,
    scaleZ: scaleZ,
    rotateY: rotateY,
    rotateX: rotateX,
    zNear: zNear,
    zFar: zFar,
}

// String field
gui.add(controls, "translateY").min(-1.0).max(1.0).step(0.1).onChange(function (value) {
        translateY = value
        drawScene()
    }
)

gui.add(controls, "translateX").min(-1.0).max(1.0).step(0.1).onChange(function (value) {
        translateX = value
        drawScene()
    }
)

gui.add(controls, "translateZ").min(-10.0).max(1.0).step(0.1).onChange(function (value) {
        translateZ = value
        drawScene()
    }
)

gui.add(controls, "scaleX").min(0.0).max(2.0).step(0.1).onChange(function (value) {
        scaleX = value
        drawScene()
    }
)

gui.add(controls, "scaleY").min(0.0).max(2.0).step(0.1).onChange(function (value) {
        scaleY = value
        drawScene()
    }
)

gui.add(controls, "scaleZ").min(0.0).max(2.0).step(0.1).onChange(function (value) {
        scaleZ = value
        drawScene()
    }
)

gui.add(controls, "rotateX").min(0.0).max(6.28).step(0.1).onChange(function (value) {
        rotateX = value
        drawScene()
    }
)

gui.add(controls, "rotateY").min(0.0).max(6.28).step(0.1).onChange(function (value) {
        rotateY = value
        drawScene()
    }
)

gui.add(controls, "zNear").min(-1.0).max(1.0).step(0.01).onChange(function (value) {
        zNear = value
        drawScene()
    }
)

gui.add(controls, "zFar").min(0.0).max(100.0).step(0.1).onChange(function (value) {
        zFar = value
        drawScene()
    }
)

window.onmousedown = function (event) {
    drag = true
}

window.onmouseup = function (event) {
    drag = false
}

window.onmousemove = function (event) {
    if (drag) {
        rotateY += event.movementX / 100
        rotateX += event.movementY / 100
        drawScene()
        event.preventDefault()
    }
}