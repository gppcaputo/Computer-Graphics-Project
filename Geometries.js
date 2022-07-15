let objectsToDraw = []

//Buffers degli Obj
let bufferInfo_sphere
let bufferInfo_cube
let bufferInfo_skybox
let bufferInfo_floor
let bufferInfo_mouse
let bufferInfo_rotella

//Buffers delle texture
let texture_sphere
let texture_cube
let texture_skybox
let texture_mouse
let texture_floor
let texture_rotella

function test(gl) {

    loadShere()
    loadCube()
    loadMouse()
    loadRotella()
    loadFloor()

    /*------------------------------------------------------------------------------------------------------------------------------*/
    //definisco il buffer per lo skybox
     const skybox_array = createXYQuadVertices.apply(null, Array.prototype.slice.call(arguments, 1))
     texture_skybox = loadSkyboxTexture()
     bufferInfo_skybox = webglUtils.createBufferInfoFromArrays(gl, skybox_array)
     console.log("bufferInfo_skybox", bufferInfo_skybox)


    

}

function loadFloor()
{
    {
		const S = 40; 		
		const H = 0; 

		const textureCoords = [ 0,0, 1,0, 0,1, 1,1,];

		const arrays_floor = {
		   position: 	{ numComponents: 3, data: [-S,H,-S, S,H,-S, -S,H,S,  S,H,S, ], },
		   //texcoord: 	{ numComponents: 2, data: textureCoords, },
		   color: 	{ numComponents: 3, data: [0.7,0.7,0.7,  0.7,0.7,0.7,  0.7,0.7,0.7,  0.7,0.7,0.7], },
		   indices: 	{ numComponents: 3, data: [0,2,1, 	2,3,1,], },
		   normal:		{numComponents: 3, data: [0,1,0,	0,1,0,	0,1,0,	0,1,0,], },
		};

		bufferInfo_floor = webglUtils.createBufferInfoFromArrays(gl, arrays_floor);
        texture_floor = loadTextureFromImg("resources/images/matrix.png")
        console.log("bufferInfo_florr", bufferInfo_floor)
	}
}

function loadCube() {
    //cubo
    loadObjFromUrl("resources/obj/cube.obj")
    const cube_array = {
        position: {numComponents: 3, data: objData.position},
        texcoord: {numComponents: 2, data: objData.texcoord},
        normal: {numComponents: 3, data: objData.normal}
    }
    bufferInfo_cube = webglUtils.createBufferInfoFromArrays(gl, cube_array)
    texture_cube = loadTextureFromImg("resources/images/virus.webp")

    console.log("bufferInfo_cube", bufferInfo_cube)
}

function loadShere() {

    loadObjFromUrl("resources/obj/sphere.obj")

    const sphere_array = {
        position: {numComponents: 3, data: objData.position},
        texcoord: {numComponents: 2, data: objData.texcoord},
        normal: {numComponents: 3, data: objData.normal}
    }

    bufferInfo_sphere = webglUtils.createBufferInfoFromArrays(gl, sphere_array)
    texture_sphere = loadTextureFromImg("resources/images/virus_skull.jpg")

    console.log("bufferInfo_sphere", bufferInfo_sphere)
}



function loadRotella() {
    loadObjFromUrl("resources/obj/rotella.obj")
    const rotella_array = {
        position: {numComponents: 3, data: objData.position},
        texcoord: {numComponents: 2, data: objData.texcoord},
        normal: {numComponents: 3, data: objData.normal}
    }
    bufferInfo_rotella = webglUtils.createBufferInfoFromArrays(gl, rotella_array)
    console.log("bufferInfo_rotella", bufferInfo_rotella)
    texture_rotella = loadTextureFromImg("resources/images/download.png")
}

function loadMouse() {
    loadObjFromUrl("resources/obj/mouse.obj")
    const mouse_array = {
        position: {numComponents: 3, data: objData.position},
        texcoord: {numComponents: 2, data: objData.texcoord},
        normal: {numComponents: 3, data: objData.normal}
    }
    bufferInfo_mouse = webglUtils.createBufferInfoFromArrays(gl, mouse_array)
    console.log("bufferInfo_mouse", bufferInfo_mouse)
    texture_mouse = loadTextureFromImg("resources/images/black.jpg")
}


function loadObjFromUrl(url) {
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4) {
            parseOBJ(xhttp.responseText)
        }
    }
    xhttp.open("GET", url, false)
    xhttp.send(null)
}

function loadTextureFromImg(imageSrc) {
    let texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)

    // Fill the texture with a 1x1 blue pixel. nel caso in cui la risorsa non sia disponibile
    gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        1, 1, 0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        new Uint8Array([0, 0, 255, 255])
    )

    let textureImage = new Image()
    textureImage.src = imageSrc
    textureImage.addEventListener('load', function () {
        gl.bindTexture(gl.TEXTURE_2D, texture)

        gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            textureImage)

        //nel caso non sia quadrata la texture, applico il filtro credo
        if (isPowerOf2(textureImage.width) && isPowerOf2(textureImage.height)) {
            // Yes, it's a power of 2. Generate mips.
            gl.generateMipmap(gl.TEXTURE_2D);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        } else {
            // No, it's not a power of 2. Turn off mips and set wrapping to clamp to edge
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);	//tell WebGL to not repeat the texture in S direction
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);	//tell WebGL to not repeat the texture in T direction
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        }

    })

    return texture
}


function isPowerOf2(value) {
    return (value & (value - 1)) == 0;		//Working with binary arithmetic
}
