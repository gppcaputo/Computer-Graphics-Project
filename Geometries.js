//Buffers degli Obj
let bufferInfo_sphere
let bufferInfo_cube
let bufferInfo_skybox
let bufferInfo_floor
let bufferInfo_mouse
let bufferInfo_rotella
let bufferInfo_folder
let bufferInfo_foto
//Buffers delle texture
let texture_sphere
let texture_cube
let texture_skybox
let texture_mouse
let texture_floor
let texture_rotella
let texture_folder
let texture_foto
let texture_face
let texture_win
let texture_sphere_purple

function setGeo(gl) {
    loadShere()
    loadCube()
    loadFolder()
    loadMouse()
    loadRotella()
    loadFloor()
    loadFoto()
    loadSkyBox()  
}

function loadFloor()
{
		const S =70; 		
		const H = 0; 
		const textureCoords = [ 0,0, 1,0, 0,1, 1,1,];

		const arrays_floor = {
		   position: 	{ numComponents: 3, data: [-S,H,-S, S,H,-S, -S,H,S,  S,H,S, ], },
		   texcoord: 	{ numComponents: 2, data: textureCoords, },
		   //color: 	{ numComponents: 3, data: [0.7,0.7,0.7,  0.7,0.7,0.7,  0.7,0.7,0.7,  0.7,0.7,0.7], },
		   indices: 	{ numComponents: 3, data: [0,2,1, 	2,3,1,], },
		   normal:		{numComponents: 3, data: [0,1,0,	0,1,0,	0,1,0,	0,1,0,], },
		};

		bufferInfo_floor = webglUtils.createBufferInfoFromArrays(gl, arrays_floor);
        texture_floor = loadTextureFromImg("resources/images/tastiera.png")
        console.log("bufferInfo_florr", bufferInfo_floor)
	
}

function loadFoto()
{
        const position= [
                //1 bottom
                    -0.5, -0.5,  -0.5,
                    -0.5,  0.5,  -0.5,
                     0.5, -0.5,  -0.5,
                    -0.5,  0.5,  -0.5,
                     0.5,  0.5,  -0.5,
                     0.5, -0.5,  -0.5,
                //2 top
                    -0.5, -0.5,   0.5,
                    -0.5,  0.5,   0.5,
                     0.5, -0.5,   0.5,
                     0.5, -0.5,   0.5,
                    -0.5,  0.5,   0.5,
                     0.5,  0.5,   0.5,
                //3 right
                    -0.5,   0.5, -0.5,
                    -0.5,   0.5,  0.5,
                     0.5,   0.5, -0.5,
                    -0.5,   0.5,  0.5,
                     0.5,   0.5,  0.5,
                     0.5,   0.5, -0.5,
                //4 left
                    -0.5,  -0.5, -0.5,
                     0.5,  -0.5, -0.5,
                    -0.5,  -0.5,  0.5,
                    -0.5,  -0.5,  0.5,
                     0.5,  -0.5, -0.5,
                     0.5,  -0.5,  0.5,
                //5 back
                    -0.5,  -0.5, -0.5,
                    -0.5,  -0.5,  0.5,
                    -0.5,   0.5, -0.5,
                    -0.5,  -0.5,  0.5,
                    -0.5,   0.5,  0.5,
                    -0.5,   0.5, -0.5,
                //6 front
                     0.5,  -0.5, -0.5,
                     0.5,   0.5, -0.5,
                     0.5,  -0.5,  0.5,
                     0.5,  -0.5,  0.5,
                     0.5,   0.5, -0.5,
                     0.5,   0.5,  0.5,
                    ];
                
            const normal= [
                
                    //1 bottom
                        0, 0, -1,
                        0, 0, -1,
                        0, 0, -1,
                        0, 0, -1,
                        0, 0, -1,
                        0, 0, -1,
                    //2 top
                        0, 0, 1,
                        0, 0, 1,
                        0, 0, 1,
                        0, 0, 1,
                        0, 0, 1,
                        0, 0, 1,
                    //3 right
                        0, 1, 0,
                        0, 1, 0,
                        0, 1, 0,
                        0, 1, 0,
                        0, 1, 0,
                        0, 1, 0,
                    //4 left
                        0, -1, 0,
                        0, -1, 0,
                        0, -1, 0,
                        0, -1, 0,
                        0, -1, 0,
                        0, -1, 0,
                    //5 back
                        -1, 0, 0,
                        -1, 0, 0,
                        -1, 0, 0,
                        -1, 0, 0,
                        -1, 0, 0,
                        -1, 0, 0,
                    //6 front
                        1, 0, 0,
                        1, 0, 0,
                        1, 0, 0,
                        1, 0, 0,
                        1, 0, 0,
                        1, 0, 0.
                        ];
            const texcoord= [
                //1 bottom
                1.0  , 0.0,
                0.0   , 0.0,
                1.0  , 1.0,
                0.0   , 0.0,
                0.0  , 1.0,
                1.0  , 1.0,
                //2 top
                1.0  , 0.0,
                1.0   , 1.0,
                0.0  , 0.0,
                0.0   , 0.0,
                1.0  , 1.0,
                0.0  , 1.0,
                //3 right
                1.0 , 1.0  ,
                1.0 , 0.0,
                0.0, 1.0  ,
                1.0 , 0.0,
                0.0, 0.0,
                0.0, 1.0,
                //4 left
                0.0 , 1.0  ,
                1.0 , 1.0,
                0.0, 0.0  ,
                0.0 , 0.0,
                1.0, 1.0,
                1.0, 0.0,
                //5 back
                1.0 , 1.0  ,
                1.0 , 0.0,
                0.0, 1.0  ,
                1.0 , 0.0,
                0.0, 0.0,
                0.0, 1.0,
                //6 front
                0.0 , 1.0  ,
                1.0 , 1.0,
                0.0, 0.0  ,
                0.0 , 0.0,
                1.0, 1.0,
                1.0, 0.0,
              ];
        
		const arrays_foto = {
            position: {numComponents: 3, data:position},
            texcoord: {numComponents: 2, data:texcoord,},
            normal: {numComponents: 3, data:normal,},
        }

        
		bufferInfo_foto = webglUtils.createBufferInfoFromArrays(gl, arrays_foto);
        texture_foto = loadTextureFromImg("resources/images/box.jpg")
        texture_win= loadTextureFromImg("resources/images/win.png")

}


