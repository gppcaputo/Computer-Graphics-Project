"use strict";
var lattuce1=0;
var lattuce2=0;
var lattuce3=0;
var ant=false;
var morte=false;
var camera_posteriore=true;
var cambiaCamera=false;
var cameraAlto=false;
var click_end=false;
//var texture_enable=true;
let cameraTarget = [0, 0, 0]     //eye location of the camera dove guardiamo
let cameraPosition = [0, 0, 0]    // center where the camera is pointed ovvero D
let up = [0, 1, 0]  //se cambia up, ruota l'intero SDR, quindi cambiano gli assi
const zNear = 0.1   // faccia più piccola del frustum znear
const zFar = 200   // faccia più grande del frustum znear
const fieldOfViewRadians = degToRad(60);    //fov, aumentando questo, aumento l'ampiezza della visuale (tipo grandangolo)
const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
var D = 17
var cameraLiberabis = false;
var cameraLibera = false; // drag del mouse
var drag;
var numlat=3;
var bias = -0.00005;
var lattuce=false;
var THETA= degToRad(86);
var PHI=degToRad(23);	
var x_light= 10, 


y_light= 200,
z_light= 250, 
x_targetlight= 0,	
y_targetlight= 0,	
z_targetlight= 0, 				
width_projLight= 3000,
height_projLight= 1200,
fovLight = 12,
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

function updateLighty(event, ui){
    y_light= ui.value;

}

