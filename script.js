"use strict";

let cameraTarget = [0, 0, 0] //eye location of the camera dove guardiamo
let cameraPosition = [0, 0, 4] // center where the camera is pointed ovvero D
let up = [0, 1, 0] //which way is up
const zNear = 0.1
const zFar = 100
const fieldOfViewRadians = degToRad(60);
const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;

async function main() {
    // compiles and links the shaders, looks up attribute and uniform locations
    const meshProgramInfo = webglUtils.createProgramInfo(gl, [vertShader, fragShader]);

    //skybox program
    const skyboxProgramInfo = webglUtils.createProgramInfo(gl, [skyVertShader, skyFragShader])

    //draw geometry?
    test(gl)

    initMouse()


    function render(time) {
        time *= 0.001;  // convert to seconds

        webglUtils.resizeCanvasToDisplaySize(gl.canvas);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        const projection = m4.perspective(fieldOfViewRadians, aspect, zNear, zFar);


        // Compute the camera's matrix using look at.
        const camera = m4.lookAt(cameraPosition, cameraTarget, up);

        // Make a view matrix from the camera matrix.
        const view = m4.inverse(camera);

        const sharedUniforms = {
            u_lightDirection: m4.normalize([-1, 3, 5]),
            u_view: view,
            u_projection: projection,
        };

        gl.useProgram(meshProgramInfo.program);

        // calls gl.uniform
        webglUtils.setUniforms(meshProgramInfo, sharedUniforms);


        //mouse
        const D = 20
         cameraPosition = [posX +(D*Math.sin(degToRad(facing))), posY+7, posZ+(D*Math.cos(degToRad(facing)))]
       //  cameraTarget = [posX * Math.sin(degToRad(facing)), 0, posZ * Math.cos(degToRad(facing))]
        cameraTarget = [posX, posY, posZ]
        mouseDoStep()

        let u_model4 = m4.translation(posX, posY, posZ)
        u_model4 = m4.yRotate(u_model4, degToRad(facing))
        u_model4 = m4.yRotate(u_model4, degToRad(180));
       // u_model4 = m4.xRotate(u_model4, time)
      //  u_model4 = m4.yRotate(u_model4, 180)
        webglUtils.setBuffersAndAttributes(gl, meshProgramInfo, bufferInfo_mouse)
        webglUtils.setUniforms(meshProgramInfo, {
            u_model: u_model4,
            u_texture: texture_mouse,
        })
        webglUtils.drawBufferInfo(gl, bufferInfo_mouse)


        let u_model_rotella = m4.translation(posX, posY, posZ+0.001)
        u_model_rotella = m4.yRotate(u_model_rotella, degToRad(facing))
        u_model_rotella = m4.yRotate(u_model_rotella, degToRad(180));
       // u_model4 = m4.xRotate(u_model4, time)
      //  u_model4 = m4.yRotate(u_model4, 180)
        webglUtils.setBuffersAndAttributes(gl, meshProgramInfo, bufferInfo_rotella)
        webglUtils.setUniforms(meshProgramInfo, {

            u_model: u_model_rotella,
            u_texture: texture_rotella,
        })
        webglUtils.drawBufferInfo(gl, bufferInfo_rotella)


        //--- draws sphere?
        let u_model = m4.identity()
      //  u_model = m4.yRotate(u_model, time)
      //  u_model = m4.xRotate(u_model, 123)
        u_model = m4.translation(0, 0, 0)
        webglUtils.setBuffersAndAttributes(gl, meshProgramInfo, bufferInfo_sphere)
        webglUtils.setUniforms(meshProgramInfo, {
            u_model: u_model,
            u_texture: texture_sphere
        })
        webglUtils.drawBufferInfo(gl, bufferInfo_sphere)

        //secondo cubo??
        let u_model2 = m4.scale(m4.translation(4, 0, 0), .3, .2, 2)
        webglUtils.setBuffersAndAttributes(gl, meshProgramInfo, bufferInfo_cube)
        webglUtils.setUniforms(meshProgramInfo, {
            u_model: u_model2,
            u_texture: texture_cube,
        })
        webglUtils.drawBufferInfo(gl, bufferInfo_sphere)


        let u_modelfloor = m4.identity()
        webglUtils.setBuffersAndAttributes(gl, meshProgramInfo, bufferInfo_floor)
        webglUtils.setUniforms(meshProgramInfo, {
            u_model: u_modelfloor,
            u_texture: texture_floor,
        })
        webglUtils.drawBufferInfo(gl, bufferInfo_floor)


       

        /*
                //disegno lo spaceman
                let u_model3 = m4.translation(-4, 0, 0)
                webglUtils.setBuffersAndAttributes(gl, meshProgramInfo, bufferInfo_spaceman)
                webglUtils.setUniforms(meshProgramInfo, {
                    u_model: u_model3,
                    u_texture: texture_spaceman,
                })
                webglUtils.drawBufferInfo(gl, bufferInfo_spaceman)


                //disegno mouse
                let u_model4 = m4.translation(0, 0, 0)
                webglUtils.setBuffersAndAttributes(gl, meshProgramInfo, bufferInfo_mouse)
                webglUtils.setUniforms(meshProgramInfo, {
                    u_model: u_model4,
                    u_texture: texture_mouse,
                })
                webglUtils.drawBufferInfo(gl, bufferInfo_mouse)*/

        //*----------DISEGNO LO SKYBOX---------*//
        //Matrixi per lo skybox
        /*  gl.depthFunc(gl.LEQUAL) //non so perchè è necessario per lo skybox

          let viewDirectionProjectionMatrix = m4.multiply(projection, view)
          let viewDirectionProjectionInverse = m4.inverse(viewDirectionProjectionMatrix)
          gl.useProgram(skyboxProgramInfo.program);
          webglUtils.setBuffersAndAttributes(gl, skyboxProgramInfo, bufferInfo_skybox)
          webglUtils.setUniforms(skyboxProgramInfo, {
              u_viewDirectionProjectionInverse: viewDirectionProjectionInverse,
              u_skybox: texture_skybox,
          })
          webglUtils.drawBufferInfo(gl, bufferInfo_skybox)*/


        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);

}

main();

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
            console.log("key[0] value:" + key[0])
            console.log("cameratarget Y")
            break
        case "a":
            //cameraTarget[0] -= 1
            key[1] = true
            console.log("cameratarget X")
            break
        case "s":
            //cameraTarget[1] -= 1
            key[2] = true
            console.log("cameratarget Y")
            break
        case "d":
            //cameraTarget[0] += 1
            key[3] = true
            console.log("cameratarget X")
            break
        case "ArrowUp":
            cameraPosition[1] += 1
            console.log("CameraPosition X") //sposto posizione della cam nell'asse x
            break
        case "ArrowDown":
            cameraPosition[1] -= 1
            console.log("CameraPosition Y")
            break
        case "ArrowLeft":
            cameraPosition[0] -= 1
            break
        case "ArrowRight":
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
