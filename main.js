"use strict";
var cartella1=0;
var cartella2=0;
var cartella3=0;
var pacco=false;
var morte=false;
var cambiaCamera=false;
var click_end=false;
let cameraTarget = [0, 0, 0]     //eye location of the camera dove guardiamo
let cameraPosition = [0, 0, 0]    // center where the camera is pointed ovvero D
let up = [0, 1, 0]  //se cambia up, ruota l'intero SDR, quindi cambiano gli assi
const zNear = 0.1   // faccia più piccola del frustum znear
const zFar = 200   // faccia più grande del frustum znear
const fieldOfViewRadians = degToRad(60);    //fov, aumentando questo, aumento l'ampiezza della visuale (tipo grandangolo)
const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
const D = 17
var cameraLibera = false; // drag del mouse
var numcartella=3;
var bias = -0.00005;
var cartella=false;
const THETA= degToRad(86);
const PHI=degToRad(23);	
var x_light= 270, 

y_light= 200,
z_light= 250, 
x_targetlight= 0,	
y_targetlight= 0,	
z_targetlight= 0, 				
width_projLight= 2000,
height_projLight= 2000,
fovLight = 10,
lightIntensity= 2.5,
shadowIntensity=0.9;


var viewParamsChanged = false

//matri globali
var lightWorldMatrix;
var lightProjectionMatrix;
var projectionMatrix;
var cameraMatrix;




//webglLessonsUI.setupSlider("#Lightx", {value: x_light, slide: updateLightx, min: 100, max: 250, step: 2});

function updateLightx(event, ui){
    x_light= ui.value;

}
var doneSomething=false; 
			var nstep=0; 
			var timeNow=0;

			const PHYS_SAMPLING_STEP=20; 

var meshProgramInfo = webglUtils.createProgramInfo(gl, [vertShader, fragShader]);

    //skybox program
    var skyboxProgramInfo = webglUtils.createProgramInfo(gl, [skyVertShader, skyFragShader])

    //sun program
    var sunProgramInfo = webglUtils.createProgramInfo(gl, [sunVertShader, sunFragShader])

    var colorProgramInfo = webglUtils.createProgramInfo(gl, [colorVertShader, colorFragShader])


    var matrix =new Image();
    matrix.src="resources/images/skull.jpg";
   matrix.addEventListener('load', function() {});

    var image_menu = new Image();
    image_menu.src = "resources/images/back.jpg";
    image_menu.addEventListener('load', function() {});
    
    var wasd_keys= new Image(); 
    wasd_keys.src = "resources/images/wasd.png";
    wasd_keys.addEventListener('load', function() {});
    

    var freccie = new Image();
    freccie.src = "resources/images/freccie.png";
    freccie.addEventListener('load', function() {});
    
    //bottoni
    var button1 = new Image(); 
    button1.src = "resources/images/bottone1.jpg";
    button1.addEventListener('load', function() {});
            
          
    var button3 = new Image(); 
    button3.src = "resources/images/bottone3.jpg";
    button3.addEventListener('load', function() {});
          
    
    //restart button
    var retry = new Image(); 
    retry.src = "resources/images/reset.png";
    retry.addEventListener('load', function() {});
    
 
    
setGeo(gl);
createTextureLight();
initMouse();


webglLessonsUI.setupSlider("#LightX", {value: 270, slide: updateLightx, min: 100, max: 350, step: 1});

