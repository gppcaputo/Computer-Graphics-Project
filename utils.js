
//Funzione per creare la texture dello skybox
function loadSkyboxTexture() {
    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture)

    const faceInfos = [
        {
            target: gl.TEXTURE_CUBE_MAP_POSITIVE_X,
            url: 'resources/images/immagine.png',
          },
          {
            target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
            url: 'resources/images/immagine.png',
          },
          {
            target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
            url: 'resources/images/immagine.png',
          },
          {
            target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
            url: 'resources/images/immagine.png',
          },
          {
            target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
            url: 'resources/images/immagine.png',
          },
          {
            target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
            url: 'resources/images/immagine.png',
          },
    ]

    faceInfos.forEach((faceInfo) => {
        const {target, url} = faceInfo;

        // Upload the canvas to the cubemap face.
        const level = 0;
        const internalFormat = gl.RGBA;
        const width = 512;
        const height = 512;
        const format = gl.RGBA;
        const type = gl.UNSIGNED_BYTE;

        // setup each face so it's immediately renderable
        gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, null);

        // Asynchronously load an image
        const image = new Image();
        image.src = url;
        image.addEventListener('load', function() {
            // Now that the image has loaded make copy it to the texture.
            gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
            gl.texImage2D(target, level, internalFormat, format, type, image);
            gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
        });
    });


    gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

    return texture
}


//Funzione per creare il buffer dello skybox
function createXYQuadVertices() {
    var xOffset = 0;
    var yOffset = 0;
    var size = 1;
    return {
        position: {
            numComponents: 2,
            data: [
                xOffset + -1 * size, yOffset + -1 * size,
                xOffset + 1 * size, yOffset + -1 * size,
                xOffset + -1 * size, yOffset + 1 * size,
                xOffset + 1 * size, yOffset + 1 * size,
            ],
        },
        normal: [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
        ],
        texcoord: [
            0, 0,
            1, 0,
            0, 1,
            1, 1,
        ],
        indices: [0, 1, 2, 2, 1, 3],
    };
}

function degToRad(deg) {
    return deg * Math.PI / 180;
}