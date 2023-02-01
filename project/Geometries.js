//Buffers degli Objpurple
//let bufferInfo_sphere
let bufferInfo_toxic
//let bufferInfo_toxic2
//let bufferInfo_toxic3
//let bufferInfo_toxic4
let bufferInfo_cube
let bufferInfo_skybox
let bufferInfo_floor
let bufferInfo_snail
let bufferInfo_lattuce
let bufferInfo_foto
let bufferInfo_flower
let bufferInfo_ant

//Buffers delle texture
//let texture_sphere
let texture_toxic
let texture_cube
let texture_skybox
let texture_snail
let texture_floor
let texture_lattuce
let texture_foto
let texture_face
let texture_par
let texture_flower
let texture_ant

//let texture_sphere_acid


function setGeo(gl) {
    loadToxic()
    loadAnt()
    loadFlower()
    loadCube()
    loadLattuce()
    loadSnail()
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
        texture_floor = loadTextureFromImg("resources/images/grass.jpg")
	
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
        texture_par= loadTextureFromImg("resources/images/parete.jpg")

}


function loadLattuce() {
    loadObj("resources/obj/lattuga.obj")
    const lattuce_array= {
        position: {numComponents: 3, data:webglVertexData[0],},
        texcoord: {numComponents: 2, data:webglVertexData[1],},
        normal: {numComponents: 3, data:webglVertexData[2],},
    }
    bufferInfo_lattuce = webglUtils.createBufferInfoFromArrays(gl, lattuce_array)
    texture_lattuce = loadTextureFromImg("resources/images/Lettuce.jpg")
}


function loadCube() {
    //cubo
    loadObj("resources/obj/cube.obj")
    const cube_array = {
        position: {numComponents: 3, data:webglVertexData[0],},
        texcoord: {numComponents: 2,data:webglVertexData[1],},
        normal: {numComponents: 3, data:webglVertexData[2],},
    }
    bufferInfo_cube = webglUtils.createBufferInfoFromArrays(gl, cube_array)
}



function loadToxic() {
    loadObj("resources/obj/toxic.obj")
    const toxic_array = {
        position: {numComponents: 3, data: webglVertexData[0],},
        texcoord: {numComponents: 2, data: webglVertexData[1],},
        normal: {numComponents: 3, data: webglVertexData[2],},
    }

    bufferInfo_toxic = webglUtils.createBufferInfoFromArrays(gl, toxic_array)
    texture_toxic = loadTextureFromImg("resources/images/rosso.jpg")  
    texture_face= loadTextureFromImg("resources/images/foto.jpg") 

}

function loadFlower() {
    loadObj("resources/obj/flower.obj")
    const flower_array = {
        position: {numComponents: 3, data: webglVertexData[0],},
        texcoord: {numComponents: 2, data: webglVertexData[1],},
        normal: {numComponents: 3, data: webglVertexData[2],},
    }

    bufferInfo_flower = webglUtils.createBufferInfoFromArrays(gl, flower_array)
    texture_flower = loadTextureFromImg("resources/images/flower.jpg")  
   // texture_flower = createTexture(gl, "resources/images/flower.jpg") 

}

function loadSnail() {
    loadObj("resources/obj/lumachina.obj")
    const snail_array = {
        position: {numComponents: 3, data: webglVertexData[0],},
        texcoord: {numComponents: 2, data: webglVertexData[1],},
        normal: {numComponents: 3, data: webglVertexData[2],},
    }
    bufferInfo_snail = webglUtils.createBufferInfoFromArrays(gl, snail_array)
    
    texture_snail = loadTextureFromImg("resources/images/skin.jpg")
}

function loadAnt() {
    loadObj("resources/obj/ant.obj")
    const ant_array = {
        position: {numComponents: 3, data: webglVertexData[0],},
        texcoord: {numComponents: 2, data: webglVertexData[1],},
        normal: {numComponents: 3, data: webglVertexData[2],},
    }
    bufferInfo_ant = webglUtils.createBufferInfoFromArrays(gl, ant_array)
    texture_ant = loadTextureFromImg("resources/images/ant.jpg")
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
    
}





