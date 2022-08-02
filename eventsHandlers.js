window.addEventListener('keydown', doKeyDown, true);
window.addEventListener('keyup', doKeyUp, true);
window.addEventListener('touchstart', doTouchDown, true);
window.addEventListener('touchend', doTouchUp, true);
if( !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ) {
text.addEventListener('mousedown', mouseDown);
text.addEventListener('mouseup', mouseUp);
text.addEventListener('mousemove', mouseMove);
text.addEventListener('mouseout', mouseUp);
window.addEventListener('wheel', zoom, { passive: false });}

var pointerX = -1;
var pointerY = -1;
document.onmousemove = function(event) {
	pointerX = event.pageX;
	pointerY = event.pageY;
}
setInterval(pointerCheck, 1000);
function pointerCheck() {
	console.log('Cursor at: '+pointerX+', '+pointerY);
}



function zoom(event) {
    event.preventDefault();
    D += event.deltaY * +0.01;
    
  }
  
  


function mouseDown (e) {
    console.log("mouseDown");
	drag=true;
	cameraLiberabis = true;
	old_x=e.pageX, old_y=e.pageY;
	e.preventDefault();
	return false;
};

function mouseUp (e){
	drag=false;
	//cameraLiberabis = false;
   
};

function mouseMove(e) {
	if (!drag) return false; 
    console.log("mouseMove");
	dX=-(e.pageX-old_x)*2*Math.PI/canvas.width; 
	dY=-(e.pageY-old_y)*2*Math.PI/canvas.height; 
	//console.log("dX: " + dX + " dY: " + dY);
	THETA+=dX;
	PHI+=dY;
    if (PHI<0.22){PHI=0.22;}
    if (THETA>3.05){THETA=3.05;}
    if (PHI>3.05){PHI=3.05;}
    //console.log("THETA: " + THETA + " PHI: " + PHI);
	old_x=e.pageX, old_y=e.pageY; 
	e.preventDefault();
	
};



//Premo il tasto
function doKeyDown(e){

    switch (e.key) {
        case "w":
            //cameraTarget[1] +=
            // posX += 1
            key[0] = true
            cameraLibera = false
            //console.log("key[0] value:" + key[0])
            //console.log("cameratarget Y")
            break
        case "a":
            //cameraTarget[0] -= 1
            cameraLibera = false
            key[1] = true
            //console.log("cameratarget X")
            break
        case "s":
            //cameraTarget[1] -= 1
            cameraLibera = false
            key[2] = true
            //console.log("cameratarget Y")
            break
        case "d":
            //cameraTarget[0] += 1
            cameraLibera = false
            key[3] = true
            //console.log("cameratarget X")
            break
        case "ArrowUp":
            //cameraInteraction.moveUp = true;
            cameraPosition[1] += 0.14
            //cameraPosition[2] += 0.25
            
            //console.log("CameraPosition X") //sposto posizione della cam nell'asse x
            cameraLibera=true;
            break
        case "ArrowDown":
            cameraLibera=true;    
              
            cameraPosition[1] -= 0.14
            //cameraPosition[2] += 0.25
           // console.log("CameraPosition Y")
            break
        case "ArrowLeft":
         
            cameraLibera=true; 
            cameraPosition[0] -= 0.14
            
            break
        case "ArrowRight":
            cameraLibera=true; 
       
            cameraPosition[0] += 0.14
            
            break
        default:
            return
    }

}