function update(time){
	if(nstep*PHYS_SAMPLING_STEP <= timeNow){ //skip the frame if the call is too early
		mouseDoStep(); 
		nstep++; 
		doneSomething=true;
		window.requestAnimationFrame(update);
		return; // return as there is nothing to do
	}
	timeNow=time;   
	if (doneSomething) {
		render(time);
		doneSomething=false;
	}
	window.requestAnimationFrame(update); // get next frame

}



    function render(time) {
        time*=0.001;
        gl.enable(gl.DEPTH_TEST);
        // first draw from the POV of the light
    lightWorldMatrix = m4.lookAt(
        [x_light, y_light, z_light],          			// position
        [x_targetlight, y_targetlight, z_targetlight], 	// target
        up,                                				// up
    );

    lightProjectionMatrix = m4.perspective(
            degToRad(fovLight),
            width_projLight / height_projLight,
            10,  	// near: top of the frustum
            700);   // far: bottom of the frustum

    gl.bindFramebuffer(gl.FRAMEBUFFER, depthFramebuffer);
    gl.viewport(0, 0, depthTextureSize, depthTextureSize);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    drawScene(lightProjectionMatrix, lightWorldMatrix, m4.identity(), lightWorldMatrix, colorProgramInfo,time);

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    gl.clearColor(0, 0, 0, 1); //setta tutto a nero se 0,0,0,1
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


    let textureMatrix = m4.identity();
    textureMatrix = m4.translate(textureMatrix, 0.5, 0.5, 0.5);
    textureMatrix = m4.scale(textureMatrix, 0.5, 0.5, 0.5);
    textureMatrix = m4.multiply(textureMatrix, lightProjectionMatrix);
    textureMatrix = m4.multiply(textureMatrix, m4.inverse(lightWorldMatrix));
            

    var projection = m4.perspective(fieldOfViewRadians, aspect, 0.1, 500);

    // Compute the camera's matrix using look at.
    var camera = m4.lookAt(cameraPosition, cameraTarget, up);

    // Make a view matrix from the camera matrix.
    var view = m4.inverse(camera);

    
    if (!cameraLibera){
        cameraPosition = [posX +(D*Math.sin(degToRad(facing))), posY+7, posZ+(D*Math.cos(degToRad(facing)))]            
    }
    
    if(cambiaCamera){
        cameraPosition = [posX+(-D*Math.sin(degToRad(facing))), posY+20, posZ+(-D*Math.cos(degToRad(facing)))];		
    }
    
        
    cameraTarget = [posX, posY, posZ]
    
    drawScene(projection,camera, textureMatrix, lightWorldMatrix, sunProgramInfo,time);
    drawSkybox(gl, skyboxProgramInfo, view, projection)
    
    drawTextInfo();
    }
update();
window.requestAnimationFrame(update);


function drawScene( projectionMatrix, camera, textureMatrix, lightWorldMatrix, programInfo,time) {

    const viewMatrix = m4.inverse(camera);
	gl.useProgram(programInfo.program);

	webglUtils.setUniforms(programInfo, {
		u_view: viewMatrix,
		u_projection: projectionMatrix,
		u_bias: bias,
		u_textureMatrix: textureMatrix,
		u_projectedTexture: depthTexture,
		u_reverseLightDirection: lightWorldMatrix.slice(8, 11),
        u_lightDirection: m4.normalize([-1, 3, 5]),
		u_lightIntensity: lightIntensity,
		u_shadowIntensity: shadowIntensity,
	});

        drawMouse(programInfo)
        drawRotella(programInfo)
        drawPacco2(programInfo)
        drawVirus(programInfo,time)
        drawVirus2(programInfo,time)
        drawVirus3(programInfo,time)
        drawVirus4(programInfo,time)
        if (cartella1==0){
            drawFolder(programInfo,time)
        }
        if (cartella2==0){
            drawFolder2(programInfo,time)
        }
        if (cartella3==0){
        drawFolder3(programInfo,time)}
        
        
        if(numcartella==3){
            if (pacco==false){
                drawPacco(programInfo,time)
            }
           
        drawFoto2(programInfo,time)}
        drawFloor(programInfo)    
}     