function loadFolder() {
    loadObj("resources/obj/foldertris.obj")
    const folder_array = {
        position: {numComponents: 3, data:webglVertexData[0],},
        texcoord: {numComponents: 2, data:webglVertexData[1],},
        normal: {numComponents: 3, data:webglVertexData[2],},
    }
    bufferInfo_folder = webglUtils.createBufferInfoFromArrays(gl, folder_array)
    texture_folder = loadTextureFromImg("resources/images/paper.jpg")
}


function loadCube() {
    //cubo
    loadObj("resources/obj/computer.obj")
    const cube_array = {
        position: {numComponents: 3, data:webglVertexData[0],},
        texcoord: {numComponents: 2,data:webglVertexData[1],},
        normal: {numComponents: 3, data:webglVertexData[2],},
    }
    bufferInfo_cube = webglUtils.createBufferInfoFromArrays(gl, cube_array)
    texture_cube = loadTextureFromImg("resources/images/macbookbis.png")
}


function loadShere() {
    loadObj("resources/obj/virus.obj")
    const sphere_array = {
        position: {numComponents: 3, data: webglVertexData[0],},
        texcoord: {numComponents: 2, data: webglVertexData[1],},
        normal: {numComponents: 3, data: webglVertexData[2],},
    }

    bufferInfo_sphere = webglUtils.createBufferInfoFromArrays(gl, sphere_array)
    texture_sphere = loadTextureFromImg("resources/images/download.png")
    texture_sphere_purple= loadTextureFromImg("resources/images/purple.png")
    texture_face= loadTextureFromImg("resources/images/photo.jfif")

    console.log("bufferInfo_sphere", bufferInfo_sphere)
}



function loadRotella() {
    loadObj("resources/obj/rotella.obj")
    const rotella_array = {
        position: {numComponents: 3, data: webglVertexData[0],},
        texcoord: {numComponents: 2, data: webglVertexData[1],},
        normal: {numComponents: 3, data: webglVertexData[2],},
    }
    bufferInfo_rotella = webglUtils.createBufferInfoFromArrays(gl, rotella_array)
    console.log("bufferInfo_rotella", bufferInfo_rotella)
    texture_rotella = loadTextureFromImg("resources/images/download.png")
}

function loadMouse() {
    loadObj("resources/obj/mouse.obj")
    const mouse_array = {
        position: {numComponents: 3, data: webglVertexData[0],},
        texcoord: {numComponents: 2, data: webglVertexData[1],},
        normal: {numComponents: 3, data: webglVertexData[2],},
    }
    bufferInfo_mouse = webglUtils.createBufferInfoFromArrays(gl, mouse_array)
    console.log("bufferInfo_mouse", bufferInfo_mouse)
    texture_mouse = loadTextureFromImg("resources/images/plastic.jpg")
}


function loadSkyBox(){
    texture_skybox = loadSkyboxTexture()
    bufferInfo_skybox = webglUtils.createBufferInfoFromArrays(gl, {
       position: {
           data: new Float32Array([
               -1, -1, // bottom-left triangle
                1, -1,
               -1,  1,
               -1,  1, // top-right triangle
                1, -1,
                1,  1,
           ]),
           numComponents: 2,
       },
   });
    console.log("bufferInfo_skybox", bufferInfo_skybox)
}