//Rilascio il tasto premuto
function doKeyUp(e){

    switch (e.key) {
        case "w":
            //cameraTarget[1] +=
            // posX += 1
            key[0] = false
            //console.log("key[0] value:" + key[0])
            break
        case "a":
            //cameraTarget[0] -= 1
            key[1] = false
            //console.log("cameratarget X")
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

    
}




function doMouseDown(e){
    x= e.pageX - canvas.offsetLeft;
    y= e.pageY - canvas.offsetTop;
    
    // THE W KEY
    if (x>=190 && y>=351 && x<=250 && y<=417) {key[0]=true; cameraLibera = false}
    // THE S KEY
    if (x>=190 && y>=439 && x<=251 && y<=500) {key[2]=true;cameraLibera = false}
    // THE A KEY
    if (x>=106 && y>=438 && x<=167 && y<=503) {key[1]=true; cameraLibera = false}
    // THE D KEY
    if (x>=274 && y>=440 && x<=335 && y<=504) {key[3]=true; cameraLibera = false}

   




}

function doMouseUp(e){
    x= e.pageX - canvas.offsetLeft;
    y= e.pageY - canvas.offsetTop;
    
    // THE W KEY
    if (x>=190 && y>=351 && x<=250 && y<=417) key[0]=false;
    // THE S KEY
    if (x>=190 && y>=439 && x<=251 && y<=500) key[2]=false;
    // THE A KEY
    if (x>=106 && y>=438 && x<=167 && y<=503) key[1]=false;
    // THE D KEY
    if (x>=274 && y>=440 && x<=335 && y<=504) key[3]=false;
}



function doTouchDown(e){
    touch = e.touches[0];
    x= touch.pageX - canvas.offsetLeft;
    y= touch.pageY - canvas.offsetTop;
    
    // THE W KEY
    if (x>=190 && y>=351 && x<=250 && y<=417) {key[0]=true; cameraLibera = false}
    // THE S KEY
    if (x>=190 && y>=439 && x<=251 && y<=500) {key[2]=true; cameraLibera = false}
    // THE A KEY
    if (x>=106 && y>=438 && x<=167 && y<=503) {key[1]=true; cameraLibera = false}
    // THE D KEY
    if (x>=274 && y>=440 && x<=335 && y<=504) {key[3]=true; cameraLibera = false}

     // THE up KEY
     if (x>=640 && y>=351 && x<=700 && y<=417){ cameraPosition[1] += 1; cameraLibera=true; console.log("cameralibera" + cameraLibera)}
     // THE down KEY
     if (x>=640 && y>=439 && x<=700 && y<=500) {cameraPosition[1] -= 1; cameraLibera=true;}
     // THE left KEY
     if (x>=556 && y>=438 && x<=617 && y<=503) {cameraPosition[0] -= 1; cameraLibera=true;}
     // THE right KEY
     if (x>=724 && y>=440 && x<=785 && y<=504) {cameraPosition[0] += 1; cameraLibera=true;}
}

function doTouchUp(e){
    x= touch.pageX - canvas.offsetLeft;
    y= touch.pageY - canvas.offsetTop;
    
    // THE W KEY
    if (x>=190 && y>=351 && x<=250 && y<=417) key[0]=false;
    // THE S KEY
    if (x>=190 && y>=439 && x<=251 && y<=500) key[2]=false;
    // THE A KEY
    if (x>=106 && y>=438 && x<=167 && y<=503) key[1]=false;
    // THE D KEY
    if (x>=274 && y>=440 && x<=335 && y<=504) key[3]=false;


 
}


window.addEventListener("click", checkButtonClick);

function checkButtonClick(e){
    x = e.pageX - canvas.offsetLeft;
    y = e.pageY - canvas.offsetTop;	
    //console.log(x,y);

    //cambio di visuale
    if(x>=960 && x<=1040 && y>=450 && y<=482)  cambiaCamera=true; 	//davanti
    
    if(x>=1100 && x<=1155 && y>=450 && y<=482)  cambiaCamera=false  //posteriore
    
    //restart button 
    if(x>=490 && x<=650 && y>=178 && y<=236 && morte==true){
        
        initMouse();
        morte=false;
        cambiaCamera=false;
        cameraLiberabis = false;
        cameraAlto = false;
        cartella1=false;
        cartella2=false;
        cartella3=false;
        webglLessonsUI.setupSlider("#LightX", {value: 270, slide: updateLightx, min: 0, max: 450, step: 1});
        webglLessonsUI.setupSlider("#LightY", {value: 200, slide: updateLighty, min: 100, max: 450, step: 1});
        webglLessonsUI.setupSlider("#LightZ", {value: 250, slide: updateLightz, min: 100, max: 350, step: 1});
        x_light = 270;
        y_light = 200;
        z_light = 250;
        //console.log("restart",morte);
    }}