function drawTextInfo(){
    if( (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ) {
    ctx.drawImage(wasd_keys, 0, 330);
    ctx.drawImage(freccie, 450, 330);  }
    ctx.drawImage(image_menu, 771.5, 11);
	//testo
	ctx.font = '14pt Calibri';
	ctx.fillStyle = 'blue';
	ctx.fillText("Prova a raccogliere tutte", 780, 50);
	ctx.fillText("le cartelle ", 780, 70);
	
    ctx.font = '14pt Calibri';
	ctx.fillStyle = 'red';
    numcartella=cartella1+cartella2+cartella3;
    if ((numcartella)==0){
        ctx.fillText("Cartella da raccogliere 3", 780, 100);}
    else if ((numcartella)==1){
            ctx.fillText("Cartella da raccogliere 2", 780, 100);}
    else if ((numcartella)==2){
                ctx.fillText("Cartella da raccogliere 1", 780, 100);}
    else if ((numcartella)==3){
        ctx.fillStyle = 'green';
        ctx.fillText("          Complimenti!!!!!", 780, 100);
        ctx.fillText("    Hai raccolto tutte le cartelle", 780, 120);
        ctx.font = '14pt Calibri'; 
        ctx.fillStyle = 'red';
        ctx.fillText("      Hai fatto infuriare il boss!", 780, 190);
        ctx.fillText("Cosa nasconderà alle sue spalle?", 780, 210);
    }
        
    if (pacco==true){
        ctx.fillStyle = 'green';
        ctx.fillText("      Grazie per aver recuperato", 780, 230);
        ctx.fillText("      tutti i preziosi documenti!!", 780, 250);
    }

	ctx.font = '12pt Calibri';
	ctx.fillStyle = 'purple';
	ctx.fillText("Attenzione evita i virus rotanti per ", 780, 140);
	ctx.fillText("non rimetterci i circuiti", 780, 160);
	
	ctx.font = '10pt Calibri';
	ctx.fillStyle = 'black';
	ctx.fillText("----------------------------------------------------------", 771, 270);
	ctx.font = '16pt Calibri';
	ctx.fillStyle = 'red';
	ctx.fillText("	 PANNELLO DI CONTROLLO 		", 770, 290);
	ctx.font = '13pt Calibri';
	ctx.fillStyle = 'black';
    ctx.fillText("          Controllo movimento", 780, 310);
    ctx.font = '12pt Calibri';
	ctx.fillText("          W avanti            A sinistra", 780, 330); 
	ctx.fillText("          S indietro          D destra", 780, 350); 
    ctx.font = '13pt Calibri';
    ctx.fillText("Controllo movimento camera", 780, 380);
	ctx.fillText("con le freccie direzionali ⇑⇓⇒⇐", 780, 400); 
	ctx.font = '13pt Calibri';
	ctx.fillText("                  Cambia visuale", 780, 440); 
	
    //bottoni
	ctx.drawImage(button1, 780, 450);
	
	ctx.drawImage(button3, 920, 450);

    
   if(morte==1){
        ctx.drawImage(matrix,0,0,gl.canvas.clientWidth,gl.canvas.clientHeight);
        ctx.drawImage(retry,480, 175);
                    }

    }




// -----------------------------------------------------------
//FUNCTION TO DRAW THE OBJECTS ON THE SCENE
// -----------------------------------------------------------
function drawMouse(ProgramInfo){
    let u_model4 = m4.scale(m4.translation(posX, posY, posZ), 3, 3, 3)
    u_model4 = m4.yRotate(u_model4, degToRad(facing))
   // u_model4 = m4.yRotate(u_model4, degToRad(180));
    webglUtils.setBuffersAndAttributes(gl, ProgramInfo, bufferInfo_mouse)
    webglUtils.setUniforms(ProgramInfo, {
        u_colorMult: [0.5, 0.5, 1, 1],
        u_world: u_model4,
        u_texture: texture_mouse,
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_mouse)
    }

function drawRotella(ProgramInfo){
    let u_model_rotella = m4.scale(m4.translation(posX, posY, posZ+0.01), 3, 3, 3)
    u_model_rotella = m4.yRotate(u_model_rotella, degToRad(facing))
    // u_model_rotella = m4.yRotate(u_model_rotella, degToRad(180));
    webglUtils.setBuffersAndAttributes(gl, ProgramInfo, bufferInfo_rotella)
    webglUtils.setUniforms(ProgramInfo, {
        u_colorMult: [0.5, 0.5, 1, 1],
        u_world: u_model_rotella,
        u_texture: texture_rotella,
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_rotella)
}


function drawVirus(ProgramInfo,time){
    let u_model = m4.identity()
    
//  u_model = m4.xRotate(u_model, 123)
    u_model = m4.scale(m4.translation(-25, 5, -15), 5,5,5)
    u_model = m4.yRotate(u_model, time)
    webglUtils.setBuffersAndAttributes(gl, ProgramInfo, bufferInfo_sphere)
    webglUtils.setUniforms(ProgramInfo, {
        u_colorMult: [0.5, 0.5, 1, 1],
        u_world: u_model,
        u_texture: texture_sphere
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_sphere)
}


function drawVirus2(ProgramInfo,time){
    let u_model = m4.identity()
//  u_model = m4.yRotate(u_model, time)
//  u_model = m4.xRotate(u_model, 123)
    u_model = m4.scale(m4.translation(35, 5, 20), 5,5,5)
    u_model = m4.xRotate(u_model, time)
    webglUtils.setBuffersAndAttributes(gl, ProgramInfo, bufferInfo_sphere)
    webglUtils.setUniforms(ProgramInfo, {
        u_colorMult: [0.5, 0.5, 1, 1],
        u_world: u_model,
        u_texture: texture_sphere
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_sphere)
}


function drawVirus3(ProgramInfo,time){
    let u_model = m4.identity()
//  u_model = m4.yRotate(u_model, time)
//  u_model = m4.xRotate(u_model, 123)
    u_model = m4.scale(m4.translation(12, 5,-10), 5,5,5)
    
    u_model = m4.xRotate(u_model, time)
    
    webglUtils.setBuffersAndAttributes(gl, ProgramInfo, bufferInfo_sphere)
    webglUtils.setUniforms(ProgramInfo, {
        u_colorMult: [0.5, 0.5, 1, 1],
        u_world: u_model,
        u_texture: texture_sphere
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_sphere)
}


function drawVirus4(ProgramInfo,time){
    let u_model = m4.identity()
//  u_model = m4.yRotate(u_model, time)
//  u_model = m4.xRotate(u_model, 123)
    u_model = m4.scale(m4.translation(10, 9.8,30), 5,10,5)
    u_model=m4.yRotate(u_model,degToRad(180))
    u_model = m4.yRotate(u_model, time)
    
    webglUtils.setBuffersAndAttributes(gl, ProgramInfo, bufferInfo_sphere)
    webglUtils.setUniforms(ProgramInfo, {
        //u_colorMult: [0.5, 0.5, 1, 1],
        u_world: u_model,
        u_texture: texture_face
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_sphere)
}

//secondo cubo??
function drawFolder(ProgramInfo,time){
    let u_modelfolder = m4.scale(m4.translation(6,0,-35), 1, 1, 1)
    u_modelfolder = m4.yRotate(u_modelfolder, time);
    webglUtils.setBuffersAndAttributes(gl, ProgramInfo, bufferInfo_folder)
    webglUtils.setUniforms(ProgramInfo, {
        u_colorMult: [0.5, 0.5, 1, 1],
        u_world: u_modelfolder,
        u_texture: texture_folder,
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_folder)
}

    
function drawFolder2(ProgramInfo,time){
    let u_modelfolder = m4.scale(m4.translation(32,0,-8), 1, 1, 1)
    u_modelfolder = m4.yRotate(u_modelfolder, time);
    webglUtils.setBuffersAndAttributes(gl, ProgramInfo, bufferInfo_folder)
    webglUtils.setUniforms(ProgramInfo, {
        u_colorMult: [0.5, 0.5, 1, 1],
        u_world: u_modelfolder,
        u_texture: texture_folder,
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_folder)
}


function drawFolder3(ProgramInfo,time){
    let u_modelfolder = m4.scale(m4.translation(-15,0,35), 1, 1, 1)
    u_modelfolder = m4.yRotate(u_modelfolder, time);
    webglUtils.setBuffersAndAttributes(gl, ProgramInfo, bufferInfo_folder)
    webglUtils.setUniforms(ProgramInfo, {
        u_colorMult: [0.5, 0.5, 1, 1],
        u_world: u_modelfolder,
        u_texture: texture_folder,
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_folder)
}

function drawCube(ProgramInfo){
    let u_modelcube = m4.scale(m4.translation(20,10,-5), 10, 10, 10)
    webglUtils.setBuffersAndAttributes(gl, ProgramInfo, bufferInfo_cube)
    webglUtils.setUniforms(ProgramInfo, {
        //u_colorMult: [0.5, 0.5, 1, 1],
        u_texture: texture_cube,
        u_world: u_modelcube,
        
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_folder)
}

function drawFloor(ProgramInfo){
    let u_modelfloor = m4.identity()
    webglUtils.setBuffersAndAttributes(gl, ProgramInfo, bufferInfo_floor)
    webglUtils.setUniforms(ProgramInfo, {
        u_world: u_modelfloor,
        u_texture: texture_floor,
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_floor)
    }
    

function drawPacco(ProgramInfo){
    let u_modelfoto=m4.identity()
    u_modelfoto=m4.scale(m4.translation(0,2,-29),4,4,4)
    u_modelfoto=m4.yRotate(u_modelfoto,degToRad(180))
    //u_modelfoto = m4.zRotate(m4.identity(), 90)
    webglUtils.setBuffersAndAttributes(gl, ProgramInfo, bufferInfo_foto)
    webglUtils.setUniforms(ProgramInfo, {
        u_world: u_modelfoto,
        u_texture: texture_foto,
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_foto)
    }
        

    function drawPacco2(ProgramInfo){
        let u_modelfoto=m4.identity()
        u_modelfoto=m4.scale(m4.translation(0,40,-62),140,80,4)
        //u_modelfoto=m4.yRotate(u_modelfoto,degToRad(90))
        //u_modelfoto = m4.zRotate(m4.identity(), 90)
        webglUtils.setBuffersAndAttributes(gl, ProgramInfo, bufferInfo_foto)
        webglUtils.setUniforms(ProgramInfo, {
            u_world: u_modelfoto,
            u_texture: texture_win,
        })
        webglUtils.drawBufferInfo(gl, bufferInfo_foto)
        }

function drawFoto2(ProgramInfo,time){
    let u_modelfoto=m4.identity()
    u_modelfoto=m4.scale(m4.translation(0,5.5,-10),7,7,7)
    u_modelfoto=m4.zRotate(m4.xRotate(m4.yRotate(u_modelfoto,time),time),time)
    //u_modelfoto = m4.zRotate(m4.identity(), 90)
    webglUtils.setBuffersAndAttributes(gl, ProgramInfo, bufferInfo_foto)
    webglUtils.setUniforms(ProgramInfo, {
        u_world: u_modelfoto,
        u_texture: texture_face,
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_foto)
    }
            

function drawSkybox(gl, skyboxProgramInfo, view, projection) {
    gl.depthFunc(gl.LEQUAL) //non so perchè è necessario per lo skybox

    const viewMatrix = m4.copy(view);

    // remove translations
    viewMatrix[12] = 0;
    viewMatrix[13] = 0;
    viewMatrix[14] = 0;

    let viewDirectionProjectionMatrix = m4.multiply(projection, viewMatrix)
    let viewDirectionProjectionInverse = m4.inverse(viewDirectionProjectionMatrix)
    gl.useProgram(skyboxProgramInfo.program);
    webglUtils.setBuffersAndAttributes(gl, skyboxProgramInfo, bufferInfo_skybox)
    webglUtils.setUniforms(skyboxProgramInfo, {
        u_viewDirectionProjectionInverse: viewDirectionProjectionInverse,
        u_skybox: texture_skybox,
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_skybox)
    }

