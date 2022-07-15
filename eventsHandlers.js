//Premo il tasto
window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return
    }

    switch (event.key) {
        case "w":
            //cameraTarget[1] +=
            // posX += 1
            key[0] = true
            cameraLibera = false
            console.log("key[0] value:" + key[0])
            console.log("cameratarget Y")
            break
        case "a":
            //cameraTarget[0] -= 1
            cameraLibera = false
            key[1] = true
            console.log("cameratarget X")
            break
        case "s":
            //cameraTarget[1] -= 1
            cameraLibera = false
            key[2] = true
            console.log("cameratarget Y")
            break
        case "d":
            //cameraTarget[0] += 1
            cameraLibera = false
            key[3] = true
            console.log("cameratarget X")
            break
        case "ArrowUp":
            cameraPosition[1] += 1
            console.log("CameraPosition X") //sposto posizione della cam nell'asse x
            cameraLibera=true;
            break
        case "ArrowDown":
            cameraLibera=true;           
            cameraPosition[1] -= 1

            console.log("CameraPosition Y")
            break
        case "ArrowLeft":
            cameraLibera=true; 
            cameraPosition[0] -= 1
            break
        case "ArrowRight":
            cameraLibera=true; 
            cameraPosition[0] += 1
            break
        default:
            return
    }

    event.preventDefault()
}, true)

//Rilascio il tasto premuto
window.addEventListener("keyup", function (event) {
    if (event.defaultPrevented) {
        return
    }

    switch (event.key) {
        case "w":
            //cameraTarget[1] +=
            // posX += 1
            key[0] = false
            console.log("key[0] value:" + key[0])
            break
        case "a":
            //cameraTarget[0] -= 1
            key[1] = false
            console.log("cameratarget X")
            break
        case "s":
            key[2] = false
            //cameraTarget[1] -= 1
            break
        case "d":
            key[3] = false
            break
        case "ArrowUp":
            break
        case "ArrowDown":
            break
        case "ArrowLeft":
            break
        case "ArrowRight":
            break
        default:
            return
    }

    event.preventDefault()
}, true)