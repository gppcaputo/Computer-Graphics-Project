"use strict";

let cameraTarget = [0, 0, 0] //eye location of the camera dove guardiamo
let cameraPosition = [10, 0, 4] // center where the camera is pointed ovvero D
let up = [0, 1, 0] //which way is up
const zNear = 0.1
const zFar = 100
const fieldOfViewRadians = degToRad(60);
const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
var cameraLibera = false; // drag del mouse

async function update() {
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
        if (!cameraLibera){
         cameraPosition = [posX +(D*Math.sin(degToRad(facing))), posY+7, posZ+(D*Math.cos(degToRad(facing)))]
       //  cameraTarget = [posX * Math.sin(degToRad(facing)), 0, posZ * Math.cos(degToRad(facing))]
        }
        
        //enable camera to fly around the scene     
        cameraTarget = [posX, posY, posZ]
       

        drawMouse(meshProgramInfo)
        drawRotella(meshProgramInfo)
        drawVirus(meshProgramInfo)
        drawFolder(meshProgramInfo)
        drawFloor(meshProgramInfo)

        drawSkybox(gl, skyboxProgramInfo, view, projection)
        
        mouseDoStep()
       
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);

}

update();


// -----------------------------------------------------------
//FUNCTION TO DRAW THE OBJECTS ON THE SCENE
// -----------------------------------------------------------
function drawMouse(meshProgramInfo){
    let u_model4 = m4.translation(posX, posY, posZ)
    u_model4 = m4.yRotate(u_model4, degToRad(facing))
   // u_model4 = m4.yRotate(u_model4, degToRad(180));
    webglUtils.setBuffersAndAttributes(gl, meshProgramInfo, bufferInfo_mouse)
    webglUtils.setUniforms(meshProgramInfo, {
        u_model: u_model4,
        u_texture: texture_mouse,
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_mouse)
    }

function drawRotella(meshProgramInfo){
    let u_model_rotella = m4.translation(posX, posY, posZ+0.01)
    u_model_rotella = m4.yRotate(u_model_rotella, degToRad(facing))
    // u_model_rotella = m4.yRotate(u_model_rotella, degToRad(180));
    webglUtils.setBuffersAndAttributes(gl, meshProgramInfo, bufferInfo_rotella)
    webglUtils.setUniforms(meshProgramInfo, {

        u_model: u_model_rotella,
        u_texture: texture_rotella,
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_rotella)
}


function drawVirus(meshProgramInfo){
    let u_model = m4.identity()
//  u_model = m4.yRotate(u_model, time)
//  u_model = m4.xRotate(u_model, 123)
    u_model = m4.scale(m4.translation(0, 2.2, 2), 2,2,2)
    webglUtils.setBuffersAndAttributes(gl, meshProgramInfo, bufferInfo_sphere)
    webglUtils.setUniforms(meshProgramInfo, {
        u_model: u_model,
        u_texture: texture_sphere
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_sphere)
}

//secondo cubo??
function drawFolder(meshProgramInfo){
    let u_model2 = m4.scale(m4.translation(4, 0, 0), .3, .2, 2)
    webglUtils.setBuffersAndAttributes(gl, meshProgramInfo, bufferInfo_cube)
    webglUtils.setUniforms(meshProgramInfo, {
        u_model: u_model2,
        u_texture: texture_cube,
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_sphere)
}

    
function drawFloor(meshProgramInfo){
    let u_modelfloor = m4.identity()
    webglUtils.setBuffersAndAttributes(gl, meshProgramInfo, bufferInfo_floor)
    webglUtils.setUniforms(meshProgramInfo, {
        u_model: u_modelfloor,
        u_texture: texture_floor,
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_floor)
    }
    


function drawSkybox(gl, skyboxProgramInfo, view, projection) {
    gl.depthFunc(gl.LEQUAL) //non so perchè è necessario per lo skybox

    let viewDirectionProjectionMatrix = m4.multiply(projection, view)
    let viewDirectionProjectionInverse = m4.inverse(viewDirectionProjectionMatrix)
    gl.useProgram(skyboxProgramInfo.program);
    webglUtils.setBuffersAndAttributes(gl, skyboxProgramInfo, bufferInfo_skybox)
    webglUtils.setUniforms(skyboxProgramInfo, {
        u_viewDirectionProjectionInverse: viewDirectionProjectionInverse,
        u_skybox: texture_skybox,
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_skybox)
    }