function updateLightz(event, ui){
    z_light= ui.value;

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
    matrix.src="resources/images/sfondo2.jpg";
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
    /*var button1 = new Image(); 
    button1.src = "resources/images/bottone1.jpg";
    button1.addEventListener('load', function() {});
            
          
    var button3 = new Image(); 
    button3.src = "resources/images/bottone3.jpg";
    button3.addEventListener('load', function() {});*/
          
    
    //restart button
    var retry = new Image(); 
    retry.src = "resources/images/restart.png";
    retry.addEventListener('load', function() {});
    

setGeo(gl);

initSnail();
createTextureLight();

webglLessonsUI.setupSlider("#LightX", {value: 10, slide: updateLightx, min: 0, max: 450, step: 1});
webglLessonsUI.setupSlider("#LightY", {value: 200, slide: updateLighty, min: 100, max: 450, step: 1});
webglLessonsUI.setupSlider("#LightZ", {value: 250, slide: updateLightz, min: 100, max: 350, step: 1});

function update(time){
	if(nstep*PHYS_SAMPLING_STEP <= timeNow){ //skip the frame if the call is too early
		snailDoStep(); 
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
        8,  	// near: top of the frustum
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
            

    var projection = m4.perspective(fieldOfViewRadians, aspect, 0.1, 1200);

    // Compute the camera's matrix using look at.
    var camera = m4.lookAt(cameraPosition, cameraTarget, up);

    // Make a view matrix from the camera matrix.
    var view = m4.inverse(camera);


    if (camera_posteriore){
        cameraPosition = [posX +(D*Math.sin(degToRad(facing))), posY+7, posZ+(D*Math.cos(degToRad(facing)))]            
    }

    if(cameraLiberabis){
        cameraPosition = [D*1.5*Math.sin(PHI)*Math.cos(THETA),D*1.5*Math.sin(PHI)*Math.sin(THETA),D*1.5*Math.cos(PHI)];
    }

    if(cambiaCamera && !cameraLiberabis){   
        cameraPosition = [posX+(-D*Math.sin(degToRad(facing))), posY+20, posZ+(-D*Math.cos(degToRad(facing)))];		
    }

    if (cameraAlto){
        cameraPosition=[0,105,2];
    }
        
    if(!cameraAlto){
        cameraTarget = [posX, posY, posZ]}
    else{
        cameraTarget = [0,0,0];
    }

    drawScene(projection,camera, textureMatrix, lightWorldMatrix, sunProgramInfo,time);
    drawSkybox(gl, skyboxProgramInfo, view, projection)
    drawTextInfo();
}
update();
window.requestAnimationFrame(update);


function drawScene( projectionMatrix, camera, textureMatrix, lightWorldMatrix, programInfo,time) {

    const viewMatrix = m4.inverse(camera);
	gl.useProgram(programInfo.program);

    if (texture_enable==true){
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
    }
    if(texture_enable==false){
        textureMatrix = m4.identity();
        textureMatrix = m4.scale(textureMatrix, 0, 0, 0);
        webglUtils.setUniforms(programInfo, {
            u_view: viewMatrix,
            u_projection: projectionMatrix,
            u_bias: bias,
            u_textureMatrix: textureMatrix,
            u_reverseLightDirection:lightWorldMatrix.slice(8, 11),
            u_lightDirection: m4.normalize([-1, 3, 5]),
            u_lightIntensity: lightIntensity,
            u_shadowIntensity: shadowIntensity,
        });
    }

    drawSnail(programInfo)
    drawParete(programInfo)
    drawFlower(programInfo)
    drawFlower2(programInfo)
    drawFlower3(programInfo)
    drawToxic(programInfo,time)
    drawToxic2(programInfo,time)
    drawToxic3(programInfo,time)
    drawToxic4(programInfo,time)
    
    
    if (lattuce1==0){
        drawLattuce(programInfo,time)
    }
    if (lattuce2==0){
        drawLattuce2(programInfo,time)
    }
    if (lattuce3==0){
    drawLattuce3(programInfo,time)}
    
    
    if(numlat==3){
        if (ant==false){
            drawAnt(programInfo,time)
        }
    
    drawFoto(programInfo,time)}
    drawFloor(programInfo)    
}     


function drawTextInfo(){
    if( (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ) {
    ctx.drawImage(wasd_keys, 80, 330);
    ctx.drawImage(freccie, 540, 330);  
    //ctx.drawImage(button1, 300, 450);
	//ctx.drawImage(button3, 440, 450);  
    ctx.drawImage(image_menu, 860.5, 0);
    } 
    else{ctx.drawImage(image_menu, 871.5, 1);}
	//testo

	ctx.font = 'bold 14pt serif';
	ctx.fillStyle = 'blue';
	ctx.fillText("RACCOGLI LA LATTUGA", 880, 30);
	ctx.fillText("PER IL TUO AMICO ", 880, 50);
    ctx.fillText("PRIMA CHE ARRIVI ", 880, 70);
    ctx.fillText("IL PROPRIETARIO", 880,   90);
    ctx.font = '14pt calibri';
	ctx.fillStyle = 'brown';
    numlat=lattuce1+lattuce2+lattuce3;
    if ((numlat)==0){
        ctx.fillText("Numero di lattughe", 880, 110);
        ctx.fillText("raccogliere: ", 880, 130);
        ctx.font ='bold 14pt serif';
        ctx.fillStyle = 'black';
        ctx.fillText("3", 980, 130);}
    else if ((numlat)==1){
        ctx.fillText("Numero di lattughe", 880, 110);
        ctx.fillText("raccogliere: ", 880, 130);
        ctx.font ='bold 14pt serif';
        ctx.fillStyle = 'black';
        ctx.fillText("2", 980, 130);}
    else if ((numlat)==2){
        ctx.fillText("Numero di lattughe", 880, 110);
        ctx.fillText("raccogliere: ", 880, 130);
        ctx.font ='bold 14pt serif';
        ctx.fillStyle = 'black';
        ctx.fillText("1", 980, 130);}
    else if ((numlat)==3){
        ctx.fillStyle = 'green';
        ctx.fillText("          Complimenti!!!!!", 880, 110);
        ctx.fillText("    Hai raccolto la lattuga", 880, 130);
        
    }
        
    if(ant==true){
        ctx.font = 'bold 14pt serif';
        ctx.fillStyle = 'green';
        ctx.fillText("          BRAVO!!!!!", 880, 200);
        ctx.fillText("    Hai salvato il tuo amico !!", 880, 220);
    }

	ctx.font = 'bold 18pt SERIF';
	ctx.fillStyle = 'red';
    ctx.fillText("ATTENZIONE", 880, 160);
    ctx.font = '14pt Calibri';
	ctx.fillStyle = 'red';
	ctx.fillText("evita le sostanze tossiche ", 880, 180);
    ctx.font = '10pt Calibri';
	ctx.fillStyle = 'black';
	ctx.fillText("----------------------------------------------------------", 871, 240);
    ctx.font = 'bold 13pt Calibri';
	ctx.fillStyle = 'black';
    ctx.fillText("          Controllo movimento", 880,250);
    ctx.font = '12pt Calibri';
    ctx.fillText("UTILIZZA LA COMBINAZIONE ", 880,270);
    ctx.fillText("DI TASTI WASD, PER MUOVERTI", 880, 290);
    //ctx.fillText("", 880, 310);
    //ctx.fillText("          PER MUOVERTI", 880, 310);
    ctx.font = "bold 12pt Calibri";
    ctx.fillText("W", 880, 310);
    ctx.font = "12pt Calibri";
    ctx.fillText("     avanti", 880,310);
    ctx.font = "bold 12pt Calibri";
    ctx.fillText("A", 970, 310);
    ctx.font = "12pt Calibri";
    ctx.fillText("     sinistra", 970,310);
    ctx.font = "bold 12pt Calibri";
    ctx.fillText("S", 880, 330);
    ctx.font = "12pt Calibri";
    ctx.fillText("     indietro", 880,330);
    ctx.font = "bold 12pt Calibri";
    ctx.fillText("D", 970, 330);
    ctx.font = "12pt Calibri";
    ctx.fillText("     destra", 970,330); 
    ctx.font = 'bold 13pt Calibri';
    ctx.fillText("Controllo movimento camera", 880, 370);
    ctx.font = '13pt Calibri';
	ctx.fillText("con le freccie direzionali ⇑⇓⇒⇐", 880, 390); 
    ctx.fillText("o con il movimento del mouse", 880, 410);
	ctx.font = '13pt Calibri';
	ctx.fillText("Puoi avvicinare e allontare la", 880, 430); 
    ctx.fillText("camera con la rotella del mouse", 880, 450); 
	
   if(morte==1){  
        ctx.drawImage(matrix,0,0,text.clientWidth,text.clientHeight);
        ctx.drawImage(retry,250, 30);
    }

}


// -----------------------------------------------------------
//FUNCTION TO DRAW THE OBJECTS ON THE SCENE
// -----------------------------------------------------------
function drawSnail(ProgramInfo){
    let u_model4 = m4.scale(m4.translation(posX, posY, posZ), 3, 3, 3)
    u_model4 = m4.yRotate(u_model4, degToRad(facing))
   // u_model4 = m4.yRotate(u_model4, degToRad(180));
    webglUtils.setBuffersAndAttributes(gl, ProgramInfo, bufferInfo_snail)
    webglUtils.setUniforms(ProgramInfo, {
       // u_colorMult: [0.5, 0.5, 1, 1],
        u_world: u_model4,
        u_texture: texture_snail,
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_snail)
    }

function drawToxic(ProgramInfo,time){
    let u_model = m4.identity()
    
//  u_model = m4.xRotate(u_model, 123)
    u_model = m4.scale(m4.translation(-20, 5.5, -15), 5.5,5.5,5.5)
    u_model = m4.yRotate(u_model, time)
    webglUtils.setBuffersAndAttributes(gl, ProgramInfo, bufferInfo_toxic)
    webglUtils.setUniforms(ProgramInfo, {
       
        u_world: u_model,
        u_texture: texture_toxic,
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_toxic)
}

function drawToxic2(ProgramInfo,time){
    let u_model = m4.identity()
    
//  u_model = m4.xRotate(u_model, 123)
    u_model = m4.scale(m4.translation(10, 5.5,30), 5.5,5.5,5.5)
    u_model = m4.yRotate(u_model, time)
    webglUtils.setBuffersAndAttributes(gl, ProgramInfo, bufferInfo_toxic)
    webglUtils.setUniforms(ProgramInfo, {
       
        u_world: u_model,
        u_texture: texture_toxic,
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_toxic)
}

function drawToxic3(ProgramInfo,time){
    let u_model = m4.identity()
    
//  u_model = m4.xRotate(u_model, 123)
    u_model = m4.scale(m4.translation(-15, 5.5, 9), 5.5,5.5,5.5)
    u_model = m4.yRotate(u_model, time)
    webglUtils.setBuffersAndAttributes(gl, ProgramInfo, bufferInfo_toxic)
    webglUtils.setUniforms(ProgramInfo, {
       
        u_world: u_model,
        u_texture: texture_toxic,
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_toxic)
}

function drawToxic4(ProgramInfo,time){
    let u_model = m4.identity()
//  u_model = m4.yRotate(u_model, time)
//  u_model = m4.xRotate(u_model, 123)
    u_model = m4.scale(m4.translation(12, 5.5,-10), 5,5,5)
    
    u_model = m4.yRotate(u_model, time)
    
    webglUtils.setBuffersAndAttributes(gl, ProgramInfo, bufferInfo_toxic)
    webglUtils.setUniforms(ProgramInfo, {
        //u_colorMult: [0.5, 0.5, 1, 1],
        u_world: u_model,
        u_texture: texture_toxic
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_toxic)
}


function drawFlower(ProgramInfo){
    let u_modelflower = m4.identity()
    u_modelflower = m4.scale(m4.translation(12, -17, -20), 5, 5, 5)
    //u_modelflower = m4.yRotate(u_modelflower, degToRad(facing))
   // u_model4 = m4.yRotate(u_model4, degToRad(180));
    webglUtils.setBuffersAndAttributes(gl, ProgramInfo, bufferInfo_flower)
    webglUtils.setUniforms(ProgramInfo, {
        //u_colorMult: [0.5, 0.5, 1, 1],
        u_world: u_modelflower,
        u_texture: texture_flower,
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_flower)
}


function drawFlower2(ProgramInfo){
    let u_modelflower = m4.scale(m4.translation(40, -17, 40), 5, 5, 5)
    //u_modelflower = m4.yRotate(u_modelflower, degToRad(facing))
    // u_model4 = m4.yRotate(u_model4, degToRad(180));
    webglUtils.setBuffersAndAttributes(gl, ProgramInfo, bufferInfo_flower)
    webglUtils.setUniforms(ProgramInfo, {
        u_colorMult: [0.5, 0.5, 1, 1],
        u_world: u_modelflower,
        u_texture: texture_flower,
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_flower)
    }
    

function drawFlower3(ProgramInfo){
    let u_modelflower = m4.scale(m4.translation(-40, -17, 40), 5, 5, 5)
    //u_modelflower = m4.yRotate(u_modelflower, degToRad(facing))
    // u_model4 = m4.yRotate(u_model4, degToRad(180));
    webglUtils.setBuffersAndAttributes(gl, ProgramInfo, bufferInfo_flower)
    webglUtils.setUniforms(ProgramInfo, {
        u_colorMult: [0.5, 0.5, 1, 1],
        u_world: u_modelflower,
        u_texture: texture_flower,
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_flower)
    }
        


//Funzione per disegnare la pianta
function drawLattuce(ProgramInfo,time){
    let u_modellattuce = m4.scale(m4.translation(6,0,-35), 1.3, 1.3, 1.3)
    u_modellattuce = m4.yRotate(u_modellattuce, time);
    webglUtils.setBuffersAndAttributes(gl, ProgramInfo, bufferInfo_lattuce)
    webglUtils.setUniforms(ProgramInfo, {
        //u_colorMult: [0.5, 0.5, 1, 1],
        u_world: u_modellattuce,
        u_texture: texture_lattuce,
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_lattuce)
}

    
function drawLattuce2(ProgramInfo,time){
    let u_modellattuce = m4.scale(m4.translation(32,0,-8), 1.3, 1.3, 1.3)
    u_modellattuce = m4.yRotate(u_modellattuce, time);
    webglUtils.setBuffersAndAttributes(gl, ProgramInfo, bufferInfo_lattuce)
    webglUtils.setUniforms(ProgramInfo, {
        //u_colorMult: [0.5, 0.5, 1, 1],
        u_world: u_modellattuce,
        u_texture: texture_lattuce,
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_lattuce)
}


function drawLattuce3(ProgramInfo,time){
    let u_modellattuce = m4.scale(m4.translation(-15,0,35), 1.3, 1.3, 1.3)
    u_modellattuce = m4.yRotate(u_modellattuce, time);
    webglUtils.setBuffersAndAttributes(gl, ProgramInfo, bufferInfo_lattuce)
    webglUtils.setUniforms(ProgramInfo, {
        //u_colorMult: [0.5, 0.5, 1, 1],
        u_world: u_modellattuce,
        u_texture: texture_lattuce,
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_lattuce)
}

function drawCube(ProgramInfo){
    let u_modelcube = m4.scale(m4.translation(20,10,-5), 10, 10, 10)
    webglUtils.setBuffersAndAttributes(gl, ProgramInfo, bufferInfo_cube)
    webglUtils.setUniforms(ProgramInfo, {
        //u_colorMult: [0.5, 0.5, 1, 1],
        u_texture: texture_cube,
        u_world: u_modelcube,
        
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_lattuce)
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
    

function drawAnt(ProgramInfo){
    let u_modelant=m4.identity()
    u_modelant=m4.scale(m4.translation(0,0,-29),4,4,4)
    u_modelant=m4.yRotate(u_modelant,degToRad(180))
    //u_modelfoto = m4.zRotate(m4.identity(), 90)
    webglUtils.setBuffersAndAttributes(gl, ProgramInfo, bufferInfo_ant)
    webglUtils.setUniforms(ProgramInfo, {
        u_world: u_modelant,
        u_texture: texture_ant,
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_ant)
    }
        

function drawParete(ProgramInfo){
    let u_modelfoto=m4.identity()
    u_modelfoto=m4.scale(m4.translation(0,45,-66),140,90,1)
    //u_modelfoto=m4.yRotate(u_modelfoto,degToRad(90))
    //u_modelfoto = m4.zRotate(m4.identity(), 90)
    webglUtils.setBuffersAndAttributes(gl, ProgramInfo, bufferInfo_foto)
    webglUtils.setUniforms(ProgramInfo, {
        u_world: u_modelfoto,
        u_texture: texture_par,
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_foto)
    }

function drawFoto(ProgramInfo,time){
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

