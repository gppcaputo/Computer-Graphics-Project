window.addEventListener('keydown', doKeyDown, true);
window.addEventListener('keyup', doKeyUp, true);
window.addEventListener('touchstart', doTouchDown, true);
window.addEventListener('touchend', doTouchUp, true);
window.addEventListener('mousedown', doMouseDown, true);
window.addEventListener('mouseup', doMouseUp, true);


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

    // THE up KEY
    if (x>=640 && y>=351 && x<=700 && y<=417){ cameraPosition[1] += 1; cameraLibera=true; console.log("cameralibera" + cameraLibera)}
    // THE down KEY
    if (x>=640 && y>=439 && x<=700 && y<=500) {cameraPosition[1] -= 1; cameraLibera=true;}
    // THE left KEY
    if (x>=556 && y>=438 && x<=617 && y<=503) {cameraPosition[0] -= 1; cameraLibera=true;}
    // THE right KEY
    if (x>=724 && y>=440 && x<=785 && y<=504) {cameraPosition[0] += 1; cameraLibera=true;}




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
    if(x>=870 && x<=950 && y>=450 && y<=482)  cambiaCamera=true; 	//davanti
    
    if(x>=1010 && x<=1065 && y>=450 && y<=482)  cambiaCamera=false  //posteriore
    
    //restart button 
    if(x>=586 && x<=740 && y>=178 && y<=236 && morte==true){
        
        initMouse();
        morte=false;
        cartella1=false;
        cartella2=false;
        cartella3=false;
        //console.log("restart",morte);
    }}